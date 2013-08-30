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
tp_lm = LayerMapping(ThiessenPolygon, '../media/DEMO/geo/bioreg_2_polygon.shp', tp_mapping) # TODO: Later make this come from SETTINGS
tp_lm.save(verbose=True)
tp_count = ThiessenPolygon.objects.all().count()
print "Thiessen Polygon Count = %s" % tp_count

from django.contrib.gis.gdal import DataSource
ds = DataSource('../media/DEMO/geo/generated_bioregions_2.shp')             # TODO: Later make this come from SETTINGS
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
    user_id = 2                                                             # TODO: Later make this come from SETTINGS
    final_geom.srid = 4326
    final_geom.transform(3857)
    try:
        gb = GeneratedBioregion.objects.create(geometry_final=final_geom.geos, name=name, size_class=size_class, user_id=user_id)
    except:
        pass
        
    gb.thiessen = ThiessenPolygon.objects.get(base_id=base_id)
    gb.save()

gb_count = GeneratedBioregion.objects.all().count()
print "Generated Bioregion Count = %s" % gb_count