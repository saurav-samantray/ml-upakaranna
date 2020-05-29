#from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

celery_app  = Celery('app')

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
celery_app .config_from_object('django.conf:settings',namespace='CELERY')

# Load task modules from all registered Django app configs.
# This is not required, but as you can have more than one app
# with tasks it’s better to do the autoload than declaring all tasks
# in this same file.
celery_app .autodiscover_tasks()

@celery_app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))