# Django settings for lot project.
import os, sys
from madrona.common.default_settings import *

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TIME_ZONE = 'America/Vancouver'
ROOT_URLCONF = 'urls' # 'locus.urls'

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'locus',
        'USER': 'postgres',
    }
}

COMPRESS_CSS['application']['source_filenames'] += (
    'css/project.css',
)

COMPRESS_JS['application']['source_filenames'] += (
    'js/project.js',
)

INSTALLED_APPS += ('fbapp', )

GEOMETRY_DB_SRID = 3857
GEOMETRY_CLIENT_SRID = 4326 #for latlon

APP_NAME = "locus"

TEMPLATE_DIRS = (
    os.path.realpath(os.path.join(os.path.dirname(__file__), 'templates').replace('\\','/')), 
)

import logging
logging.getLogger('django.db.backends').setLevel(logging.ERROR)



ADMIN_MEDIA_PREFIX = '/admin-media/'

STATIC_URL = '/install-media/'

ADMIN_MEDIA_ROOT = os.path.abspath(os.path.dirname(sys.argv[0])) + ADMIN_MEDIA_PREFIX # like: /admin-media - where the Django development server goes to look for your static admin files

STATICFILES_ROOT = os.path.abspath(os.path.dirname(sys.argv[0])) + STATIC_URL
STATIC_ROOT = os.path.abspath(os.path.dirname(sys.argv[0])) + STATIC_URL

# STATICFILES_DIRS = (
    # os.path.abspath('c:\\Python27\Lib\site-packages\django_extjs\static'),
# )



from settings_local import *
