from madrona.features.forms import FeatureForm, SpatialFeatureForm


from models import Bioregion
class BioregionForm(SpatialFeatureForm):
    class Meta(SpatialFeatureForm.Meta):
        model = Bioregion


from models import Bioregions
class BioregionsForm(FeatureForm):
    class Meta(FeatureForm.Meta):
        model = Bioregions

