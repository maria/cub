"""
WSGI config for cub2 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from dj_static import Cling
from mongoengine import connect

from cub.settings import MONGO_CONFIG

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cub.settings")

connect(MONGO_CONFIG['NAME'], host=MONGO_CONFIG['HOST'])

application = Cling(get_wsgi_application())
