from django.contrib.gis.db import models
from django.contrib.auth.models import User
from madrona.features.models import PolygonFeature, PointFeature, LineFeature, FeatureCollection
from allauth.socialaccount.models import SocialAccount
from madrona.features import register
import settings, datetime

# As far as I can tell, this is only for compatibility with the Bioregion Discovery tool, and even that is suspect.
# @register
# class Bioregion(PolygonFeature):
#     description = models.TextField(null=True, blank=True)
#     class Options:
#         form = 'fbapp.forms.BioregionForm'


# # As far as I can tell, this is only for compatibility with the Bioregion Discovery tool, and even that is suspect.
# @register
# class Bioregions(FeatureCollection):
#     description = models.TextField(null=True, blank=True)
#     class Options:
#         form = 'fbapp.forms.BioregionsForm'
#         valid_children = (
#             ('fbapp.models.Bioregion'),('fbapp.models.Bioregions')
#         )

# This is used to load objects into the db, this is not for use in the app itself - these will be copied over to GeneratedBioregions.
class Locus(models.Model):
    poly = models.PolygonField(srid=settings.SERVER_SRID) # we want our model in a different SRID
    AREA = models.FloatField()
    PERIMETER = models.FloatField()
    # BIOREG_2_ = models.IntegerField()
    BIOREG_2_I = models.IntegerField()
    GRID_CODE = models.IntegerField()
    objects = models.GeoManager()

    def __unicode__(self):
        return 'Name: %d' % self.BIOREG_2_I

class ThiessenPolygon(models.Model):
    base_id = models.IntegerField(primary_key = True)
    geometry = models.MultiPolygonField(srid=settings.SERVER_SRID)
    objects = models.GeoManager()

@register
class GeneratedBioregion(PolygonFeature):
    size_choices = (
        ('small', 'small'),
        ('medium', 'medium'),
        ('large', 'large')
    )
    size_class = models.CharField( max_length=30, choices = size_choices, default = 'medium' )
    thiessen = models.ForeignKey(ThiessenPolygon, blank=True, null=True)

    class Options:
        verbose_name = 'Generated Bioregion'
        form = 'fbapp.forms.GeneratedBioregionForm'
        form_template = 'fbapp/form.html'
        manipulators = []

    @property
    def output_geom(self):
        return self.geometry_final.transform(54009, clone=True)

@register
class DrawnBioregion(PolygonFeature):

    class Options:
        verbose_name = 'Drawn Bioregion'
        form = 'fbapp.forms.DrawnBioregionForm'
        form_template = 'fbapp/form.html'
        manipulators = []
    
    @property
    def output_geom(self):
        return self.geometry_final.transform(54009, clone=True)

class BioregionError(Exception):
    pass

class UserSettings(models.Model):
    user = models.ForeignKey(User, blank=True, null=True)
    bioregion_drawn = models.ForeignKey(DrawnBioregion, blank=True, null=True)
    bioregion_gen = models.ForeignKey(GeneratedBioregion, blank=True, null=True)
    locus_name = models.CharField(null=True, blank=True, default="", max_length=255)
    # TODO: news_sources = many_to_many?
    ns_public_story_points = models.BooleanField(default=True, verbose_name='Public Points')
    ns_friend_story_points = models.BooleanField(default=True, verbose_name='Friend Points')
    ns_tweets = models.BooleanField(default=True, verbose_name='Tweets')
    friends = models.ManyToManyField("self", blank=True, null=True)

    def get_bioregion(self):
        if self.bioregion_drawn:
            return self.bioregion_drawn
        elif self.bioregion_gen:
            return self.bioregion_gen
        else:
            raise BioregionError('No bioregion exists for this User Settings')

    def has_bioregion(self):
        if self.bioregion_drawn:
            return True
        elif self.bioregion_gen:
            return True
        else:
            return False

    def bioregion_type(self):
        if self.bioregion_drawn:
            return 'Drawn'
        elif self.bioregion_gen:
            return 'Generated'
        else:
            return 'None'

class FriendRequest(models.Model):

    statuses = (
        ('new', 'new'),
        ('accepted', 'accepted'),
        ('rejected', 'rejected'),
        ('ignored', 'ignored')
    )

    requester = models.ForeignKey(User, related_name='requesting_user')
    requestee = models.ForeignKey(User, related_name='requested_user')
    created = models.DateTimeField(default=datetime.datetime.now)
    status = models.CharField( max_length=30, choices = statuses, default = 'user' )

class StoryPoint(models.Model):

    #TODO: Use UUID

    source_type_choices = (
        ('user', 'user'),
        ('news', 'news'),
        ('wiki', 'wiki'),
        ('natgeo', 'natgeo'),
        ('twitter', 'twitter')
    )
    source_type = models.CharField( max_length=30, choices = source_type_choices, default = 'user' )
    source_user = models.ForeignKey(User, blank=True, null=True)
    source_link = models.TextField(blank=True, null=True)
    title = models.CharField(max_length=50, null=True, blank=True)
    content = models.TextField(blank=True, null=True)
    image = models.TextField(blank=True, null=True)     #just the address of the actual img file
    is_permanent = models.BooleanField(default=False)
    geometry = models.PointField(srid=settings.SERVER_SRID)
    objects = models.GeoManager()
    created = models.DateTimeField(default=datetime.datetime.now)
    flagged = models.BooleanField(default=False)
    flag_reason = models.TextField(null=True, blank=True)
    #reviewed - if post is reviewed, remove option to flag?
    #score = models.IntegerField(default=0)      #users may add or remove points based on relevence
    #catgories = many to many, things like environment, economy, social equity, general interest

    def date_string(self):
        return self.created.strftime('%I:%M %p %b %d, %Y')

    def avatar(self):
        if self.source_user != None:
            return SocialAccount.objects.get(user=self.source_user, provider='facebook').get_avatar_url()
