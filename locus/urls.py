from django.conf.urls.defaults import *
from django.contrib import admin
from django.conf import settings
import django
import os
admin.autodiscover()

django_dir = os.path.dirname(django.__file__)
urlpatterns = patterns(
	'',
    (r'', include('fbapp.urls')),
    (r'^reports', include('analysis.urls'))
)

if settings.DEBUG:
    urlpatterns += patterns(
        '',
        url(
            r'^media/(?P<path>.*)$',
            'django.views.static.serve',
            {'document_root': settings.MEDIA_ROOT}
        ),
    )