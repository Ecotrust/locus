from django.core.management import setup_environ
import os
import sys
sys.path.append(os.path.realpath(os.path.join(os.path.dirname(__file__), '..', 'locus')))

import settings
setup_environ(settings)

import traceback
from django.contrib.contenttypes.models import ContentType
from django.test.client import RequestFactory

from fbapp.models import GeneratedBioregion
from analysis.models import Report

# Analysis methods
# should be imported as display_<atype>_analysis function
from analysis.summary.summary_analysis import display_general_analysis as display_overview_analysis #TODO
from analysis.summary.summary_analysis import display_language_analysis
from analysis.summary.summary_analysis import display_resources_analysis
#from analysis.summary.summary_analysis import display_agriculture_analysis
from analysis.summary.summary_analysis import display_summary_analysis
from analysis.vulnerability.vulnerability_analysis import display_climate_analysis
from analysis.vulnerability.vulnerability_analysis import display_socioeconomic_analysis
from analysis.vulnerability.vulnerability_analysis import display_hazards_analysis
#from analysis.vulnerability.vulnerability_analysis import display_vulnerability_analysis

factory = RequestFactory()
request = factory.get('/tmp')
count = GeneratedBioregion.objects.filter(size_class="medium").count()

# Report.objects.all().delete()

for i, bioregion in enumerate(GeneratedBioregion.objects.filter(size_class="medium")):
    print "### %s of %s         ###" % (i+1, count)
    print "### New Bioregion %s ###" % bioregion.id
    for atype_tuple in Report.report_type_choices:
        atype = atype_tuple[0]
        try:
            report = Report.objects.get(object_id=bioregion.id, content_type=ContentType.objects.get_for_model(bioregion), report_type=atype)
        except Report.DoesNotExist:
            print "      ATYPE %s " % atype
            func = globals()['display_%s_analysis' % atype]
            try:
                report_response = func(request, bioregion)
            except Exception as ex:
                template = "An exception of type {0} occured. Arguments:\n{1!r}"
                message = template.format(type(ex).__name__, ex.args)
                print message
                continue
            report = Report.objects.create(
                bioregion=bioregion,
                report_type=atype,
                html=report_response.content 
            )
            print "### New Report %s, %s ###" % (report.id, atype)