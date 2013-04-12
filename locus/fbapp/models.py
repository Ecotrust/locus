from django.contrib.gis.db import models
from madrona.features.models import PolygonFeature, PointFeature, LineFeature, FeatureCollection
from madrona.features import register


@register
class Bioregion(PolygonFeature):
    description = models.TextField(null=True, blank=True)
    class Options:
        form = 'fbapp.forms.BioregionForm'


@register
class Bioregions(FeatureCollection):
    description = models.TextField(null=True, blank=True)
    class Options:
        form = 'fbapp.forms.BioregionsForm'
        valid_children = (
            ('fbapp.models.Bioregion'),('fbapp.models.Bioregions')
        )

class Locus(models.Model):
    poly = models.PolygonField(srid=4326) # we want our model in a different SRID
    AREA = models.FloatField()
    PERIMETER = models.FloatField()
    BIOREG = models.IntegerField()
    GRID_CODE = models.IntegerField()
    objects = models.GeoManager()