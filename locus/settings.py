# Django settings for lot project.
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

TEMPLATE_DIRS = (os.path.realpath(os.path.join(os.path.dirname(__file__), 'templates').replace('\\','/')), )

import logging
logging.getLogger('django.db.backends').setLevel(logging.ERROR)

from settings_local import *
