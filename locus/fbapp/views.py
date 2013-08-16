from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest, HttpResponseServerError, HttpResponseForbidden
from django.template import RequestContext
from django.shortcuts import get_object_or_404, render_to_response
from models import Locus
import datetime
from django.utils import simplejson
from django.contrib.gis.geos import Polygon
import json

from django.conf import settings

def home(request, template_name='fbapp/home.html', extra_context={}):
    """
    Launch screen / Home page for application
    """

    from allauth.socialaccount.models import SocialToken, SocialAccount
    from models import User
    users = {}
    for user in SocialAccount.objects.all():
        users[str(user.user.id)] = {"name": user.user.get_full_name(), "id": user.user.id}

    token = ""
    avatar_url = ""
    user_locus = "null"

    if request.user.is_authenticated():
        tokens = SocialToken.objects.filter(account__user=request.user, account__provider='facebook')

        if tokens.count() > 0:
            token = tokens[0]
        else :
            token = None

        avatar_url = SocialAccount.objects.get(user=request.user, provider='facebook').get_avatar_url()

    context = RequestContext(
        request,{
            "users": json.dumps(users, ensure_ascii=False), 
            "token": token, 
            "userLocus": user_locus,
            "avatar": avatar_url
        }
    )
    context.update(extra_context)
    return render_to_response(template_name, context_instance=context)
    
def get_bioregions(request):
    qs = Locus.objects.all()

    bioregions = render_to_geojson(
        qs,
        geom_attribute='poly',
        mimetype = 'text/plain',
        pretty_print=True
    )

    return bioregions

def get_bioregions_by_point(request):

    pnt_wkt = 'POINT(' + request.GET['lon'] + ' ' + request.GET['lat'] + ')'

    qs = Locus.objects.filter(poly__contains=pnt_wkt)

    bioregions = render_to_geojson(
        qs,
        geom_attribute='poly',
        mimetype = 'text/plain',
        pretty_print=True
    )

    return bioregions
    

def render_to_geojson(query_set, geom_field=None, geom_attribute=None, extra_attributes=[],mimetype='text/plain', pretty_print=False, excluded_fields=[],included_fields=[],proj_transform=None):
    '''
    
    Shortcut to render a GeoJson FeatureCollection from a Django QuerySet.
    Currently computes a bbox and adds a crs member as a sr.org link
    
    '''
    excluded_fields.append('_state')
    collection = {}
    if hasattr(query_set,'_meta'): # its a model instance
        fields = query_set._meta.fields
        query_set = [query_set]
    else:
        fields = query_set.model._meta.fields
    
    if geom_attribute:
        geometry_name = geom_attribute
        geo_field = None
        if '.' in geom_attribute:
            prop, meth = geom_attribute.split('.')
            if len(query_set):
                p = getattr(query_set[0],prop)
                geo_field = getattr(p,meth)
                if callable(geo_field):
                    geo_field = geo_field()
        else:
            if len(query_set):
                geo_field = getattr(query_set[0],geom_attribute)
                if callable(geo_field):
                    geo_field = geo_field()
        if not geo_field:
            srid = 4326
        else:
            srid = geo_field.srid

    else:
        geo_fields = [f for f in fields if isinstance(f, GeometryField)]
        
        #attempt to assign geom_field that was passed in
        if geom_field:
            #import pdb;pdb.set_trace()
            geo_fieldnames = [x.name for x in geo_fields]
            try:
                geo_field = geo_fields[geo_fieldnames.index(geom_field)]
            except:
                raise Exception('%s is not a valid geometry on this model' % geom_field)
        else:
            if not len(geo_fields):
                raise Exception('There appears to be no valid geometry on this model')
            geo_field = geo_fields[0] # no support yet for multiple geometry fields

            
        #remove other geom fields from showing up in attributes    
        if len(geo_fields) > 1:
            for field in geo_fields:
                if field.name not in excluded_fields:
                    excluded_fields.append(field.name)

        geometry_name = geo_field.name
    

        srid = geo_field.srid

    if proj_transform:
        to_srid = proj_transform
    else:
        to_srid = srid
    # Gather the projection information
    crs = {}
    crs['type'] = "link"
    crs_properties = {}
    crs_properties['href'] = 'http://spatialreference.org/ref/epsg/%s/' % to_srid
    crs_properties['type'] = 'proj4'
    crs['properties'] = crs_properties 
    collection['crs'] = crs
    collection['srid'] = to_srid
    
    # Build list of features
    features = []
    if query_set.distinct():
      for item in query_set:
        feat = {}
        feat['type'] = 'Feature'
        if included_fields:
            d = {}
            for f in included_fields:
                if hasattr(item,f):
                    d[f] = getattr(item,f)
        else:
            d = item.__dict__.copy()
            for field in excluded_fields:
                    if field in d.keys():
                        d.pop(field)
            if geometry_name in d:
                d.pop(geometry_name)

        for attr in extra_attributes:
            a = getattr(item,attr)
            # crappy way of trying to figure out it this is a
            # m2m, aka 'ManyRelatedManager'
            if hasattr(a,'values_list'):
                a = list(a.values_list('id',flat=True))
            if callable(a):
                d[attr] = a()
            else:
                d[attr] = a
        if '.' in geometry_name:
            prop, meth = geometry_name.split('.')
            a = getattr(item,prop)
            g = getattr(a,meth)
            if callable(g):
                g = g()
        else:
            g = getattr(item,geometry_name)
        if g:
            if proj_transform:
                g.transform(proj_transform)
            feat['geometry'] = simplejson.loads(g.geojson)
        feat['properties'] = d
        features.append(feat)
    else:
        pass #features.append({'type':'Feature','geometry': {},'properties':{}})

    # Label as FeatureCollection and add Features
    collection['type'] = "FeatureCollection"    
    collection['features'] = features
    
    # Attach extent of all features
    if query_set:
        ex = None
        query_set.query.distinct = False
        if hasattr(query_set,'agg_extent'): 
            ex = [x for x in query_set.agg_extent.tuple]
        elif '.' in geometry_name:
            prop, meth = geometry_name.split('.')
            a = getattr(item,prop)
            if a:
                ex = [x for x in a.extent()]
        else:
            # make sure qs does not have .distinct() in it...
            ex = [x for x in query_set.extent()]
        if ex:
            if proj_transform:
                poly = Polygon.from_bbox(ex)
                poly.srid = srid
                poly.transform(proj_transform)
                ex = poly.extent
        collection['bbox'] = ex
    
    # Return response
    response = HttpResponse()
    if pretty_print:
        response.write('%s' % simplejson.dumps(collection, indent=1))
    else:
        response.write('%s' % simplejson.dumps(collection))    
    response['Content-length'] = str(len(response.content))
    response['Content-Type'] = mimetype
    return response