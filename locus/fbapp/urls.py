from django.conf.urls.defaults import *
from django.contrib import admin
import django
import os

from views import *

urlpatterns = patterns('',
    (r'^$', home),
    # (r'', include('madrona.common.urls')),
)

#Serve media through development server instead of web server (Apache)
if settings.DEBUG is True:
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
        (r'^admin-media/(?P<path>.*)$','django.views.static.serve',{'document_root': settings.ADMIN_MEDIA_ROOT, 'show_indexes': True}),
        (r'^install-media/(?P<path>.*)$','django.views.static.serve',{'document_root': settings.STATICFILES_ROOT, 'show_indexes': True}),
        (r'^admin/(?P<path>.*)$','django.views.static.serve',{'document_root': settings.ADMIN_MEDIA_PREFIX, 'show_indexes': True})
    )
    
