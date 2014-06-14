from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest, HttpResponseServerError, HttpResponseForbidden
from django.template import RequestContext
from django.shortcuts import get_object_or_404, render_to_response
from models import GeneratedBioregion, DrawnBioregion, UserSettings, ThiessenPolygon, StoryPoint, FriendRequest
from models import BioregionError
import datetime
from django.utils import simplejson
from django.contrib.auth.models import User
from django.contrib.gis.geos import Polygon, GEOSGeometry
import json
from operator import itemgetter
from allauth.socialaccount.models import SocialToken, SocialAccount
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.conf import settings

def home(request, template_name='fbapp/home.html', extra_context={}):
    """
    Launch screen / Home page for application
    """

    users = {}
    for user in SocialAccount.objects.all():
        users[str(user.user.id)] = {"name": user.user.get_full_name(), "id": user.user.id}

    token = ""
    avatar_url = ""
    user_locus = {}
    gen_id = "null"


    if request.user.is_authenticated():
        tokens = SocialToken.objects.filter(account__user=request.user, account__provider='facebook')

        if tokens.count() > 0:
            token = tokens[0]
        else :
            token = None

        avatar_url = SocialAccount.objects.get(user=request.user, provider='facebook').get_avatar_url()

        userSettings, created = UserSettings.objects.get_or_create(user=request.user)
        try:
            user_bioregion = userSettings.get_bioregion()
        except BioregionError:
            user_bioregion = "null"
        if not user_bioregion == "null":
            user_locus = user_bioregion.geometry_final.json
            gen_id = user_bioregion.id
        newsSources = {
            'ns_public_story_points': userSettings.ns_public_story_points,
            'ns_friend_story_points': userSettings.ns_friend_story_points,
            'ns_tweets': userSettings.ns_tweets
        }
        locus_name = userSettings.locus_name
    else:
        locus_name = ""
        newsSources = {
            'ns_public_story_points': True,
            'ns_friend_story_points': True,
            'ns_tweets': True
        }

    context = RequestContext(
        request,{
            "users": json.dumps(users, ensure_ascii=False), 
            "token": token, 
            "userLocus": user_locus,
            "avatar": avatar_url,
            "genId": gen_id,
            "userID": request.user.id,
            "appID": settings.APP_ID,
            "locusName": locus_name,
            "newsSources": json.dumps(newsSources, ensure_ascii=False)
        }
    )
    context.update(extra_context)
    return render_to_response(template_name, context_instance=context)
    
def set_user_settings(request):
    userSettings, created = UserSettings.objects.get_or_create(user=request.user)
    news_sources = simplejson.loads(request.POST.get('news_sources'))
    userSettings.ns_public_story_points = news_sources['ns_public_story_points']
    userSettings.ns_friend_story_points = news_sources['ns_friend_story_points']
    userSettings.ns_tweets = news_sources['ns_tweets']
    userSettings.locus_name = request.POST.get('locus_name')
    locus_type = request.POST.get('locus_type')

    if request.POST.get('wkt') != "":
        if locus_type == 'drawn':
            geom = GEOSGeometry(request.POST.get('wkt'), srid=settings.GEOMETRY_DB_SRID)
            try:
                drawnBioregion = DrawnBioregion.objects.get(user=request.user)
                drawnBioregion.geometry_final = geom
                drawnBioregion.save()
            except DrawnBioregion.DoesNotExist:
                drawnBioregion = DrawnBioregion.objects.create(user=request.user, name=request.user.username, geometry_final=geom)
            userSettings.bioregion_drawn = drawnBioregion
            userSettings.bioregion_gen = None
        elif locus_type == 'generated':
            DrawnBioregion.objects.filter(user=request.user).delete()
            bioregion_gen = request.POST.get('bioregion_gen')
            userSettings.bioregion_gen = GeneratedBioregion.objects.get(id=bioregion_gen)
            userSettings.bioregion_drawn = None
    else:
            DrawnBioregion.objects.filter(user=request.user).delete()
            userSettings.bioregion_gen = None
            userSettings.bioregion_drawn = None

    userSettings.save()

    return HttpResponse(simplejson.dumps({
        'message': 'groovy',
        'status':200
    }))

def set_storypoints(request):
    try:
        user = User.objects.get(id=request.POST.get('source_user_id'))
        geom = GEOSGeometry(request.POST.get('geometry'), srid=settings.GEOMETRY_DB_SRID)
        point, created = StoryPoint.objects.get_or_create(
            geometry=geom,
            title=request.POST.get('title'),
            content=request.POST.get('content'),
            image=request.POST.get('image'),
            source_user=user,
            is_permanent=request.POST.get('isPerm')
        )

        feature = {
            'storyPoint': {
                'id': point.id,
                'source_user_id': point.source_user.id,
                'source_type': point.source_type,
                'source_link': point.source_link,
                'title': point.title,
                'content': point.content,
                'image': point.image,
                'date': point.date_string(),
                'isPerm': point.is_permanent,
                'flagged': point.flagged,
                'flag_reason': point.flag_reason
            },
            'source': point.source_type
        }

        return HttpResponse(simplejson.dumps({
            'message': 'groovy',
            'feature': feature,
            'status': 200
        }))
    except:
        return HttpResponse(simplejson.dumps({
            'message': 'story point did not save.',
            'status': 500
        }))

def delete_user_settings(request):
    #Todo
    pass

def get_bioregions(request):
    qs = GeneratedBioregion.objects.all()

    bioregions = render_to_geojson(
        qs,
        geom_attribute='geometry_final',
        mimetype = 'text/plain',
        pretty_print=True,
        excluded_fields=['date_created', 'date_modified']
    )

    return bioregions

def get_friends_bioregions(request):
    friends = simplejson.loads(request.GET['friends'])
    user_ids = []
    user_bioregion_mapping = {}
    draw_bioregion_ids = []
    gen_bioregion_ids = []
    
    friend_ids = [friend['id'] for friend in friends]
    friend_accounts = SocialAccount.objects.filter(uid__in=friend_ids)
    for friend in friend_accounts:
        uid = friend.user.id
        user_ids.append(uid)
        user_bioregion_mapping[friend.uid] = {'user_id': uid}
    u_settings_qs = UserSettings.objects.filter(user__id__in=user_ids)

    for setting in u_settings_qs:
        if setting.has_bioregion():
            for mapping in user_bioregion_mapping:
                if user_bioregion_mapping[mapping]['user_id'] == setting.user.id:
                    break       # get mapping without knowing the fb user id
            user_bioregion_mapping[mapping]['type'] = setting.bioregion_type()
            user_bioregion_mapping[mapping]['br_id'] = setting.get_bioregion().id
            if user_bioregion_mapping[mapping]['type'] == "Drawn":
                draw_bioregion_ids.append(user_bioregion_mapping[mapping]['br_id'])
            else:
                gen_bioregion_ids.append(user_bioregion_mapping[mapping]['br_id'])

    gen_qs = GeneratedBioregion.objects.filter(id__in=gen_bioregion_ids)
    draw_qs = DrawnBioregion.objects.filter(id__in=draw_bioregion_ids)

    collection = {}

    if gen_qs.count() > 0 :
        gen_bioregions_collection = render_to_geojson(
            gen_qs,
            geom_attribute='geometry_final',
            mimetype = 'text/plain',
            pretty_print=True,
            excluded_fields=['date_created', 'date_modified'],
            return_response=False
        )

        collection = gen_bioregions_collection

    if draw_qs.count() > 0:
        draw_bioregions_collection = render_to_geojson(
            draw_qs,
            geom_attribute='geometry_final',
            mimetype = 'text/plain',
            pretty_print=True,
            excluded_fields=['date_created', 'date_modified'],
            return_response=False
        )

        collection = draw_bioregions_collection

    if draw_qs.count() > 0 and gen_qs.count() > 0:
        collection['features'] = draw_bioregions_collection['features'] + gen_bioregions_collection['features']

    collection['user_feature_mapping'] = user_bioregion_mapping

    response = HttpResponse()
    response.write('%s' % simplejson.dumps(collection, indent=1))
    response['Content-length'] = str(len(response.content))
    response['Content-Type'] = 'text/plain'
    return response

def get_storypoints(request, user):
    usetting = UserSettings.objects.get(user=request.user)

    if user == 'json':
        my_story_points = StoryPoint.objects.filter(Q(geometry__within=usetting.get_bioregion().geometry_final) | Q(source_user=usetting.user))

        # qs = StoryPoint.objects.all()
        qs = my_story_points
    else:
        qs = StoryPoint.objects.filter(source_type='user', source_user=user)

    features = []

    for point in qs.order_by('-created'):
        if point.source_type != 'user':
            image = point.image
            source_user_id = None
        else:
            image = point.avatar()
            source_user_id = point.source_user.id
        feature = {
            'id' : str(point.id),
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    point.geometry.coords[0],
                    point.geometry.coords[1]
                ]
            },
            'type': 'Feature',
            'properties': {
                'storyPoint': {
                    'id': point.id,
                    'source_user_id': source_user_id,
                    'source_type': point.source_type,
                    'source_link': point.source_link,
                    'title': point.title,
                    'content': point.content,
                    'image': image,
                    'date': point.date_string(),
                    'isPerm': point.is_permanent,
                    'flagged': point.flagged,
                    'flag_reason': point.flag_reason
                },
                'source_type': point.source_type
            }
        }
        features.append(feature)

    storypoints = {
        "srid": 900913, 
        "crs": {
            "type": "link", 
            "properties": {
                "href": "http://spatialreference.org/ref/epsg/900913/", 
                "type": "proj4"
            }
        },
        "type": "FeatureCollection",
        "features": features
    }

    response = HttpResponse()
    response.write('%s' % simplejson.dumps(storypoints, indent=1))
    response['Content-length'] = str(len(response.content))
    response['Content-Type'] = 'text/plain'
    return response

def edit_storypoint(request, storypoint_id):
    try:
        storypoint = StoryPoint.objects.get(id=storypoint_id)
    except ValueError:
        return HttpResponse(simplejson.dumps({
            'message': 'Invalid post id: ID must be an integer',
            'status': 400
            })
        )
    except ObjectDoesNotExist:
        return HttpResponse(simplejson.dumps({
            'message': 'Post with given ID does not exist.',
            'status': 404
            })
        )

    if request.user.is_authenticated() and request.user.id == storypoint.source_user_id:
        new_content = request.POST.get('content')
        storypoint.content = new_content
        storypoint.save()
        return HttpResponse(simplejson.dumps({
            'message': 'Post updated.',
            'status': 200
            })
        )
    else:
        return HttpResponse(simplejson.dumps({
            'message': 'You do not have permission to edit this post.',
            'status': 401
            }))

def delete_storypoint(request, storypoint_id):
    try:
        storypoint = StoryPoint.objects.get(id=storypoint_id)
    except ValueError:
        return HttpResponse(simplejson.dumps({
            'message': 'Invalid post id: ID must be an integer',
            'status': 400
            })
        )
    except ObjectDoesNotExist:
        return HttpResponse(simplejson.dumps({
            'message': 'Post with given ID does not exist.',
            'status': 404
            })
        )

    if request.user.is_authenticated() and request.user.id == storypoint.source_user_id:
        storypoint.delete()
        response=HttpResponse(simplejson.dumps({
            'message': 'Post deleted.',
            'status': 200
        }))
    else:
        response=HttpResponse(simplejson.dumps({
            'message': 'You do not have permission to delete this post.',
            'status': 401
        }))
    return response

    

def get_bioregions_by_point(request):

    pnt_wkt = 'POINT(' + request.GET['lon'] + ' ' + request.GET['lat'] + ')'

    size_class = request.GET['size']

    try:
        thiessen = ThiessenPolygon.objects.get(geometry__contains=pnt_wkt)
    except:
        thiessen = None
        pass

    qs = GeneratedBioregion.objects.filter(thiessen=thiessen, size_class=size_class)

    bioregions = render_to_geojson(
        qs,
        geom_attribute='geometry_final',
        mimetype = 'text/plain',
        pretty_print=True,
        excluded_fields=['date_created', 'date_modified']
    )

    return bioregions

def get_friend_requests(request):
    if request.user.is_authenticated():
        friend_requests = FriendRequest.objects.filter(Q(requester=request.user)|Q(requestee=request.user))
        return HttpResponse(simplejson.dumps({
            'status': 200,
            'friend_requests': friend_requests
            })
        )

def create_friend_request(request):
    if request.user.is_authenticated():
        requestee_id = simplejson.loads(request.POST.get('requestee_id'))
        requestee = User.objects.get(id=requestee_id)
        requester=request.user
        query_status = FriendRequest.objects.filter(Q(requester=requester, requestee=requestee)|Q(requester=requestee, requestee=requester))
        if query_status.count() == 0:
            FriendRequest.objects.create(requester=requester, requestee=requestee, status='new')
            return HttpResponse(simplejson.dumps({
                'status':200,
                'message': 'Friend request sent'
                })
            )
        else:
            return HttpResponse(simplejson.dumps({
                'status':200,
                'message': 'Friendship request already exists'
                })
            )
    
# TODO: This method is for testing only - delete when done with friend work!
def generate_friend_requests(request):
    existing_friendships = get_locus_friendships(request.user)
    unfriended_users = User.objects.filter(~Q(id__in=existing_friendships))
    for stranger in unfriended_users:
        FriendRequest.objects.create(requester=request.user, requestee=stranger, status='accepted')
    return HttpResponse(simplejson.dumps({
        'status': 200,
        'message': 'Refresh to see your new friends!'
        })
    )

def accept_friend_request(request):
    if request.user.is_authenticated():
        request_id = simplejson.loads(request.POST.get('request_id'))
        friend_request = FriendRequest.get(id=request_id)
        friend_request['status'] = 'accepted'
        friend_request.save()
        return HttpResponse(simplejson.dumps({
            'status': 200,
            'message': 'Friend request accepted'
            })
        )

def decline_friend_request(request):
    if request.user.is_authenticated():
        request_id = simplejson.loads(request.POST.get('request_id'))
        friend_request = FriendRequest.get(id=request_id)
        friend_request['status'] = 'rejected'
        friend_request.save()
        return HttpResponse(simplejson.dumps({
            'status': 200,
            'message': 'Friend request declined'
            })
        )

def delete_friendship(request):
    if request.user.is_authenticated():
        request_id = simplejson.loads(request.POST.get('request_id'))
        friend_request = FriendRequest.get(id=request_id)
        friend_request.delete()
        return HttpResponse(simplejson.dumps({
            'status': 200,
            'message': 'Friend removed'
            })
        )

def get_locus_friendships(user):
    requested_friendships = FriendRequest.objects.filter(requester=user, status='accepted')
    friend_ids = [x.requestee.id for x in requested_friendships]
    accepted_friendships = FriendRequest.objects.filter(requestee=user, status='accepted')
    friend_ids += [x.requester.id for x in accepted_friendships]

    return friend_ids

def get_friends(request):
    friends = simplejson.loads(request.POST.get('friends'))
    friend_ids = [friend['id'] for friend in friends]
    user_friends_qs = SocialAccount.objects.filter(uid__in=friend_ids, provider='facebook')
    user_ids = [user.uid for user in user_friends_qs]
    user_friends = get_locus_friendships(request.user)
    just_friends = []
    sorted_friends = sorted(friends, key=itemgetter('name'))
    for friend in sorted_friends:
        if friend['id'] in user_ids:
            user_friends.append(friend)
        else:
            just_friends.append(friend)
        # TODO create list of non-friend users in your bioregion (50ish)
        

    return HttpResponse(simplejson.dumps({
        'just_friends': just_friends,
        'user_friends': user_friends,
        'message': 'Friend lists generated',
        'status': 200
    }))
    
def render_to_geojson(query_set, geom_field=None, geom_attribute=None, extra_attributes=[],mimetype='text/plain', pretty_print=False, excluded_fields=[],included_fields=[],proj_transform=None, return_response=True):
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
    # if query_set:
    #     ex = None
    #     query_set.query.distinct = False
    #     if hasattr(query_set,'agg_extent'): 
    #         ex = [x for x in query_set.agg_extent.tuple]
    #     elif '.' in geometry_name:
    #         prop, meth = geometry_name.split('.')
    #         a = getattr(item,prop)
    #         if a:
    #             ex = [x for x in a.extent()]
    #     else:
    #         import pdb
    #         pdb.set_trace()
    #         # make sure qs does not have .distinct() in it...
    #         ex = [x for x in query_set.extent()]
    #     if ex:
    #         if proj_transform:
    #             poly = Polygon.from_bbox(ex)
    #             poly.srid = srid
    #             poly.transform(proj_transform)
    #             ex = poly.extent
    #     collection['bbox'] = ex
    
    if return_response:
        # Return response
        response = HttpResponse()
        if pretty_print:
            response.write('%s' % simplejson.dumps(collection, indent=1))
        else:
            response.write('%s' % simplejson.dumps(collection))    
        response['Content-length'] = str(len(response.content))
        response['Content-Type'] = mimetype
        return response
    else:
        return collection