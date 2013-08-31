from django.core.management import setup_environ
import os
import sys
sys.path.append(os.path.realpath(os.path.join(os.path.dirname(__file__), '..', 'locus')))

import settings
setup_environ(settings)

from django.contrib.gis.utils import LayerMapping

# Summary
from analysis.models import Language, EcoRegions, LastWild, MarineRegions, Watersheds, WorldMask, UrbanExtent
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
    '/usr/local/apps/locus/data/shapefiles/language/final/lang_multi.shp', 
    lang_mapping, 
    transform=False, 
    source_srs=54009, 
    encoding='latin-1'
)
lang_lm.save()
# tp_count = ThiessenPolygon.objects.all().count()
# print "Thiessen Polygon Count = %s" % tp_count

#Vulnerabilities
from analysis.models import ExtinctLanguages, SeaRise1m, SeaRise3m, SeaRise6m, PovertyNoData