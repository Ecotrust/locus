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


    // Activates knockout.js
    ko.applyBindings(new AppViewModel());

}

function AppViewModel() {
    
    /*---------------------------------------------------------------------
            DASHBOARD AppViewModel
    ---------------------------------------------------------------------*/
    
    this.communityJSON = [
        {
            'img': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYyzOW1JKSJABKWCPjoGclLfngFotuZOzW3TBlwveMMnSbSaj",
            'name': "Charlie",
            'msg': "Tiger blood!"
        },
        {
            'img': "https://si0.twimg.com/profile_images/3383369551/b25b46ee871bb862bac7bb0fe2afe9f0.jpeg",
            'name': "Florida Man",
            'msg': "Florida Man Arrested For Threatening Neighbor With Machete, Says He Was Just Pruning Palm Tree."
        }
    ];
    
    this.communityFeed = ko.observable(JSON2HTML(this.communityJSON));      //static object to be replaced with AJAX call
    
    this.newsJSON = [
        {
            'img': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYyzOW1JKSJABKWCPjoGclLfngFotuZOzW3TBlwveMMnSbSaj",
            'name': "Charlie",
            'msg': "Tiger blood!"
        },
        {
            'img': "https://si0.twimg.com/profile_images/3383369551/b25b46ee871bb862bac7bb0fe2afe9f0.jpeg",
            'name': "Florida Man",
            'msg': "Florida Man Arrested For Threatening Neighbor With Machete, Says He Was Just Pruning Palm Tree."
        }
    ];
    
    this.newsFeed = ko.observable(JSON2HTML(this.newsJSON));      //static object to be replaced with AJAX call
    
    /*---------------------------------------------------------------------
            DETAILS AppViewModel
    ---------------------------------------------------------------------*/
    
    /*---------------------------------------------------------------------
            SETTINGS AppViewModel
    ---------------------------------------------------------------------*/
    
    /*---------------------------------------------------------------------
            FRIENDS AppViewModel
    ---------------------------------------------------------------------*/
    
    /*---------------------------------------------------------------------
            OTHER LOCI AppViewModel
    ---------------------------------------------------------------------*/
    
}


/*---------------------------------------------------------------------
        DASHBOARD
---------------------------------------------------------------------*/

function JSON2HTML(json){
    var start_div = '<div class="row-fluid">\
            <div class="span11 well friend-card">\
                <div class="row-fluid">\
                    <div class="span2">';
    var mid_div = '                    </div>\
                    <div class="span10">';
    var mid_div_2 = '                    </div>\
                </div>\
                <div class="row-fluid">\
                    <div class="span12">';
    var end_div = '                </div>\
                </div>\
            </div>\
        </div>';
    html = ""
    for (var i=0; i<json.length; i++) {
        html += start_div;
        html += "                        <img src=\"" + json[i].img + "\"/>";
        html += mid_div;
        html += "                        <h4>" + json[i].name + "</h4>";
        html += mid_div_2;
        html += "                        <p>" + json[i].msg + "</p>";
        html += end_div;
    }
    return html;
}
/*---------------------------------------------------------------------
        DETAILS
---------------------------------------------------------------------*/

/*---------------------------------------------------------------------
        SETTINGS
---------------------------------------------------------------------*/

/*---------------------------------------------------------------------
        FRIENDS
---------------------------------------------------------------------*/

/*---------------------------------------------------------------------
        OTHER LOCI
---------------------------------------------------------------------*/