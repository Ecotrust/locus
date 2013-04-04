var map;


function onPopupClose(evt) {
    selectStoryPointControl.unselect(selectedFeature);
    selectLocusControl.unselect(selectedFeature);
}

function onFeatureSelect(feature) {
    selectedFeature = feature;
    popup = new OpenLayers.Popup.FramedCloud("chicken", 
                             feature.geometry.getBounds().getCenterLonLat(),
                             null,
                             "<div style='font-size:.8em'>Feature: " + feature.id +"<br>Area: " + feature.geometry.getArea()+"</div>",
                             null, true, onPopupClose);
    feature.popup = popup;
    map.addPopup(popup);
}

function onFeatureUnselect(feature) {
    map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null;
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
            var lonlat = map.getLonLatFromPixel(e.xy);
            // lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
            // alert("You clicked near " + lonlat.lat + ", " +
                                      // + lonlat.lon);
                                      
                                      
            //TODO: Create vector layer (on init)
            //TODO: Create new feature at e.xy
            //TODO: Create popup for feature
            //TODO: add feature to vector layer
            //TODO: show feature
            //TODO: show popup
            //TODO: save feature with attributes from popup
            //TODO: 
            //TODO: 
                                      
                                      
            /*
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
            
            /*
            var popup = new OpenLayers.Popup.FramedCloud("popup",
                lonlat,
                null,
                "<div style='font-size:.8em'>Feature: [id]<br>Foo: [attributes]</div>",
                null,
                true
            );
            
            map.addPopup(popup);
            // popup.show();
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
    
    
    var storyPointLayer = new OpenLayers.Layer.Vector("Story Point Layer");
    var locusLayer = new OpenLayers.Layer.Vector("Locus Layer");
    
    map.addLayers([aerial, hybrid, esriOcean, storyPointLayer, locusLayer]);
    
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.MousePosition());
    
    var drawPointControls, drawLocusControls, selectStoryPointControl, selectLocusControl, selectedFeature;
    
    selectLocusControl = new OpenLayers.Control.SelectFeature(locusLayer,
        {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect});
    selectStoryPointControl = new OpenLayers.Control.SelectFeature(storyPointLayer,
        {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect});
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
        
        if (e.relatedTarget.id == "dashboard-tab") {
            dash_map_status = {
                center: map.center,
                zoom: map.zoom
            };
            drawPointControls['point'].deactivate();
            selectStoryPointControl.deactivate();
        } else if (e.relatedTarget.id == "settings-tab") {
            set_map_status = {
                center: map.center,
                zoom: map.zoom
            };
            selectLocusControl.deactivate();
            drawLocusControls['polygon'].deactivate();
            drawLocusControls['select'].deactivate();
        } else if (e.relatedTarget.id == "world-tab") {
            other_map_status = {
                center: map.center,
                zoom: map.zoom
            };
            selectLocusControl.deactivate();
            selectStoryPointControl.deactivate();
        }
        
        if (e.target.id == "dashboard-tab") {
            drawPointControls['point'].activate();
            selectStoryPointControl.activate();
            $('#dash-map').show();
            map.render("dash-map");
            map.setCenter(dash_map_status.center, dash_map_status.zoom);
        } else if (e.target.id == "settings-tab" ) {
            selectLocusControl.activate();
            $('#your-locus').show();
            map.render("your-locus");
            map.setCenter(set_map_status.center, set_map_status.zoom);
        } else if (e.target.id == "world-tab" ) {
            selectLocusControl.deactivate();
            selectStoryPointControl.deactivate();
            $('#loci-map').show();
            map.render("loci-map");
            map.setCenter(other_map_status.center, other_map_status.zoom);
        }
        
    });
    
    var click = new OpenLayers.Control.Click();
    map.addControl(click);
    click.activate();
    
    
    
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