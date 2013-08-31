from django.conf.urls.defaults import *
from views import *

urlpatterns = patterns('',
    #user requested analysis
    url(r'(\w+)/(\d+)', analysis, name='analysis'),
)  
