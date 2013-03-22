function init() {
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
    var apiKey = "AvD-cuulbvBqwFDQGNB1gCXDEH4S6sEkS7Yw9r79gOyCvd2hBvQYPaRBem8cpkjv";
    var map_extent = new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34);
    var map = new OpenLayers.Map(null, {
      restrictedExtent: map_extent,
      displayProjection: new OpenLayers.Projection("EPSG:4326"),
      projection: "EPSG:4326"
    });
    map.addControl(new OpenLayers.Control.LayerSwitcher());

    /*
    var road = new OpenLayers.Layer.Bing({
        name: "Road",
        key: apiKey,
        type: "Road"
    });
    */
    var hybrid = new OpenLayers.Layer.Bing({
        name: "Hybrid",
        key: apiKey,
        type: "AerialWithLabels"
    });
    var aerial = new OpenLayers.Layer.Bing({
        name: "Aerial",
        key: apiKey,
        type: "Aerial"
    });

    map.addLayers([aerial, hybrid]);

    $('a[data-toggle="tab"]').on('shown',function(e) {
        
        if (e.relatedTarget.id == "dashboard-tab") {
            dash_map_status = {
                center: map.center,
                zoom: map.zoom
            }
        } else if (e.relatedTarget.id == "settings-tab") {
            set_map_status = {
                center: map.center,
                zoom: map.zoom
            }
        } else if (e.relatedTarget.id == "world-tab") {
            other_map_status = {
                center: map.center,
                zoom: map.zoom
            }
        }
        
        if (e.target.id == "dashboard-tab") {
            map.render("dash-map");
            map.setCenter(dash_map_status.center, dash_map_status.zoom);
        } else if (e.target.id == "settings-tab" ) {
            map.render("your-locus");
            map.setCenter(set_map_status.center, set_map_status.zoom);
        } else if (e.target.id == "world-tab" ) {
            map.render("loci-map");
            map.setCenter(other_map_status.center, other_map_status.zoom);
        }
        
    });
}