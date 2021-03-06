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

TEMPLATE_CONTEXT_PROCESSORS += (
    "django.core.context_processors.request",
    "django.contrib.auth.context_processors.auth",
    "allauth.account.context_processors.account",
    "allauth.socialaccount.context_processors.socialaccount",
 )

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.ModelBackend",

    # `allauth` specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
)

INSTALLED_APPS += (
    'fbapp',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.twitter',
    'madrona.raster_stats',
    'analysis',
    'django.contrib.humanize',
    'django.contrib.staticfiles',
    'oauth2',
)

ACCOUNT_EMAIL_VERIFICATION = "none"

GEOMETRY_DB_SRID = 3857
GEOMETRY_CLIENT_SRID = 4326 #for latlon
REPORT_VECTOR_SRID = 54009

APP_NAME = "locus"

TEMPLATE_DIRS = (
    os.path.realpath(os.path.join(os.path.dirname(__file__), 'templates').replace('\\','/')), 
    os.path.abspath(os.path.dirname(sys.argv[0])) +'/admin_utils/templates/',
)

import logging
logging.getLogger('django.db.backends').setLevel(logging.ERROR)

MEDIA_ROOT = '/usr/local/apps/locus/mediaroot/'
MEDIA_URL = '/media/'

STATIC_URL = '/media/'

SOCIALACCOUNT_PROVIDERS = { 
    'facebook':
    { 'SCOPE': ['email', 'publish_stream'],
      # 'AUTH_PARAMS': { 'auth_type': 'reauthenticate' },
      'METHOD': 'js_sdk'  
    }
}

VECTOR_DATA_LOCATION = '/usr/local/apps/locus/data/shapefiles/'

THIESSEN_LOCATION = '/usr/local/apps/locus/media/DEMO/geo/bioreg_2_polygon.shp'
BIOREGION_LOCATION = '/usr/local/apps/locus/media/DEMO/geo/generated_bioregions_2.shp'

# SERVER_SRID = 4326
# SERVER_SRID = 3857
SERVER_SRID = 900913

STARSPAN_REMOVE_TMP = False

APP_ID = 551234671609174

SOCIALACCOUNT_PROVIDERS = {
    'facebook':
    { 'SCOPE': ['email', 'publish_stream'],
       'AUTH_PARAMS': { 'auth_type': 'reauthenticate' },
       'METHOD': 'js_sdk'
    },
    'twitter':
    { 
        'SCOPE': [],
        'method': 'oauth2'
     }
 }

from local_settings import *
