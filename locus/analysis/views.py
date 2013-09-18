from django.http import Http404, HttpResponse
from fbapp.models import UserSettings
from analysis.models import Report
from madrona.features import get_feature_by_uid
from django.contrib.contenttypes.models import ContentType

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

def get_bioregion(user_id):
    '''
    Gets the bioregions instance for a given user_id
    '''
    try:
        #TODO: Check that user has permissions for this
        user_settings = UserSettings.objects.get(user__id=int(user_id))
        return user_settings.get_bioregion()
    except UserSettings.DoesNotExist:
        raise Http404('Settings for user with ID %s does not exist' % user_id)
    except BioregionError:
        raise Http404('Biorgion does not exist for user id %s' % user_id)

def analysis(request, atype, user_id):
    # Get the function by name
    # Must be a display_<atype>_analysis function in the scope



    bioregion = get_bioregion(user_id)
    bioregion_type = ContentType.objects.get_for_model(bioregion)

    try:
        report = Report.objects.get(content_type=bioregion_type, report_type=atype, object_id=bioregion.id)
        report_response = HttpResponse(report.get_html(), content_type="text/html")
    except Report.DoesNotExist:
        try:
            func = globals()['display_%s_analysis' % atype]
        except KeyError:
            raise Http404('Analysis method `%s` is unknown' % atype)
        report_response = func(request, bioregion)
        report = Report.objects.create(
            bioregion=bioregion,
            report_type=atype,
            html=report_response.content 
        )

    return report_response
