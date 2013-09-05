from django.core.management import setup_environ
import os
import sys
sys.path.append(os.path.realpath(os.path.join(os.path.dirname(__file__), '..', 'locus')))

import settings
setup_environ(settings)

from fbapp.models import ThiessenPolygon, GeneratedBioregion
for gb in GeneratedBioregion.objects.all():
     name = int(gb.name)
     print name
     tp = ThiessenPolygon.objects.get(base_id=name)
     gb.thiessen = tp
     gb.save()