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
    
def dashboard(request, template_name='fbapp/dashboard.html', extra_context={}):
    """
    Launch screen / Home page for application
    """
    context = {}
    context.update(extra_context)
    return render_to_response(template_name, context)
    
def details(request, template_name='fbapp/details.html', extra_context={}):
    """
    Launch screen / Home page for application
    """
    context = {}
    context.update(extra_context)
    return render_to_response(template_name, context)

def locus_settings(request, template_name='fbapp/settings.html', extra_context={}):
    """
    Launch screen / Home page for application
    """
    context = {}
    context.update(extra_context)
    return render_to_response(template_name, context)

def friends(request, template_name='fbapp/friends.html', extra_context={}):
    """
    Launch screen / Home page for application
    """
    context = {}
    context.update(extra_context)
    return render_to_response(template_name, context)

def world(request, template_name='fbapp/world.html', extra_context={}):
    """
    Launch screen / Home page for application
    """
    context = {}
    context.update(extra_context)
    return render_to_response(template_name, context)    