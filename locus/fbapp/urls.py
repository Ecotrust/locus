from django.conf.urls.defaults import *
from views import *

urlpatterns = patterns(
    '',
    (r'^$', home),
    (r'^accounts/', include('allauth.urls')),
    (r'^get_bioregions/json/$', get_bioregions),
    (r'^get_friends_bioregions/$', get_friends_bioregions),
    (r'^get_bioregions/point/$', get_bioregions_by_point),
    (r'^get_storypoints/([A-Za-z0-9_-]+)/$', get_storypoints),
    (r'^get_friends/$', get_friends),
    (r'^set_storypoints/$', set_storypoints),
    (r'^set_user_settings/$', set_user_settings),
    (r'', include('madrona.common.urls')),
)

