import plac
import random
import logging
import time
import json
from pathlib import Path

from django.contrib.auth.models import User
from celery import shared_task
from app.celery import celery_app
import spacy
from spacy.util import minibatch, compounding

from .models import Training



logger = logging.getLogger(__name__)

TEST_DATA = [
    "brand new Dove conditioner soap 12.3 fl oz for curly hair",
    "almost used Matrix conditioning shampoo 200ml",
    "ORs Replenishing Conditioner 1.75 Oz",
    "Olive Oil For Naturals leave in Smoothie that could help with greesy hair",
    "Curls Unleashed Coconut and Shea Butter Curly Coil HD Gel Souffle 16 Ounce for dry hair that helps with moisturizing scalp",
    "ORS Organic Root Stimulator Olive Oil Built-In Protection 150 ml ",
    "Sulphate free shea butter styling cream",
    "Olive Oil Hues Vitamin & Oil Creme Color Cocoa Brown with instruction sheet 200g for a meeting in Dubai tomorrow",
]


@celery_app.task(bind=True)
def train(self,model_name,TRAIN_DATA,n_iter,user_id,training_object):
    logger.info(f"Initiating Training: {self.request.id}")
    training_object['task_id'] = self.request.id
    training_object['status'] = self.AsyncResult(self.request.id).state
    training_object['user'] = User.objects.get(id=user_id)
    t1 = Training(**training_object)
    t1.save()

    #time.sleep(10)
    main(data=TRAIN_DATA,model=model_name,n_iter=n_iter,train_object=t1)
    logger.info(f"Training Complete: {self.request.id}")

@plac.annotations(
    model=("Model name. Defaults to blank 'en' model.", "option", "m", str),
    output_dir=("Optional output directory", "option", "o", Path),
    n_iter=("Number of training iterations", "option", "n", int),
)
def main(model=None, output_dir=None, n_iter=10,data=None,train_object=None):
    training_s_time = time.time()
    TRAIN_DATA = data
    """Load the model, set up the pipeline and train the entity recognizer."""
    if model is not None:
        nlp = spacy.load(model)  # load existing spaCy model
        logger.info("Loaded model '%s'" % model)
    else:
        nlp = spacy.blank("en")  # create blank Language class
        logger.info("Created blank 'en' model")

    # create the built-in pipeline components and add them to the pipeline
    # nlp.create_pipe works for built-ins that are registered with spaCy
    if "ner" not in nlp.pipe_names:
        ner = nlp.create_pipe("ner")
        nlp.add_pipe(ner, last=True)
    # otherwise, get it so we can add labels
    else:
        ner = nlp.get_pipe("ner")

    # add labels
    for _, annotations in TRAIN_DATA:
        for ent in annotations.get("entities"):
            ner.add_label(ent[2])

    # get names of other pipes to disable them during training
    pipe_exceptions = ["ner", "trf_wordpiecer", "trf_tok2vec"]
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe not in pipe_exceptions]
    
    training_loss = []
    with nlp.disable_pipes(*other_pipes):  # only train NER
        # reset and initialize the weights randomly – but only if we're
        # training a new model
        if model is None:
            nlp.begin_training()
        for itn in range(n_iter):
            stime = time.time()
            random.shuffle(TRAIN_DATA)
            losses = {}
            # batch up the examples using spaCy's minibatch
            batches = minibatch(TRAIN_DATA, size=compounding(4.0, 32.0, 1.001))
            for batch in batches:
                #logger.info(batch)
                texts, annotations = zip(*batch)
                nlp.update(
                    texts,  # batch of texts
                    annotations,  # batch of annotations
                    drop=0.5,  # dropout - make it harder to memorise data
                    losses=losses,
                )
            #logger.info(losses)
            etime = time.time()-stime
            training_loss.append(losses['ner'])
            #if itn%(n_iter/3) == 0:
            logger.info(f'iteration {itn}, Loss: {losses}, time taken: {etime}s')
    
    logger.info(f"Total training time: {time.time()-training_s_time}")
    # Visualize loss history
    # plt.figure(figsize=(15,10))
    # plt.plot(range(n_iter), training_loss)
    # plt.legend(['Training Loss'])
    # plt.xlabel('Iter_count')
    # plt.ylabel('Loss')
    # plt.show();
    
    # test the trained model
    train_object.training_loss=training_loss
    train_object.total_training_time=round(time.time()-training_s_time, 2)
    train_object.status = 'SUCCESS'
    train_object.save()

    for text in TEST_DATA:
        doc = nlp(text)
        logger.info(f"Entities: {[(ent.text, ent.label_) for ent in doc.ents]}")
        #print("Tokens", [(t.text, t.ent_type_, t.ent_iob) for t in doc])

    # save model to output directory
    # if output_dir is not None:
    #     output_dir = Path(output_dir)
    #     if not output_dir.exists():
    #         output_dir.mkdir()
    #     nlp.to_disk(output_dir)
    #     print("Saved model to", output_dir)
