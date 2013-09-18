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

admin.site.register(Locus, LocusAdmin)
admin.site.register(GeneratedBioregion, GeneratedBioregionAdmin)
admin.site.register(DrawnBioregion, DrawnBioregionAdmin)
admin.site.register(UserSettings, UserSettingsAdmin)