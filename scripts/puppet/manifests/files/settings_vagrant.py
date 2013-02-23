import os, sys

DEBUG = True
TEMPLATE_DEBUG = DEBUG 

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': '<%= dbname%>',
        'USER': 'vagrant',
    }
}

# This should be a local folder created for use with the install_media command 
MEDIA_ROOT = '/usr/local/apps/<%= reponame%>/mediaroot/'
MEDIA_URL = 'http://localhost:8000/media/'
STATIC_URL = 'http://localhost:8000/static/'
STATIC_ROOT = os.path.abspath(os.path.dirname(sys.argv[0])) + STATIC_URL

POSTGIS_TEMPLATE='template1'

ADMINS = (
        ('Madrona', 'madrona@ecotrust.org')
        ) 

import logging
logging.getLogger('django.db.backends').setLevel(logging.ERROR)
LOG_FILE = os.path.join(os.path.dirname(__file__),'..','<%= projectname%>.log')

SECRET_KEY = '<%= secretkey%>'


#TO Remove
SERVER='Dev'
DEMO=False
