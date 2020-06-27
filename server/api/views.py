import collections
import json
import logging
from django.core import serializers
from django.conf import settings
from django.contrib.auth.models import User
from django.db import transaction
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404, redirect
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, F, Q
from libcloud.base import DriverType, get_driver
from libcloud.storage.types import ContainerDoesNotExistError, ObjectDoesNotExistError
from rest_framework import generics, filters, status
from rest_framework.exceptions import ParseError, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework_csv.renderers import CSVRenderer
from celery.result import AsyncResult


from .filters import DocumentFilter
from .models import Project, Label, Document, RoleMapping, Role, SequenceAnnotation
from .models import TrainingData, Training
from .permissions import IsProjectAdmin, IsAnnotatorAndReadOnly, IsAnnotator, IsAnnotationApproverAndReadOnly, IsOwnAnnotation, IsAnnotationApprover
from .serializers import ProjectSerializer, LabelSerializer, DocumentSerializer, UserSerializer
from .serializers import ProjectPolymorphicSerializer, RoleMappingSerializer, RoleSerializer
from .serializers import TrainingSerializer, TrainingDataSerializer, TrainingPolymorphicSerializer, DatasetPolymorphicSerializer
from .utils import CSVParser, ExcelParser, JSONParser, PlainTextParser, CoNLLParser, iterable_to_io
from .utils import JSONLRenderer
from .utils import JSONPainter, CSVPainter, CoNLLPainter
from .task import train

IsInProjectReadOnlyOrAdmin = (IsAnnotatorAndReadOnly | IsAnnotationApproverAndReadOnly | IsProjectAdmin)
IsInProjectOrAdmin = (IsAnnotator | IsAnnotationApprover | IsProjectAdmin)

logger = logging.getLogger(__name__)

class Me(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)


class Features(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return Response({
            'cloud_upload': bool(settings.CLOUD_BROWSER_APACHE_LIBCLOUD_PROVIDER),
        })


class ProjectList(generics.ListCreateAPIView):
    serializer_class = ProjectPolymorphicSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]

    def get_queryset(self):
        return self.request.user.projects

    def perform_create(self, serializer):
        serializer.save(users=[self.request.user])


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_url_kwarg = 'project_id'
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]

class ProjectDetailFromName(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_url_kwarg = 'project_name'
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]
    def get(self, request, *args, **kwargs):
        p = Project.objects.filter(name=self.kwargs['project_name'])
        if p is not None and len(p) > 0:
            serializer = self.get_serializer(p[0])
            #p = get_object_or_404(Project, pk=self.kwargs['project_id'])
            return Response(serializer.data)
        else:
            return Response({"detail":"Not found"})

class ModelAPI(APIView):
    permission_classes = [IsAuthenticated & (IsAnnotationApprover | IsProjectAdmin)]

    def get(self, request, *args, **kwargs):
        available_models = settings.MODEL_MAP.keys()
        return Response(available_models)

class DatasetList(generics.ListCreateAPIView):
    serializer_class = DatasetPolymorphicSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]

    def get_queryset(self):
        dataset_type = self.request.query_params.get('type')
        if dataset_type:
            return self.request.user.datasets.filter(dataset_type=dataset_type)   
        return self.request.user.datasets



class TrainingList(generics.ListCreateAPIView):
    serializer_class = TrainingPolymorphicSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]

    def get_queryset(self):
        return self.request.user.trainings

    def post(self, request, *args, **kwargs):
        training_datas = TrainingData.objects.all()
        model_name = self.request.data.get('model_name',None)
        n_iter = self.request.data.pop('iterations',10)
        logger.info(self.request.data)
        TRAIN_DATA = [(item['fields']['text'],{"entities":item['fields']['labels']}) for item in json.loads(serializers.serialize('json',training_datas))]
        if len(TRAIN_DATA)==0:
            logger.warning("Dataset not found. Initiated training on dummy data [ONLY FOR DEV]")
            TRAIN_DATA = [('This product is awesome and works like magic', {'entities': []}), ('Weightless moisture If youre after highflying hair with plenty of texture its high time you treated yourself to this wellrounded blend of sea salt and honey. Made without the use of heavy butters or oils The Plumps will soften hair without weighing it down leaving behind the subtle woodsy fragrance of cedarwood oil. Its time to plump it up How to use Apply the bar to wet hair after shampooing and massage through. Rinse clean and enjoy your gleaming locks.', {'entities': [(0, 19, 'product'), (138, 146, 'ingredients'), (151, 156, 'ingredients'), (182, 195, 'free_of'), (220, 231, 'applied_for'), (303, 316, 'ingredients'), (370, 378, 'hair_condition'), (417, 428, 'applied_for'), (444, 458, 'applied_for')]}), ('The one bottle has never been used. The bigger bottle was used once. Ultra Nourishing Cleansing treatment Cleansing Treatment. WILLING TO BUNDLE HAVE A QUESTION I REPLY QUICKLY', {'entities': [(19, 34, 'product_condition'), (58, 67, 'product_condition'), (69, 105, 'product'), (106, 125, 'product_features')]}), ('Sealed 16oz Wen Winter White Citrus Cleansing Conditioner wpump.', {'entities': [(7, 11, 'weight'), (12, 15, 'brand'), (16, 57, 'product')]}), ('Moisture repair conditioner', {'entities': [(0, 27, 'product')]})]
            #return Response({"error_message":"Dataset not found"},status=status.HTTP_400_BAD_REQUEST)    
        task = train.delay(model_name,TRAIN_DATA,n_iter,self.request.user.id,self.request.data)
        return Response({"task_id":task.task_id,"status":task.status})

class TrainingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    lookup_url_kwarg = 'training_id'
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]

class NerAPI(APIView):
    permission_classes = [IsAuthenticated & (IsAnnotationApprover | IsProjectAdmin)]

    def post(self, request, *args, **kwargs):
        text = self.request.data.get('text', "My name is Saurav Samnatray")
        model_name = self.request.data.get('model_name', "en_core_web_sm")
        project_id = self.request.data.get("project_id")
        model = settings.MODELS[model_name]
        doc = model(text)
        response = []
        label_map = {}
        for label in Label.objects.filter(project=project_id):
            label_map[label.text] = label.id
        #logger.info(label_map)
        # for label in get_object_or_404(Project, pk=project_id).labels:
        #     logger.info(label)    
        
        for ent in doc.ents:
            response.append({
                "start_offset":ent.start_char,
                "end_offset":ent.end_char,
                "label":label_map[ent.label_],
                "projectId":project_id
                })
        return Response(response)

class StatisticsAPI(APIView):
    pagination_class = None
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]

    def get(self, request, *args, **kwargs):
        p = get_object_or_404(Project, pk=self.kwargs['project_id'])
        include = set(request.GET.getlist('include'))
        response = {}

        if not include or 'label' in include:
            label_count, user_count = self.label_per_data(p)
            label_distinct_count, user_distinct_count = self.distinct_label_per_data(p)
            response['label'] = label_count
            response['label_distinct'] = label_distinct_count
            # TODO: Make user_label count chart
            response['user_label'] = user_count

        if not include or 'total' in include or 'remaining' in include or 'user' in include:
            progress = self.progress(project=p)
            response.update(progress)

        if include:
            response = {key: value for (key, value) in response.items() if key in include}

        return Response(response)

    @staticmethod
    def _get_user_completion_data(annotation_class, annotation_filter):
        all_annotation_objects  = annotation_class.objects.filter(annotation_filter)
        set_user_data = collections.defaultdict(set)
        for ind_obj in all_annotation_objects.values('user__username', 'document__id'):
            set_user_data[ind_obj['user__username']].add(ind_obj['document__id'])
        return {i: len(set_user_data[i]) for i in set_user_data}


    def progress(self, project):
        docs = project.documents
        annotation_class = project.get_annotation_class()
        total = docs.count()
        annotation_filter = Q(document_id__in=docs.all())
        user_data = self._get_user_completion_data(annotation_class, annotation_filter)
        if not project.collaborative_annotation:
            annotation_filter &= Q(user_id=self.request.user)
        done = annotation_class.objects.filter(annotation_filter)\
            .aggregate(Count('document', distinct=True))['document__count']
        remaining = total - done
        return {'total': total, 'remaining': remaining, 'user': user_data}

    def label_per_data(self, project):
        annotation_class = project.get_annotation_class()
        return annotation_class.objects.get_label_per_data(project=project)

    def distinct_label_per_data(self, project):
        annotation_class = project.get_annotation_class()
        return annotation_class.objects.get_distinct_label_per_data(project=project)


class ApproveLabelsAPI(APIView):
    permission_classes = [IsAuthenticated & (IsAnnotationApprover | IsProjectAdmin)]

    def post(self, request, *args, **kwargs):
        approved = self.request.data.get('approved', True)
        document = get_object_or_404(Document, pk=self.kwargs['doc_id'])
        document.annotations_approved_by = self.request.user if approved else None
        document.save()
        return Response(DocumentSerializer(document).data)


class LabelList(generics.ListCreateAPIView):
    serializer_class = LabelSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]

    def get_queryset(self):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        return project.labels

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        serializer.save(project=project)


class LabelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer
    lookup_url_kwarg = 'label_id'
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]


class DocumentList(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('text', )
    ordering_fields = ('created_at', 'updated_at', 'doc_annotations__updated_at',
                       'seq_annotations__updated_at', 'seq2seq_annotations__updated_at')
    filter_class = DocumentFilter
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]

    def get_queryset(self):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        #logger.info(project)
        queryset = project.documents
        if project.randomize_document_order:
            queryset = queryset.annotate(sort_id=F('id') % self.request.user.id).order_by('sort_id')
        else:
            queryset = queryset.order_by('id')

        return queryset

    @transaction.atomic
    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        doc = serializer.save(project=project)
        #Custom code start
        if 'annotations' in self.request.data:
            annotations = self.request.data.pop('annotations')
            anno_class = project.get_annotation_class()
            for anno in annotations:
                if 'projectId' in anno:
                    anno.pop('projectId')
                anno['document'] = doc
                anno['label'] = Label.objects.get(id=anno['label'])
                anno['user'] = self.request.user
                anno_class(**anno).save()


class DocumentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    lookup_url_kwarg = 'doc_id'
    permission_classes = [IsAuthenticated & IsInProjectReadOnlyOrAdmin]


class AnnotationList(generics.ListCreateAPIView):
    pagination_class = None
    permission_classes = [IsAuthenticated & IsInProjectOrAdmin]
    swagger_schema = None

    def get_serializer_class(self):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        self.serializer_class = project.get_annotation_serializer()
        return self.serializer_class

    def get_queryset(self):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        model = project.get_annotation_class()

        queryset = model.objects.filter(document=self.kwargs['doc_id'])
        if not project.collaborative_annotation:
            queryset = queryset.filter(user=self.request.user)

        return queryset

    def create(self, request, *args, **kwargs):
        
        if isinstance(request.data,list):
            for ann in request.data:
                ann['document'] = self.kwargs['doc_id']
        else:
            request.data['document'] = self.kwargs['doc_id']
        
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        #return super().create(request, args, kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AnnotationDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'annotation_id'
    permission_classes = [IsAuthenticated & (((IsAnnotator | IsAnnotationApprover) & IsOwnAnnotation) | IsProjectAdmin)]
    swagger_schema = None

    def get_serializer_class(self):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        self.serializer_class = project.get_annotation_serializer()
        return self.serializer_class

    def get_queryset(self):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        model = project.get_annotation_class()
        self.queryset = model.objects.all()
        return self.queryset


class TextUploadAPI(APIView):
    parser_classes = (MultiPartParser,)
    permission_classes = [IsAuthenticated & IsProjectAdmin]

    def post(self, request, *args, **kwargs):
        if 'file' not in request.data:
            raise ParseError('Empty content')

        self.save_file(
            user=request.user,
            file=request.data['file'],
            file_format=request.data['format'],
            project_id=kwargs['project_id'],
        )

        return Response(status=status.HTTP_201_CREATED)

    @classmethod
    def save_file(cls, user, file, file_format, project_id):
        project = get_object_or_404(Project, pk=project_id)
        parser = cls.select_parser(file_format)
        data = parser.parse(file)
        storage = project.get_storage(data)
        storage.save(user)

    @classmethod
    def select_parser(cls, file_format):
        if file_format == 'plain':
            return PlainTextParser()
        elif file_format == 'csv':
            return CSVParser()
        elif file_format == 'json':
            return JSONParser()
        elif file_format == 'conll':
            return CoNLLParser()
        elif file_format == 'excel':
            return ExcelParser()
        else:
            raise ValidationError('format {} is invalid.'.format(file_format))


class CloudUploadAPI(APIView):
    permission_classes = TextUploadAPI.permission_classes

    def get(self, request, *args, **kwargs):
        try:
            project_id = request.query_params['project_id']
            file_format = request.query_params['upload_format']
            cloud_container = request.query_params['container']
            cloud_object = request.query_params['object']
        except KeyError as ex:
            raise ValidationError('query parameter {} is missing'.format(ex))

        try:
            cloud_file = self.get_cloud_object_as_io(cloud_container, cloud_object)
        except ContainerDoesNotExistError:
            raise ValidationError('cloud container {} does not exist'.format(cloud_container))
        except ObjectDoesNotExistError:
            raise ValidationError('cloud object {} does not exist'.format(cloud_object))

        TextUploadAPI.save_file(
            user=request.user,
            file=cloud_file,
            file_format=file_format,
            project_id=project_id,
        )

        next_url = request.query_params.get('next')

        if next_url == 'about:blank':
            return Response(data='', content_type='text/plain', status=status.HTTP_201_CREATED)

        if next_url:
            return redirect(next_url)

        return Response(status=status.HTTP_201_CREATED)

    @classmethod
    def get_cloud_object_as_io(cls, container_name, object_name):
        provider = settings.CLOUD_BROWSER_APACHE_LIBCLOUD_PROVIDER.lower()
        account = settings.CLOUD_BROWSER_APACHE_LIBCLOUD_ACCOUNT
        key = settings.CLOUD_BROWSER_APACHE_LIBCLOUD_SECRET_KEY

        driver = get_driver(DriverType.STORAGE, provider)
        client = driver(account, key)

        cloud_container = client.get_container(container_name)
        cloud_object = cloud_container.get_object(object_name)

        return iterable_to_io(cloud_object.as_stream())


class TextDownloadAPI(APIView):
    permission_classes = TextUploadAPI.permission_classes

    renderer_classes = (CSVRenderer, JSONLRenderer)

    def get(self, request, *args, **kwargs):
        format = request.query_params.get('q')
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        documents = project.documents.all()
        painter = self.select_painter(format,project)
        # json1 format prints text labels while json format prints annotations with label ids
        # json1 format - "labels": [[0, 15, "PERSON"], ..]
        # json format - "annotations": [{"label": 5, "start_offset": 0, "end_offset": 2, "user": 1},..]
        if format == "json1":
            labels = project.labels.all()
            data = JSONPainter.paint_labels(documents, labels)
        else:
            data = painter.paint(documents)
        return Response(data)

    def select_painter(self, format,project):
        if format == 'csv':
            return CSVPainter()
        elif format == 'json' or format == "json1":
            return JSONPainter()
        elif format == 'conll':
            return CoNLLPainter(project.labels.all())
        else:
            raise ValidationError('format {} is invalid.'.format(format))


class Users(APIView):
    permission_classes = [IsAuthenticated & IsProjectAdmin]

    def get(self, request, *args, **kwargs):
        queryset = User.objects.all()
        serialized_data = UserSerializer(queryset, many=True).data
        return Response(serialized_data)


class Roles(generics.ListCreateAPIView):
    serializer_class = RoleSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated & IsProjectAdmin]
    queryset = Role.objects.all()


class RoleMappingList(generics.ListCreateAPIView):
    serializer_class = RoleMappingSerializer
    pagination_class = None
    permission_classes = [IsAuthenticated & IsProjectAdmin]

    def get_queryset(self):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        return project.role_mappings

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs['project_id'])
        serializer.save(project=project)


class RoleMappingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RoleMapping.objects.all()
    serializer_class = RoleMappingSerializer
    lookup_url_kwarg = 'rolemapping_id'
    permission_classes = [IsAuthenticated & IsProjectAdmin]


class LabelUploadAPI(APIView):
    parser_classes = (MultiPartParser,)
    permission_classes = [IsAuthenticated & IsProjectAdmin]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        if 'file' not in request.data:
            raise ParseError('Empty content')
        labels = json.load(request.data['file'])
        project = get_object_or_404(Project, pk=kwargs['project_id'])
        try:
            for label in labels:
                serializer = LabelSerializer(data=label)
                serializer.is_valid(raise_exception=True)
                serializer.save(project=project)
            return Response(status=status.HTTP_201_CREATED)
        except IntegrityError:
            content = {'error': 'IntegrityError: you cannot create a label with same name or shortkey.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
