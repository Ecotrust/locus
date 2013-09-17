from django.http import Http404, HttpResponse
from fbapp.models import UserSettings
from analysis.models import Report
from madrona.features import get_feature_by_uid

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

def get_bioregion(settings_id):
    '''
    Gets the bioregions instance for a given settings_id
    '''
    try:
        #TODO: Check that user has permissions for this
        user_settings = UserSettings.objects.get(id=int(settings_id))
        return user_settings.get_bioregion()
    except UserSettings.DoesNotExist:
        raise Http404('Settings ID %s does not exist' % settings_id)
    except BioregionError:
        raise Http404('Biorgion does not exist for settings id %s' % settings_id)

def analysis(request, atype, settings_id):
    # Get the function by name
    # Must be a display_<atype>_analysis function in the scope

    bioregion = get_bioregion(settings_id)

    try:
        report = Report.objects.get(content_type=bioregion, report_type=atype)
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

    
    # import pdb; pdb.set_trace()

    return report_response
