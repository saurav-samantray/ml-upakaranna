from django.contrib import admin

from .models import Label, Document, Project
from .models import Role, RoleMapping
from .models import DocumentAnnotation, SequenceAnnotation, Seq2seqAnnotation
from .models import TextClassificationProject, SequenceLabelingProject, Seq2seqProject
from .models import Training, TrainingData, Dataset, SequenceLabelingDataset, Data , SequenceLabelingData


class LabelAdmin(admin.ModelAdmin):
    list_display = ('text', 'project', 'text_color', 'background_color')
    ordering = ('project',)
    search_fields = ('project',)


class TrainingDataAdmin(admin.ModelAdmin):
    list_display = ('text', 'meta')
    ordering = ('text',)
    search_fields = ('text',)

class DatasetAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ('name',)
    search_fields = ('name',)

class SequenceLabelingDatasetAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ('name',)
    search_fields = ('name',)

class DataAdmin(admin.ModelAdmin):
    list_display = ('text',)
    ordering = ('text',)
    search_fields = ('text',)

class SequenceLabelingDataAdmin(admin.ModelAdmin):
    list_display = ('text',)
    ordering = ('text',)
    search_fields = ('text',)

class DocumentAdmin(admin.ModelAdmin):
    list_display = ('text', 'project', 'meta')
    ordering = ('project',)
    search_fields = ('project',)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'project_type', 'randomize_document_order', 'collaborative_annotation')
    ordering = ('project_type',)
    search_fields = ('name',)


class SequenceAnnotationAdmin(admin.ModelAdmin):
    list_display = ('document', 'label', 'start_offset', 'user')
    ordering = ('document',)
    search_fields = ('document',)


class DocumentAnnotationAdmin(admin.ModelAdmin):
    list_display = ('document', 'label', 'user')
    ordering = ('document',)
    search_fields = ('document',)


class Seq2seqAnnotationAdmin(admin.ModelAdmin):
    list_display = ('document', 'text', 'user')
    ordering = ('document',)
    search_fields = ('document',)


class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    ordering = ('name',)
    search_fields = ('name',)


class RoleMappingAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'project', )
    ordering = ('user',)
    search_fields = ('user',)

class TrainingAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'status', )
    ordering = ('name',)
    search_fields = ('name',)


admin.site.register(TrainingData, TrainingDataAdmin)
admin.site.register(DocumentAnnotation, DocumentAnnotationAdmin)
admin.site.register(SequenceAnnotation, SequenceAnnotationAdmin)
admin.site.register(Seq2seqAnnotation, Seq2seqAnnotationAdmin)
admin.site.register(Label, LabelAdmin)
admin.site.register(Document, DocumentAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(TextClassificationProject, ProjectAdmin)
admin.site.register(SequenceLabelingProject, ProjectAdmin)
admin.site.register(Seq2seqProject, ProjectAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(RoleMapping, RoleMappingAdmin)
admin.site.register(Training, TrainingAdmin)
admin.site.register(Dataset, DatasetAdmin)
admin.site.register(Data, DataAdmin)
admin.site.register(SequenceLabelingDataset, SequenceLabelingDatasetAdmin)
admin.site.register(SequenceLabelingData, SequenceLabelingDataAdmin)
