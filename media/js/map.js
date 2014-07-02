var map;
// var map.storyPointLayer, map.locusLayer, map.selectedLocusLayer, map.lociLayer, map.friendLayer, selectStoryPointControl, selectedFeature, selectLocusControl, selectOtherLocusControl, drawPointControls, drawLocusControls;

var icon_size = new OpenLayers.Size(21,25);
var icon_offset = new OpenLayers.Pixel(-(icon_size.w/2), -icon_size.h);
var news_icon = new OpenLayers.Icon('/media/img/news_icon.png', icon_size, icon_offset);
var post_icon = new OpenLayers.Icon('/media/img/post_icon.png', icon_size, icon_offset);

function mapInit() {
        
        
    var bing_apiKey = "AvD-cuulbvBqwFDQGNB1gCXDEH4S6sEkS7Yw9r79gOyCvd2hBvQYPaRBem8cpkjv";
    var map_extent = new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34);
    
    map = new OpenLayers.Map(null, {
      restrictedExtent: map_extent,
      displayProjection: new OpenLayers.Projection("EPSG:900913"),
      toProjection: new OpenLayers.Projection("EPSG:900913"),
      // projection: new OpenLayers.Projection("EPSG:3857")
      projection: new OpenLayers.Projection("EPSG:900913")
    });
    
    /*
    var road = new OpenLayers.Layer.Bing({
        name: "Road",
        key: bing_apiKey,
        type: "Road"
    });
    */
    map.hybrid = new OpenLayers.Layer.Bing({
        name: "Hybrid",
        key: bing_apiKey,
        type: "AerialWithLabels"
    });
    map.aerial = new OpenLayers.Layer.Bing({
        name: "Aerial",
        key: bing_apiKey,
        type: "Aerial"
    });

    map.esriOcean = new OpenLayers.Layer.XYZ("ESRI Ocean", "http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/${z}/${y}/${x}", {
        sphericalMercator: true,
        isBaseLayer: true,
        numZoomLevels: 13,
        attribution: "Sources: Esri, GEBCO, NOAA, National Geographic, DeLorme, NAVTEQ, Geonames.org, and others"
    });
    
    var storyPointStyleMap = new OpenLayers.StyleMap({
        "select": new OpenLayers.Style({
            fillOpacity: 1,
            pointRadius: 10,
            fillColor: "#FFFFFF"
        })
    });

    var storyPointStyleMapLookup = {
        'user': {
            externalGraphic: "/media/img/post_icon.png",
            fillOpacity: 1,
            pointRadius: 10,
            fillColor: "#00FF00"
        },
        'news': {
            externalGraphic: "/media/img/news_icon.png",
            fillOpacity: 1,
            pointRadius: 10,
            fillColor: "#0000FF"
        },
        'maptia': {
            externalGraphic: "/media/img/news_icon.png",
            fillOpacity: 1,
            pointRadius: 10,
            fillColor: "#FF0000"
        }
    };

    storyPointStyleMap.addUniqueValueRules("default", "source_type", storyPointStyleMapLookup);

    map.storyPointLayer = new OpenLayers.Layer.Vector(
        "Story Point Layer", 
        {
            styleMap: storyPointStyleMap
        }
    );

    map.storyPointLayer.events.on({
        "featureadded": this.onPostAdd,
        "featureselected": this.onPointSelect,
        "featureunselected": this.onPointUnselect
    });
    
    map.locusLayer = new OpenLayers.Layer.Vector("Locus Layer");

    map.selectedLocusLayer = new OpenLayers.Layer.Vector("Selected Locus Layer", {
        styleMap: new OpenLayers.StyleMap({
            fillColor: "#00ee00",
            fillOpacity: 0.4,
            strokeColor: "#00ee00"
        })
    });

    map.lociLayer = new OpenLayers.Layer.Vector("Loci Layer");

    map.friendLayer = new OpenLayers.Layer.Vector("Friend Layer");
    
    map.locusLayer.events.on({
        "featureadded": this.onLocusAdd,
        "featureselected": this.onLocusSelect,
        "featureunselected": this.onLocusUnselect
    });

    map.selectedLocusLayer.events.on({
        "featureadded": this.onSelectedLocusAdd,
        "featureselected": this.onSelectedLocusSelect,
        "featureunselected": this.onSelectedLocusUnselect
    });
    
    map.lociLayer.events.on({
        // "featureadded": this.onLocusAdd,
        "featureselected": this.onOtherLocusSelect,
        "featureunselected": this.onOtherLocusUnselect
    });
    
    map.friendLayer.events.on({
        // "featureadded": this.onLocusAdd,
        "featureselected": this.onFriendLocusSelect,        //TODO
        "featureunselected": this.onFriendLocusUnselect     //TODO
    });
    
    map.addLayers([map.aerial, map.hybrid, map.esriOcean, map.storyPointLayer, map.locusLayer, map.selectedLocusLayer, map.lociLayer, map.friendLayer]);
    
    getLoci();
    
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.MousePosition());

    selectLocusControl = new OpenLayers.Control.SelectFeature(map.selectedLocusLayer);
    selectOtherLocusControl = new OpenLayers.Control.SelectFeature(map.lociLayer
        // {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect}
    );
    selectFriendLocusControl = new OpenLayers.Control.SelectFeature(map.friendLayer);
    selectStoryPointControl = new OpenLayers.Control.SelectFeature(map.storyPointLayer
        // {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect}
    );

    drawPointControls = {
        point: new OpenLayers.Control.DrawFeature(map.storyPointLayer,
                    OpenLayers.Handler.Point),
        select: selectStoryPointControl
    };

    drawLocusControls = {
        polygon: new OpenLayers.Control.DrawFeature(
            map.selectedLocusLayer,
            OpenLayers.Handler.Polygon,
            {
                "featureAdded": function(polygon){
                    app.drawing(false);
                    app.locusSelected(true);
                }
            }
        ),
        select: selectLocusControl
    };

    OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
        defaultHandlerOptions: {
            'single': true,
            'double': false,
            'pixelTolerance': 0,
            'stopSingle': false,
            'stopDouble': false
        },

        initialize: function(options) {
            this.handlerOptions = OpenLayers.Util.extend(
                {}, this.defaultHandlerOptions
            );
            OpenLayers.Control.prototype.initialize.apply(
                this, arguments
            ); 
            this.handler = new OpenLayers.Handler.Click(
                this, {
                    'click': this.trigger
                }, this.handlerOptions
            );
        }, 

        trigger: function(e) {
            var lonlat = map.getLonLatFromPixel(e.xy);
            lonlat.transform(map.toProjection, map.projection);
            app.clearSelectedLocus();
            getLocusByPoint(lonlat);
        }

    });

    // clickControl = new OpenLayers.Control.Click(map.locusLayer);

    selectedClickControl = new OpenLayers.Control.Click(map.selectedLocusLayer);

    for(var key in drawPointControls) {
        map.addControl(drawPointControls[key]);
    }
    
    for(var key in drawLocusControls) {
        map.addControl(drawLocusControls[key]);
    }
    
    
    var dash_map_status, set_map_status = null;
    var other_map_status = {
        center: new OpenLayers.LonLat(0, 0),
        zoom: 1
    };

    $('a[data-toggle="tab"]').on('shown',function(e) {
    
        cleanOldSelected();
        
        if (e.relatedTarget.id == "dashboard-tab") {
            dash_map_status = {
                center: map.center,
                zoom: map.zoom
            };
            mapShown = false;
            drawPointControls['point'].deactivate();
            selectStoryPointControl.unselectAll();
            selectStoryPointControl.deactivate();
        } else if (e.relatedTarget.id == "settings-tab") {
            set_map_status = {
                center: map.center,
                zoom: map.zoom
            };
            mapShown = false;
            selectLocusControl.deactivate();
            drawLocusControls['polygon'].deactivate();
            drawLocusControls['select'].deactivate();
            selectedClickControl.deactivate();
        } else if (e.relatedTarget.id == "world-tab") {
            other_map_status = {
                center: map.center,
                zoom: map.zoom
            };
            mapShown = false;
            selectLocusControl.deactivate();
            selectStoryPointControl.deactivate();
        }
        
        if (e.target.id == "dashboard-tab") {
            drawPointControls['point'].activate();
            selectStoryPointControl.activate();
            $('#dash-map').show();
            map.render("dash-map");
            updateCenter(dash_map_status);
            map.storyPointLayer.setVisibility(true);
            map.locusLayer.setVisibility(true);
            map.selectedLocusLayer.setVisibility(false);
            map.lociLayer.setVisibility(false);
            map.friendLayer.setVisibility(false);
            mapShown = true;
        } else if (e.target.id == "settings-tab" ) {
            selectLocusControl.activate();
            $('#your-locus').show();
            selectedClickControl.activate();
            map.render("your-locus");
            updateCenter(set_map_status);
            map.storyPointLayer.setVisibility(false);
            map.locusLayer.setVisibility(true);
            map.selectedLocusLayer.setVisibility(true);
            map.lociLayer.setVisibility(false);
            map.friendLayer.setVisibility(false);
            mapShown = true;
        // } else if (e.target.id == "world-tab" ) {
        //     selectLocusControl.deactivate();
        //     selectStoryPointControl.deactivate();
        //     $('#loci-map').show();
        //     map.render("loci-map");
        //     updateCenter(other_map_status);
        //     map.storyPointLayer.setVisibility(true);
        //     map.locusLayer.setVisibility(false);
        //     map.selectedLocusLayer.setVisibility(false);
        //     map.lociLayer.setVisibility(true);
        //     map.friendLayer.setVisibility(false);
        //     mapShown = true;
        }
        
    });

    function updateCenter(view) {
        if (view == null) {
            if (userLocus && userLocus.getBounds()){
                map.zoomToExtent(userLocus.getBounds());
                view = {
                    center: map.center,
                    zoom: map.zoom
                };
            } else {
                view = {
                    center: new OpenLayers.LonLat(0, 0),
                    zoom: 1
                };
            }
        }
        map.setCenter(view.center, view.zoom);
    };

    return map;
};

function getLoci() {
    $.ajax({
        url: "/get_bioregions/json/",
        type: 'GET',
        data: {},
        dataType: 'json'
    }).done(function(result) { 
        var geojson_format = new OpenLayers.Format.GeoJSON({
          'internalProjection': new OpenLayers.Projection("EPSG:900913"),
          'externalProjection': new OpenLayers.Projection("EPSG:900913")
        });
        var loci = geojson_format.read(result)
        map.lociLayer.addFeatures(loci);
        getStoryPoints();
    });
};

function getFriendLoci(frndlst) {
    $.ajax({
        url: "/get_friends_bioregions/",
        type: 'GET',
        data: {'friends': JSON.stringify(frndlst)},
        dataType: 'json'
    }).done(function(result) { 
        var geojson_format = new OpenLayers.Format.GeoJSON({
          'internalProjection': new OpenLayers.Projection("EPSG:900913"),
          'externalProjection': new OpenLayers.Projection("EPSG:900913")
        });
        if (geojson_format.read(result) != null){
            map.friendLayer.addFeatures(geojson_format.read(result));
        }
    });
};

function getStoryPoints(user) {
    if (user && user != 'json'){
        url = "/get_storypoints/" + user + "/";
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            dataType: 'json'
        }).done(function(result) {
            var geojson_format = new OpenLayers.Format.GeoJSON({
              'internalProjection': new OpenLayers.Projection("EPSG:900913"),
              'externalProjection': new OpenLayers.Projection("EPSG:900913")
            });
            app.storyPoints(geojson_format.read(result));
            map.storyPointLayer.events.remove("featureadded");
            map.result_features = geojson_format.read(result);
            map.storyPointLayer.addFeatures(map.result_features);
            getMaptiaStoryPoints();
            app.getStoryFeeds();
            map.storyPointLayer.events.on({"featureadded": onPostAdd});
        });
    } else {
        url = "/get_storypoints/json/";
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            dataType: 'json'
        }).done(function(result) {
            var geojson_format = new OpenLayers.Format.GeoJSON({
              'internalProjection': new OpenLayers.Projection("EPSG:900913"),
              'externalProjection': new OpenLayers.Projection("EPSG:900913")
            });
            app.storyPoints(geojson_format.read(result));
            map.storyPointLayer.events.remove("featureadded");
            map.result_features = geojson_format.read(result);
            map.storyPointLayer.addFeatures(map.result_features);
            getMaptiaStoryPoints();
            app.getStoryFeeds();
            map.storyPointLayer.events.on({"featureadded": onPostAdd});
        });
        // });
    }
};

function getWikipediaPoints() {
    // 'legoktm' says: 'you can also use Special:Version to find the API endpoint'
    url = 'https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=37.786971|-122.399677&format=json';
}

function getMaptiaStoryPoints() {
    features = [];
    var geojson_format = new OpenLayers.Format.GeoJSON({
      'internalProjection': new OpenLayers.Projection("EPSG:900913"),
      'externalProjection': new OpenLayers.Projection("EPSG:900913")
    });

    for (var i = 0; i < maptia.length; i++) {
        if (maptia[i].location.coordinates) {
            var lon = maptia[i].location.coordinates.long;
            var lat = maptia[i].location.coordinates.lat;
            var new_point = new OpenLayers.Geometry.Point(lon, lat)
            new_point.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

            //TODO: When this goes AJAX, some work will have to be done with getStoryPoints() to sort out
                // who does what when.

            // $.ajax({
            //     url: "https://maptia.com/stories/featured.json?offset=0&limit=50",
            //     type: 'GET',
            //     data: {},
            //     datType: 'json'
            // }).done(function(result)){
            //     var x = ???;
            // }

            if (app.focusLocus()) {
                current_locus = app.focusLocus();
            } else {
                current_locus = userLocus;
            }

            if (current_locus && current_locus.containsPoint(new_point)) {
                var date = Date.parse(maptia[i].created_at).toString("HH:mm tt MMM dd, yyyy");

                feature = new OpenLayers.Feature.Vector(
                    new_point,
                    {
                        'storyPoint': {
                            'content': maptia[i].description,
                            'date': date,
                            'flag_reason': null,
                            'flagged': false,
                            'id': 'maptia-'+ maptia[i].id.toString(),
                            'image': maptia[i].cover_post.photo.thumb,
                            'isPerm': true,
                            'source_link': 'https://maptia.com/' + maptia[i].user_username + '/stories/' + maptia[i].slug,
                            'source_type': 'maptia',
                            'source_user_id': null,
                            'title': maptia[i].name
                        },
                        'source_type': 'maptia'
                    }
                );
                features.push(feature);
                app.storyPoints(app.storyPoints().concat(feature));
            }
        }
    }
    map.storyPointLayer.addFeatures(features);
}

function getLocusByPoint(lonlat) {
    locusPointLatitude = lonlat.lat;
    locusPointLongitude = lonlat.lon;
    getBioregionByPoint(locusPointLatitude, locusPointLongitude, locusSizeClass);
};

function getBioregionByPoint(lat, lon, size, callback) {

    if (callback == null) {
        callback = defaultCallback;
    }

    $.ajax({
        url: "/get_bioregions/point/",
        type: 'GET',
        data: {
            'lat': lat,
            'lon': lon,
            'size': size
        },
        dataType: 'json'
    }).done(callback);
};

function defaultCallback(result) {
    var geojson_format = new OpenLayers.Format.GeoJSON({
        'internalProjection': new OpenLayers.Projection('EPSG:900913'),
        'externalProjection': new OpenLayers.Projection('EPSG:900913')
    });
    map.selectedLocusLayer.removeAllFeatures();
    var features = geojson_format.read(result);
    map.selectedLocusLayer.addFeatures(features);
    if (features.length > 0) {
        userLocus = features[0].geometry;
        app.locusSelected(true);
   
        map.zoomToExtent(userLocus.getBounds());
        view = {
            center: map.center,
            zoom: map.zoom
        };
           
        map.setCenter(view.center, view.zoom);
        app.locus_type('generated');
        gen_id = features[0].data.id;
    } else {
        userLocus = null;
        app.locusSelected(false);
        app.locus_type(null);
        gen_id = null;
    }
};

function unselectSelectedFeature(selectedFeature) {
    selectStoryPointControl.unselect(selectedFeature);
};