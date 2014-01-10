BR_LAYER_SRID = 4326
APP_SRID = 3857
BIOREGION_US_ID = 2

from django.core.management import setup_environ
import os
import sys
sys.path.append(os.path.realpath(os.path.join(os.path.dirname(__file__), '..', 'locus')))

import settings
setup_environ(settings)

from django.contrib.gis.utils import LayerMapping

from fbapp.models import GeneratedBioregion
GeneratedBioregion.objects.all().delete()

from fbapp.models import ThiessenPolygon
ThiessenPolygon.objects.all().delete()

tp_mapping = {'base_id': 'BIOREG_2_','geometry': 'MULTIPOLYGON'}
tp_lm = LayerMapping(ThiessenPolygon, settings.THIESSEN_LOCATION, tp_mapping)
tp_lm.save(verbose=True)
tp_count = ThiessenPolygon.objects.all().count()
print "Thiessen Polygon Count = %s" % tp_count

from django.contrib.gis.gdal import DataSource
ds = DataSource(setting.BIOREGION_LOCATION)   
layer = ds[0]

for feature in layer:
    if feature.geom.geom_type == 'MULTIPOLYGON':
        area = 0
        for geom in feature.geom:
            if geom.area > area:
                final_geom = geom
                area = geom.area
    else:
        final_geom = feature.geom
    
    name = feature['BIOREG_2_'].as_string()    
    base_id = feature['BIOREG_2_'].as_int()
    size_class = feature['SIZE_CLASS'].as_string()
    user_id = BIOREGION_US_ID
    final_geom.srid = BR_LAYER_SRID
    final_geom.transform(APP_SRID)
    try:
        gb = GeneratedBioregion.objects.create(geometry_final=final_geom.geos, name=name, size_class=size_class, user_id=user_id)
    except:
        pass
        
    gb.thiessen = ThiessenPolygon.objects.get(base_id=base_id)
    gb.save()

gb_count = GeneratedBioregion.objects.all().count()
print "Generated Bioregion Count = %s" % gb_count