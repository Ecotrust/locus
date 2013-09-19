var map, storyPointLayer, locusLayer, selectedLocusLayer, lociLayer, selectStoryPointControl, selectedFeature, selectLocusControl, selectOtherLocusControl, drawPointControls, drawLocusControls;

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
    var hybrid = new OpenLayers.Layer.Bing({
        name: "Hybrid",
        key: bing_apiKey,
        type: "AerialWithLabels"
    });
    var aerial = new OpenLayers.Layer.Bing({
        name: "Aerial",
        key: bing_apiKey,
        type: "Aerial"
    });

    esriOcean = new OpenLayers.Layer.XYZ("ESRI Ocean", "http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/${z}/${y}/${x}", {
        sphericalMercator: true,
        isBaseLayer: true,
        numZoomLevels: 13,
        attribution: "Sources: Esri, GEBCO, NOAA, National Geographic, DeLorme, NAVTEQ, Geonames.org, and others"
    });
    
    
    storyPointLayer = new OpenLayers.Layer.Vector("Story Point Layer");
    
    storyPointLayer.events.on({
        "featureadded": this.onPostAdd,
        "featureselected": this.onPointSelect,
        "featureunselected": this.onPointUnselect
    });
    
    locusLayer = new OpenLayers.Layer.Vector("Locus Layer");

    selectedLocusLayer = new OpenLayers.Layer.Vector("Selected Locus Layer", {
        styleMap: new OpenLayers.StyleMap({
            fillColor: "#00ee00",
            fillOpacity: 0.4,
            strokeColor: "#00ee00"
        })
    });
    
    lociLayer = new OpenLayers.Layer.Vector("Loci Layer");
    
    locusLayer.events.on({
        "featureadded": this.onLocusAdd,
        "featureselected": this.onLocusSelect,
        "featureunselected": this.onLocusUnselect
    });

    selectedLocusLayer.events.on({
        "featureadded": this.onSelectedLocusAdd,
        "featureselected": this.onSelectedLocusSelect,
        "featureunselected": this.onSelectedLocusUnselect
    });
    
    lociLayer.events.on({
        // "featureadded": this.onLocusAdd,
        "featureselected": this.onOtherLocusSelect,
        "featureunselected": this.onOtherLocusUnselect
    });
    
    map.addLayers([aerial, hybrid, esriOcean, storyPointLayer, locusLayer, selectedLocusLayer, lociLayer]);
    
    getLoci();
    getStoryPoints();
    
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.MousePosition());

    selectLocusControl = new OpenLayers.Control.SelectFeature(selectedLocusLayer);
    selectOtherLocusControl = new OpenLayers.Control.SelectFeature(lociLayer
        // {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect}
    );
    selectStoryPointControl = new OpenLayers.Control.SelectFeature(storyPointLayer
        // {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect}
    );

    drawPointControls = {
        point: new OpenLayers.Control.DrawFeature(storyPointLayer,
                    OpenLayers.Handler.Point),
        select: selectStoryPointControl
    };

    drawLocusControls = {
        polygon: new OpenLayers.Control.DrawFeature(
            selectedLocusLayer,
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

    // clickControl = new OpenLayers.Control.Click(locusLayer);

    selectedClickControl = new OpenLayers.Control.Click(selectedLocusLayer);

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
            storyPointLayer.setVisibility(true);
            locusLayer.setVisibility(true);
            selectedLocusLayer.setVisibility(false);
            lociLayer.setVisibility(false);
            mapShown = true;
        } else if (e.target.id == "settings-tab" ) {
            selectLocusControl.activate();
            $('#your-locus').show();
            selectedClickControl.activate();
            map.render("your-locus");
            updateCenter(set_map_status);
            storyPointLayer.setVisibility(false);
            locusLayer.setVisibility(true);
            selectedLocusLayer.setVisibility(true);
            lociLayer.setVisibility(false);
            mapShown = true;
        } else if (e.target.id == "world-tab" ) {
            selectLocusControl.deactivate();
            selectStoryPointControl.deactivate();
            $('#loci-map').show();
            map.render("loci-map");
            updateCenter(other_map_status);
            storyPointLayer.setVisibility(true);
            locusLayer.setVisibility(false);
            selectedLocusLayer.setVisibility(false);
            lociLayer.setVisibility(true);
            mapShown = true;
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
        lociLayer.addFeatures(geojson_format.read(result));
    });
};

function getStoryPoints() {
    $.ajax({
        url: "/get_storypoints/json/",
        type: 'GET',
        data: {},
        dataType: 'json'
    }).done(function(result) {
        var geojson_format = new OpenLayers.Format.GeoJSON({
          'internalProjection': new OpenLayers.Projection("EPSG:900913"),
          'externalProjection': new OpenLayers.Projection("EPSG:900913")
        });
        storyPointLayer.addFeatures(geojson_format.read(result));
    });
};

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
    selectedLocusLayer.removeAllFeatures();
    var features = geojson_format.read(result);
    selectedLocusLayer.addFeatures(features);
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
