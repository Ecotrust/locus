from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest, HttpResponseServerError, HttpResponseForbidden
from django.template import RequestContext
from django.shortcuts import get_object_or_404, render_to_response
import datetime

from django.conf import settings

def home(request, template_name='fbapp/home.html', extra_context={}):
    """
    Launch screen / Home page for application
    """
    context = {}
    context.update(extra_context)
    return render_to_response(template_name, context)
    