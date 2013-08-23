from madrona.features.forms import FeatureForm, SpatialFeatureForm


from models import GeneratedBioregion
class GeneratedBioregionForm(SpatialFeatureForm):
    class Meta(SpatialFeatureForm.Meta):
        model = GeneratedBioregion


from models import DrawnBioregion
class DrawnBioregionForm(SpatialFeatureForm):
    class Meta(SpatialFeatureForm.Meta):
        model = DrawnBioregion

