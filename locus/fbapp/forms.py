from madrona.features.forms import FeatureForm, SpatialFeatureForm


from models import Bioregion
class GeneratedBioregionForm(SpatialFeatureForm):
    class Meta(SpatialFeatureForm.Meta):
        model = GeneratedBioregion


from models import Bioregions
class DrawnBioregionForm(FeatureForm):
    class Meta(FeatureForm.Meta):
        model = DrawnBioregion

