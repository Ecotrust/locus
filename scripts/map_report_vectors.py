from django.core.management import setup_environ
import os
import sys
sys.path.append(os.path.realpath(os.path.join(os.path.dirname(__file__), '..', 'locus')))

import settings
setup_environ(settings)

from django.contrib.gis.utils import LayerMapping

# Summary
from analysis.models import Language, EcoRegions, LastWild, MarineRegions, Watersheds, WorldMask, UrbanExtent

print "Importing Language Layer"
Language.objects.all().delete()
lang_mapping = {
    'nam_label': 'NAM_LABEL',
    'name_prop': 'NAME_PROP',
    'name2': 'NAME2',
    'nam_ansi': 'NAM_ANSI',
    'cnt': 'CNT',
    'c1': 'C1',
    'pop': 'POP',
    'lmp_pop1': 'LMP_POP1',
    'g': 'G',
    'lmp_class': 'LMP_CLASS',
    'familyprop': 'FAMILYPROP',
    'family': 'FAMILY',
    'lmp_c1': 'LMP_C1',
    'geometry': 'MULTIPOLYGON'
}
lang_lm = LayerMapping(
    Language, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\summary\language\final\lang_multi.shp', 
    lang_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
lang_lm.save()

print "Importing EcoRegions Layer"
EcoRegions.objects.all().delete()
ecoreg_mapping = {
    'area': 'AREA',
    'perimeter': 'PERIMETER',
    'eco_name': 'ECO_NAME',
    'realm': 'REALM',
    'area_km2': 'area_km2',
    'eco_code': 'eco_code',
    'rangeland': 'RangeLand',
    'geometry': 'MULTIPOLYGON'
}
ecoreg_lm = LayerMapping(
    EcoRegions, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\summary\Terr_eco_mw.shp', 
    ecoreg_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
ecoreg_lm.save()

print "Importing Last Wild Layer"
LastWild.objects.all().delete()
lw_mapping = {
    'eco_name': 'ECO_NAME',
    'realm': 'REALM',
    'g200_regio': 'G200_REGIO',
    'shape_leng': 'Shape_Leng',
    'shape_area': 'Shape_Area',
    'eco_code': 'eco_code',
    'geometry': 'MULTIPOLYGON'
}
lw_lm = LayerMapping(
    LastWild, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\summary\lstwild\final\lstwild_multi.shp', 
    lw_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
lw_lm.save()

print "Importing Marine Regions Layer"
MarineRegions.objects.all().delete()
mr_mapping = {
    'ecoregion': 'ECOREGION',
    'province': 'PROVINCE',
    'realm': 'REALM',
    'lat_zone': 'Lat_Zone',
    'geometry': 'MULTIPOLYGON'
}
mr_lm = LayerMapping(
    MarineRegions, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\summary\mar_eco_mw2.shp', 
    mr_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
mr_lm.save()

print "Importing Watersheds Layer"
Watersheds.objects.all().delete()
ws_mapping = {
    'maj_bas': 'MAJ_BAS',
    'maj_name': 'MAJ_NAME',
    'maj_area': 'MAJ_AREA',
    'geometry': 'MULTIPOLYGON'
}
ws_lm = LayerMapping(
    Watersheds, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\summary\MJR_Basins.shp', 
    ws_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
ws_lm.save()

print "Importing World Mask Layer"
WorldMask.objects.all().delete()
wm_mapping = {
    'dissme': 'dissme',
    'geometry': 'MULTIPOLYGON'
}
wm_lm = LayerMapping(
    WorldMask, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\summary\worldMask_mw.shp', 
    wm_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
wm_lm.save()

print "Importing Urban Extent Layer"
UrbanExtent.objects.all().delete()
ue_mapping = {
    'gridcode': 'GRIDCODE',
    'geometry': 'MULTIPOLYGON'
}
ue_lm = LayerMapping(
    UrbanExtent, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\summary\urb_extnt_mw.shp', 
    ue_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
ue_lm.save()


#Vulnerabilities
from analysis.models import ExtinctLanguages, SeaRise1m, SeaRise3m, SeaRise6m, PovertyNoData

print "Importing Extinct Languages Layer"
ExtinctLanguages.objects.all().delete()
el_mapping = {
    'nam_label': 'NAM_LABEL',
    'name_prop': 'NAME_PROP',
    'name2': 'NAME2',
    'nam_ansi': 'NAM_ANSI',
    'cnt': 'CNT',
    'c1': 'C1',
    'pop': 'POP',
    'lmp_pop1': 'LMP_POP1',
    'g': 'G',
    'lmp_lon': 'LMP_LON',
    'lmp_lat': 'LMP_LAT',
    'lmp_c1': 'LMP_C1',
    'geometry': 'POINT'
}
el_lm = LayerMapping(
    ExtinctLanguages, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\vulnerability\lang_ext_mw.shp', 
    el_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
el_lm.save()

print "Importing Sea Rise 1m Layer"
SeaRise1m.objects.all().delete()
sr1_mapping = {
    'gridcode': 'GRIDCODE',
    'geometry': 'MULTIPOLYGON'
}
sr1_lm = LayerMapping(
    SeaRise1m, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\vulnerability\resample_1m_nn_no_simp.shp', 
    sr1_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
sr1_lm.save()

print "Importing Sea Rise 3m Layer"
SeaRise3m.objects.all().delete()
sr3_mapping = {
    'gridcode': 'GRIDCODE',
    'geometry': 'MULTIPOLYGON'
}
sr3_lm = LayerMapping(
    SeaRise3m, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\vulnerability\resample_3m_nn_no_simp.shp', 
    sr3_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
sr3_lm.save()

print "Importing Sea Rise 6m Layer"
SeaRise6m.objects.all().delete()
sr6_mapping = {
    'gridcode': 'GRIDCODE',
    'geometry': 'MULTIPOLYGON'
}
sr6_lm = LayerMapping(
    SeaRise6m, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\vulnerability\resample_6m_nn_no_simp.shp', 
    sr6_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
sr6_lm.save()

print "Importing Poverty No Data Mask Layer"
PovertyNoData.objects.all().delete()
pov_mapping = {
    'area_sqkm': 'area_1',
    'geometry': 'MULTIPOLYGON'
}
pov_lm = LayerMapping(
    PovertyNoData, 
    '\\terra\gis\projects\projects2011\BigIdea\BioregionTool\data\Reports\vulnerability\uw5_nodata_mask\uw5_nodata.shp', 
    pov_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
pov_lm.save()

print "Done."