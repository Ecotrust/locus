from django.conf.urls.defaults import *
from views import *

urlpatterns = patterns(
    '',
    (r'^$', home),
    (r'^accounts/', include('allauth.urls')),
    (r'^get_bioregions/json/$', get_bioregions),
    (r'', include('madrona.common.urls')),
)

