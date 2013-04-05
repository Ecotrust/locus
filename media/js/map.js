var map, storyPointLayer, selectStoryPointControl, selectedFeature;

function mapInit() {
        
    var dash_map_status = {
        center: new OpenLayers.LonLat(0, 0),
        zoom: 1
    };
    var set_map_status = {
        center: new OpenLayers.LonLat(0, 0),
        zoom: 1
    };
    var other_map_status = {
        center: new OpenLayers.LonLat(0, 0),
        zoom: 1
    };
    var bing_apiKey = "AvD-cuulbvBqwFDQGNB1gCXDEH4S6sEkS7Yw9r79gOyCvd2hBvQYPaRBem8cpkjv";
    var map_extent = new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34);
    
    map = new OpenLayers.Map(null, {
      restrictedExtent: map_extent,
      displayProjection: new OpenLayers.Projection("EPSG:4326"),
      projection: new OpenLayers.Projection("EPSG:3857")
      // projection: new OpenLayers.Projection("EPSG:4326")
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
    
    
    storyPointLayer = new OpenLayers.Layer.Vector("Story Point Layer", {
        eventListerners:{
            'featureadded':function(evt) {
                var feature = evt.feature;
                var popup = new OpenLayers.Popup.FramedCloud("popup",
                    OpenLayers.LonLat.fromString(feature.geometry.toShortString()),
                    null,
                    "<div style='font-size:.8em'>Feature: " + feature.id +"<br>Foo: " + feature.attributes.foo+"</div>",
                    null,
                    true
                );
                feature.popup = popup;
                map.addPopup(popup);
            }
        }
    });
    
    storyPointLayer.events.on({
        "featureadded": this.onFeatureAdd,
        "featureselected": this.onFeatureSelect,
        "featureunselected": this.onFeatureUnselect
    });
    
    var locusLayer = new OpenLayers.Layer.Vector("Locus Layer");
    
    map.addLayers([aerial, hybrid, esriOcean, storyPointLayer, locusLayer]);
    
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.MousePosition());
    
    var drawPointControls, drawLocusControls, selectLocusControl, selectedFeature;
    
    selectLocusControl = new OpenLayers.Control.SelectFeature(locusLayer
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
        polygon: new OpenLayers.Control.DrawFeature(locusLayer,
                    OpenLayers.Handler.Polygon),
        select: selectLocusControl
    };
    
    for(var key in drawPointControls) {
        map.addControl(drawPointControls[key]);
    }
    
    for(var key in drawLocusControls) {
        map.addControl(drawLocusControls[key]);
    }
    
    $('a[data-toggle="tab"]').on('shown',function(e) {
    
        cleanOldSelected();
        
        if (e.relatedTarget.id == "dashboard-tab") {
            dash_map_status = {
                center: map.center,
                zoom: map.zoom
            };
            mapShown = false;
            drawPointControls['point'].deactivate();
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
            map.setCenter(dash_map_status.center, dash_map_status.zoom);
            mapShown = true;
        } else if (e.target.id == "settings-tab" ) {
            selectLocusControl.activate();
            $('#your-locus').show();
            map.render("your-locus");
            map.setCenter(set_map_status.center, set_map_status.zoom);
            mapShown = true;
        } else if (e.target.id == "world-tab" ) {
            selectLocusControl.deactivate();
            selectStoryPointControl.deactivate();
            $('#loci-map').show();
            map.render("loci-map");
            map.setCenter(other_map_status.center, other_map_status.zoom);
            mapShown = true;
        }
        
    });

    return map;
};
