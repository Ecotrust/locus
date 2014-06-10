from django.contrib.gis import admin
from django.contrib.gis.admin.options import GeoModelAdmin
from fbapp.models import *

class LocusAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'AREA', 'PERIMETER', 'BIOREG_2_I', 'GRID_CODE')
    list_filter = ('AREA', 'PERIMETER', 'BIOREG_2_I', 'GRID_CODE')
    search_fields = ('__unicode__','GRID_CODE')

class GeneratedBioregionAdmin(admin.ModelAdmin):
    list_display = ('id', 'size_class')
    list_filter = ('id', 'size_class')
    search_fields = ('size_class','id')

class DrawnBioregionAdmin(admin.ModelAdmin):
    list_filter = ('id',)
    search_fields = ('id',)

class UserSettingsAdmin(admin.ModelAdmin):
    list_display = ('user', 'locus_name', 'has_bioregion', 'bioregion_type', 'ns_public_story_points', 'ns_friend_story_points', 'ns_tweets')
    list_filter = ('user', 'locus_name', 'ns_public_story_points', 'ns_friend_story_points', 'ns_tweets')
    search_fields = ('user', 'locus_name', 'bioregion_type')

class StoryPointAdmin(admin.ModelAdmin):
    list_display = ('title', 'source_type', 'source_user', 'is_permanent', 'flagged', 'created')
    list_filter = ('title', 'source_type', 'source_user', 'is_permanent', 'flagged', 'created')
    search_fields = ('title', 'source_type', 'source_user', 'is_permanent', 'flagged', 'created', 'content', 'flag_reason')

class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'requester', 'requestee', 'status', 'created')    
    list_filter = ('id', 'requester', 'requestee', 'status', 'created')
    search_fields = ('id', 'requester', 'requestee', 'status', 'created')

admin.site.register(Locus, LocusAdmin)
admin.site.register(GeneratedBioregion, GeneratedBioregionAdmin)
admin.site.register(DrawnBioregion, DrawnBioregionAdmin)
admin.site.register(UserSettings, UserSettingsAdmin)
admin.site.register(StoryPoint, StoryPointAdmin)
admin.site.register(FriendRequest, FriendRequestAdmin)