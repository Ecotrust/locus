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
    (r'^delete_storypoint/([A-Za-z0-9_-]+)/$', delete_storypoint),
    (r'^edit_storypoint/([A-Za-z0-9_-]+)/$', edit_storypoint),
    (r'^get_friends/$', get_friends),
    (r'^set_storypoints/$', set_storypoints),
    (r'^set_user_settings/$', set_user_settings),
    (r'^get_friend_requests/$', get_friend_requests),
    (r'^create_friend_request/$', create_friend_request),
    (r'^generate_friend_requests/$', generate_friend_requests),
    (r'^accept_friend_request/$', accept_friend_request),
    (r'^decline_friend_request/$', decline_friend_request),
    (r'^delete_friendship/$', delete_friendship),
    (r'', include('madrona.common.urls')),
)

