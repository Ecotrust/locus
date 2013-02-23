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

