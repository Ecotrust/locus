var map, storyPointLayer, selectStoryPointControl, selectedFeature;

var mapShown = false;

function cleanOldSelected(){
    while (map.popups.length > 0) {
        map.removePopup(map.popups[0]);
        if (selectedFeature.popup){
            selectedFeature.popup.destroy();
            selectedFeature.popup = null;
        }
    }
    //TODO: if selectedFeature is a new feature, and no data was saved for it, remove it from existence.
}


function onPopupClose(evt) {
    map.removePopup(selectedFeature.popup);
}

function onNewPopupClose(evt) {
    map.removePopup(selectedFeature.popup);
}

function onFeatureAdd(event) {          //TODO: This is specifically written for points - update accordingly for loci
    cleanOldSelected();
    if (mapShown) {
        selectedFeature = event.feature;
        popup = new OpenLayers.Popup.FramedCloud("point-popup", 
                                 selectedFeature.geometry.getBounds().getCenterLonLat(),
                                 new OpenLayers.Size(100,100),
                                 "<div style='font-size:.8em'>Feature: " + selectedFeature.id +"<br>Area: " + selectedFeature.geometry.getArea()+"</div>",
                                 null, true, onNewPopupClose);
        selectedFeature.popup = popup;
        map.addPopup(popup);
    }
}

function onFeatureSelect(event) {       //TODO: This is specifically written for points - update accordingly for loci
    cleanOldSelected();
    if (mapShown) {
        selectedFeature = event.feature;
        if (!selectedFeature.popup) {
            selectedFeature.popup = makePopup(selectedFeature);
        }
        map.addPopup(selectedFeature.popup);
    }
}

function onFeatureUnselect(event) {
    map.removePopup(event.feature.popup);
}

function makePopup (feature) {
    if (feature.attributes.storyPoint.type == 'news') {
        var popup = new OpenLayers.Popup.FramedCloud("point-popup", 
                                     feature.geometry.getBounds().getCenterLonLat(),
                                     new OpenLayers.Size(100,100),
                                     newsBubble(feature.attributes.storyPoint),
                                     null, 
                                     true, 
                                     onPopupClose);
    } else {
        var popup = new OpenLayers.Popup.FramedCloud("point-popup", 
                                     selectedFeature.geometry.getBounds().getCenterLonLat(),
                                     new OpenLayers.Size(100,100),
                                     postBubble(feature.attributes.storyPoint),
                                     null, true, onPopupClose);
    }
    popup.updateSize();
    return popup;
}

function newsBubble(storyPoint) {
    var html = "<div class=\"news-bubble\">\
                <div class=\"news-bubble-img\"><img src=\"" + storyPoint.img + "\"/></div>\
                <a href=\"" + storyPoint.source + "\" target=\"_blank\" class=\"news-title\"><h4>" + storyPoint.title + "</h4></a>\
            </div>";
    return html;
}

function postBubble(storyPoint) {
    var html = "<div class=\"post-bubble\">\
                <div class=\"post-bubble-img\"><img src=\"" + users[storyPoint.source].img + "\"/></div>\
                <p>" + storyPoint.text + "</p>\
            </div>";
    return html;
}

function mapInit() {
    
    /*--- Click Control, from example: http://openlayers.org/dev/examples/click.html ---*/
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
            selectStoryPointControl.unselect(selectedFeature);
            /*
            var lonlat = map.getLonLatFromPixel(e.xy);

            //TODO: save feature with attributes from popup         
                                      
            var bubble = new OpenLayers.Popup.Anchored({
                'id': 'new-story-point-bubble',
                'lonlat': lonlat,
                'contentSize': new OpenLayers.Size({'w': 300, 'h': 200}),
                'contentHTML': getBubbleContentHTML(lonlat),
                // 'anchor': ?,
                'closeBox': true
                // 'closeBoxCallback': aFunction()
            });
            //bubble.show();
            map.addPopup(bubble);

            */
            
        }

    });
    /*--- end click control */
    
    
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
    
    // var click = new OpenLayers.Control.Click();
    // map.addControl(click);
    // click.activate();
    
    return map;
};

function getBubbleContentHTML(lonlat) {
    lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
    html = '<div class="row-fluid">\
        <div class="span12">\
            <textarea rows="3" class="dash-textarea">What\'s going on?</textarea>\
        </div>\
    </div>\
    <div class="row-fluid">\
        <div class="span12 well">\
            <p>Coordinates: ' + lonlat.lat.toFixed(4) + ', ' + lonlat.lon.toFixed(4) + '</p>\
        </div>\
    </div>'
      
    return html;
};