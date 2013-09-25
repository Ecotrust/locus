var app;
    
var mapShown = false;

function init() {
    
    mapInit();

    // Activates knockout.js
    ko.applyBindings(new AppViewModel());

}

function AppViewModel() {
    
    app = this;
    
    /*---------------------------------------------------------------------
            Example JSON AppViewModel
    ---------------------------------------------------------------------*/

    this.userID = ko.observable();
    this.userHasLocus = ko.observable();
    this.locusSelected = ko.observable(false);

    this.userID.subscribe(function(str) {
        if (str == 'None' && app.userHasLocus() != false) {
            $('#locusTabs').children('li').children('a').attr('data-toggle', null);
            $('#locusTabs').children('li').children('a').attr('class', 'tab-disabled');
            $('#locusTabs').children('li').children('a').attr('href', null);
        } else {
            $('#locusTabs').children('li').children('a').attr('data-toggle', 'tab');
            $('#locusTabs').children('li').children('a').removeClass('tab-disabled');
            $('#home-tab').attr('href', '#home-tab-content');
            $('#dashboard-tab').attr('href', '#dashboard-tab-content');
            $('#details-tab').attr('href', '#details-tab-content');
            $('#settings-tab').attr('href', '#settings-tab-content');
            $('#friends-tab').attr('href', '#friends-tab-content');
            $('#world-tab').attr('href', '#world-tab-content');
        }
    });

    this.userHasLocus.subscribe(function(bool) {
        if (bool && app.userID() != 'None') {
            $('#locusTabs').children('li').children('a').attr('data-toggle', 'tab');
            $('#locusTabs').children('li').children('a').removeClass('tab-disabled');
            $('#home-tab').attr('href', '#home-tab-content');
            $('#dashboard-tab').attr('href', '#dashboard-tab-content');
            $('#details-tab').attr('href', '#details-tab-content');
            $('#settings-tab').attr('href', '#settings-tab-content');
            $('#friends-tab').attr('href', '#friends-tab-content');
            $('#world-tab').attr('href', '#world-tab-content');
        } else {
            // $('#settings-tab').click()
            $('#dashboard-tab').attr('data-toggle', null);
            $('#details-tab').attr('data-toggle', null);
            $('#dashboard-tab').attr('class', 'tab-disabled');
            $('#details-tab').attr('class', 'tab-disabled');
            $('#dashboard-tab').attr('href', null);
            $('#details-tab').attr('href', null);
        }
    })

    this.userID(userID);

    if (userLocus){
        this.userHasLocus(true);
    } else {
        this.userHasLocus(false);
    }
    
    this.users = ko.observable(users);

    this.storyPoints = ko.observable();

    /*---------------------------------------------------------------------
            DASHBOARD AppViewModel
    ---------------------------------------------------------------------*/
    
    this.communityJSON = [];
    this.communityUsersJSON = {};
    this.newsJSON = [];
    
    var userLocusVector = new OpenLayers.Feature.Vector(userLocus, {});
    locusLayer.addFeatures([userLocusVector]);
    
    this.communityFeed = ko.observable(JSON2ComFeedHTML(this.communityJSON, users));      //static object to be replaced with AJAX call
    // this.communityFeed = ko.observable(JSON2ComFeedHTML(this.communityJSON, this.communityUsersJSON));      //static object to be replaced with AJAX call
    
    this.newsFeed = ko.observable(JSON2NewsFeedHTML(this.newsJSON));      //static object to be replaced with AJAX call
    
    /*---------------------------------------------------------------------
            DETAILS AppViewModel
    ---------------------------------------------------------------------*/
    

    //TODO: on userLocus change, collapse the appropriate accordion groups.

    this.reportDetailsJSON = {
        'summary': {
            'definition': '\
                <div class="box">\
                    <p>\
                        <strong>Overview: </strong>\
                        provides estimates of size, population, temperature, and\
                        precipitation for your bioregion.\
                    </p>\
                    <p>\
                        <strong>Language:</strong>\
                        provides information related to what languages are currently\
                        spoken within your bioregion and what languages have historically\
                        been spoken.\
                    </p>\
                    <p>\
                        <strong>Natural Resources:</strong>\
                        provides information related to primary productivity, agriculture,\
                        and existing ecoregions.\
                    </p>\
                </div>'
        },
        'vulnerabilities': {
            'definition': '\
                <div class="box">\
                    <p>\
                        <strong>Climate Change:</strong>\
                        provides information related to impacts on agriculture, water, and land loss due to sea level rise.\
                    </p>\
                    <p>\
                        <strong>Socio-Economic:</strong>\
                        provides information related to human impacts, human needs, social equity, and cultural pressures.\
                        </p>\
                    <p>\
                        <strong>Natural Hazards:</strong>\
                        provides information related to potential natural hazards and their economic costs.\
                    </p>\
                </div>'
        }
    };

    this.detailsSummaryOverview = ko.observable("");
    this.detailsSummaryLanguage = ko.observable("");
    this.detailsSummaryResources = ko.observable("");
    this.detailsVulnerabilitiesClimate = ko.observable("");
    this.detailsVulnerabilitiesSocEcon = ko.observable("");
    this.detailsVulnerabilitiesHazards = ko.observable("");
    
    this.clearReports = function() {
        app.detailsSummaryOverview("<p><img src='/media/img/ajax-loader.gif' />Loading...</p>");
        app.detailsSummaryLanguage("<p><img src='/media/img/ajax-loader.gif' />Loading...</p>");
        app.detailsSummaryResources("<p><img src='/media/img/ajax-loader.gif' />Loading...</p>");
        app.detailsVulnerabilitiesClimate("<p><img src='/media/img/ajax-loader.gif' />Loading...</p>");
        app.detailsVulnerabilitiesSocEcon("<p><img src='/media/img/ajax-loader.gif' />Loading...</p>");
        app.detailsVulnerabilitiesHazards("<p><img src='/media/img/ajax-loader.gif' />Loading...</p>");
        // $('.collapse').hide();
    };

    this.clearReports();

    this.detailsSummaryDefinition = ko.observable();

    this.getSummaryOverview = function() {
        url = "/reports/overview/" + this.userID();
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){
                app.detailsSummaryOverview(data);
            }
        });
    };


    this.getSummaryLanguage = function() {
        url = "/reports/language/" + this.userID();
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){
                app.detailsSummaryLanguage(data);
            }
        });
    };


    this.getSummaryResources = function() {
        url = "/reports/resources/" + this.userID();
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){
                app.detailsSummaryResources(data);
            }
        });
    };

    this.detailsVulnerabilitiesDefinition = ko.observable(this.reportDetailsJSON['vulnerabilities']['definition']);

    this.getVulnerabilityClimate = function() {
        url = "/reports/climate/" + this.userID();
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){
                app.detailsVulnerabilitiesClimate(data);
            }
        });
    };

    this.getVulnerabilitySocEcon = function() {
        url = "/reports/socioeconomic/" + this.userID();
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){
                app.detailsVulnerabilitiesSocEcon(data);
            }
        });
    };

    this.getVulnerabilityHazards = function() {
        url = "/reports/hazards/" + this.userID();
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){
                app.detailsVulnerabilitiesHazards(data);
            }
        });
    };
    
    /*---------------------------------------------------------------------
            SETTINGS AppViewModel
    ---------------------------------------------------------------------*/
    
    this.showSpinner = ko.observable(false);
    this.biggest = ko.observable(false);
    this.smallest = ko.observable(false);
    this.drawing = ko.observable(false);
    this.locusName = ko.observable(locus_name);
    this.locus_type = ko.observable(null)
    this.ns_public_box = ko.observable(news_sources.ns_public_story_points);
    this.ns_friend_box = ko.observable(news_sources.ns_friend_story_points);
    this.ns_tweets_box = ko.observable(news_sources.ns_tweets);

    if (userLocus) {
        if (userLocus.size_class) {     //Locus is generated
            this.locus_type('generated');
        } else {                        //Locus is drawn
            this.locus_type('drawn');
        }
    }

    this.clearLocus = function() {
        locusLayer.removeAllFeatures();
        gen_id = null;
        userLocus = null;
        this.locus_type(null);
    };

    this.clearSelectedLocus = function() {
        selectedLocusLayer.removeAllFeatures();
        selectedLocus = null;
        this.locusSelected(false);
        this.biggest(false);
        this.smallest(false);
        this.drawing(false);
    };

    this.drawing.subscribe(function(bool) {
        if (bool) {
            $('#settings-map').toggleClass('span8', true);
            $('#settings-map').toggleClass('span12', false);
            $('#draw-instructions').toggleClass('span4', true);
            $('#draw-instructions').toggleClass('span0', false);
        } else {
            $('#settings-map').toggleClass('span8', false);
            $('#settings-map').toggleClass('span12', true);
            $('#draw-instructions').toggleClass('span8', false);
            $('#draw-instructions').toggleClass('span0', true);
        }
    });

    this.drawLocus = function(self, event){
        app.clearSelectedLocus();
        drawLocusControls['polygon'].activate();
        app.locus_type('drawn');
        app.drawing(true);
    };
    
    this.cancelLocus = function(self, event){
        app.clearSelectedLocus();
        app.locus_type(null);
    };

    this.setUserLocus = function(self, event) {
        //Check if locus is selected
        app.showSpinner(true);
        var feature = selectedLocusLayer.features[0];
        if (feature) {
            var geometry = feature.geometry.toString();
        } else {
            var geometry = "";
        }

        //Ajax call
        $.ajax({
            url: "/set_user_settings/",
            type: 'POST',
            data: {
                'wkt': geometry,
                'locus_type': app.locus_type(),
                'bioregion_gen': gen_id,
                'locus_name': app.locusName,
                'news_sources': '{\
                    "ns_tweets": ' + app.ns_tweets_box() + ',\
                    "ns_public_story_points": ' + app.ns_public_box() + ',\
                    "ns_friend_story_points": ' + app.ns_friend_box() + '\
                }'
            },
            dataType: 'json',
            success: function(data){
                app.clearLocus();
                app.clearReports();
                app.userHasLocus(true);
                locusLayer.addFeatures([selectedLocusLayer.features[0]]);
                app.showSpinner(false);
                alert('Settings saved.');
            }
        });

    };

    this.getBiggerLocus = function(self, event) {
        if (locusSizeClass == 'medium') {
            locusSizeClass = 'large';
            this.biggest(true);
            this.smallest(false);
        } else if (locusSizeClass == 'small') {
            locusSizeClass = 'medium';
            this.biggest(false);
            this.smallest(false);
        }
        getBioregionByPoint(locusPointLatitude, locusPointLongitude, locusSizeClass);
    };

    this.getSmallerLocus = function(self, event) {
        if (locusSizeClass == 'medium') {
            locusSizeClass = 'small';
            this.smallest(true);
            this.biggest(false);
        } else if (locusSizeClass == 'large') {
            locusSizeClass = 'medium';
            this.smallest(false);
            this.biggest(false);
        }
        getBioregionByPoint(locusPointLatitude, locusPointLongitude, locusSizeClass);
    };

    /*---------------------------------------------------------------------
            FRIENDS AppViewModel
    ---------------------------------------------------------------------*/
    
    this.friendsJSON = [];
    // this.friendLocationsJSON = [];
    
    this.otherUsersJSON = [];
    // this.otherLocationsJSON = [];
    
    this.otherFriendsJSON = [];
    
    if (this.userID() != 'None') {
        this.user = this.users()[this.userID()];
        for (var key in this.users()){
            if (key != this.userID()) {
                if (this.user && this.user['friends'] && this.user['friends'].indexOf(key) > -1) {   //If user is a friend
                    if (this.users()[key].isLocusUser == true) {      //if friend is locus user
                        this.friendsJSON.push(this.users()[key]);
                        // this.friendLocationsJSON.push(this.locations[this.users()[key].location])
                    } else {        //if friend is not locus user
                        this.otherFriendsJSON.push(this.users()[key]);
                        // this.otherLocationsJSON.push(this.locations[this.users()[key].location])
                    }
                } else {        //if user is not a friend
                    if (this.users()[key].isLocusUser == true) {      //if other is locus user
                        this.otherUsersJSON.push(this.users[key])
                    }
                }
            }
        }
    }

    this.friendsList = ko.observable();
    getFriendsList();
  
    this.usersList = ko.observable();

    this.inviteList = ko.observable();
    
    /*---------------------------------------------------------------------
            OTHER LOCI AppViewModel
    ---------------------------------------------------------------------*/
    
    this.otherCommunityJSON = [];
    this.otherCommunityUsersJSON = {};
    this.otherNewsJSON = [];
    
    for (var key in this.storyPoints) {
        if (this.storyPoints.hasOwnProperty(key)){
            if (this.storyPoints[key].source_type == 'news') {
                this.otherNewsJSON.push(this.storyPoints[key]);
            } else if (this.storyPoints[key].sourcetype == 'user') {
                this.otherCommunityJSON.push(this.storyPoints[key]);
                this.otherCommunityUsersJSON[this.storyPoints[key].source] = this.users[this.storyPoints[key].source];
            }
        }
    }
    
    this.otherCommunityFeed = ko.observable(JSON2ComFeedHTML(this.otherCommunityJSON, users));      //static object to be replaced with AJAX call
    this.otherNewsFeed = ko.observable(JSON2NewsFeedHTML(this.otherNewsJSON));      //static object to be replaced with AJAX call
    
}

/*---------------------------------------------------------------------
        ACCOUNT
---------------------------------------------------------------------*/

function getFriendsList(){
    url = 'https://graph.facebook.com/me/friends';
    $.ajax({
        url: url,
        data: {
            'method': 'GET',
            'format': 'json',
            'access_token':token
        },
        dataType: 'jsonp',
        success: function(data){
            if(!data.error){
                frndlst = "";
                for(var i = 0; i < data.data.length; i++) {
                    frndlst = frndlst + "<p><img class=\"mug\" src=\"http://graph.facebook.com/" + data.data[i].id + "/picture?type=large\">" + data.data[i].name + "</p>";
                }
                app.friendsList(frndlst);
            }
        }
    });
}

/*---------------------------------------------------------------------
        DASHBOARD
---------------------------------------------------------------------*/

function JSON2UserFeedHTML(json, locations){
    var start_div = '<div class="row-fluid">\
            <div class="friend-card span11 well">\
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
    html = "";
    for (var i=0; i<json.length; i++) {
        html += start_div;
        html += "                        <div class=\"mug\"><img src=\"" + json[i].img + "\"/></div>";
        html += mid_div;
        html += "                        <h4>" + json[i].name + "</h4>";
        html += mid_div_2;
        html += "                        <p>" + locations[json[i].location].city +
                                        ", " + locations[json[i].location].district +
                                        ", " + locations[json[i].location].country + "</p>";
        html += end_div;
    }
    return html;
}

function JSON2ComFeedHTML(json, users){
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
    html = "";
    for (var i=0; i<json.length; i++) {
        html += start_div;
        html += "                        <div class=\"mug\"><img src=\"" + avatar_url + "\"/></div>";
        // html += "                        <div class=\"mug\"><img src=\"" + users[json[i].source].img + "\"/></div>";
        html += mid_div;
        //html += "                        <h4>" + users["2"].name + "</h4>";
        // html += "                        <h4>" + users[json[i].source].name + "</h4>";
        html += mid_div_2;
        html += "                        <p>" + json[i].text + "</p>";
        html += end_div;
    }
    return html;
}

function JSON2NewsFeedHTML(json){
    var start_div = '<div class="row-fluid">'
    var well_div = '    <div class="span11 well friend-card">\
                <div class="row-fluid">\
                    <div class="span12">';
    var end_well_div = '                </div>\
                </div>\
            </div>'
    var end_div = '</div>';
    html = "";
    for (var i=0; i<json.length; i++) {
        html += start_div;
        html += "                        <a href=\"" + json[i].source + "\" target=\"_blank\" class=\"news-title\">";
        html += well_div;
        html += "                        <div class=\"news-img\"><img src=\"" + json[i].img + "\"/></div>\
                                        <h4>" + json[i].title + "</h4>\
                                        <p>" + json[i].text + "</p>";
        html += end_well_div;
        html += "                        </a>";
        html += end_div;
    }
    return html;
}

function JSON2CheckboxesHTML(json){
    html = "";
    for (var i=0; i<json.length; i++) {
        html += '<label class="checkbox">\
            <input type="checkbox" value="' + json[i]['id'] + '">' + json[i]['name'] + '\
        </label>';
    }
    return html;
}

function cleanOldSelected(){
    while (map.popups.length > 0) {
        var removePoint = false;
        map.removePopup(map.popups[0]);
        if (selectedFeature.popup){
            if (selectedFeature.popup.id == "new-popup" && !selectedFeature.attributes.storyPoint){
                removePoint = true;
            }
            selectedFeature.popup.destroy();
            selectedFeature.popup = null;
        }
        if (removePoint) {
            storyPointLayer.removeFeatures(selectedFeature);
        }
    }
}

function onPopupClose(evt) {
    map.removePopup(selectedFeature.popup);
}

function onNewPopupClose(evt) {
    map.removePopup(selectedFeature.popup);
    if (!selectedFeature.attributes.storyPoint) {
        storyPointLayer.removeFeatures(selectedFeature);
    }
}

function onPostAdd(event) {
    cleanOldSelected();
    if (mapShown) {
        selectedFeature = event.feature;
        popup = newPopup();
        selectedFeature.popup = popup;
        map.addPopup(popup);
    }
}

function onPointSelect(event) {
    cleanOldSelected();
    if (mapShown) {
        selectedFeature = event.feature;
        if (!selectedFeature.popup) {
            selectedFeature.popup = makePopup(selectedFeature);
        }
        map.addPopup(selectedFeature.popup);
    }
}

function onPointUnselect(event) {
    map.removePopup(event.feature.popup);
}

function newPopup() {
    html = "<div class=\"row-fluid, new-storypoint\">\
                <div class=\"span8\">\
                    <form id=\"new-post-form\" class=\"new-storypoint\" onSubmit=\"JavaScript:postNew(event)\">\
                        <textarea id=\"post-text\" rows=\"2\" class=\"new-storypoint\">What's happening?</textarea>\
                        <div class=\"row-fluid new-storypoint-controls\">\
                            <div class=\"span4\">\
                                <button class=\"btn, new-storypoint\">Post</button>\
                            </div>\
                            <div class=\"span8\">\
                                <label class=\"checkbox\">\
                                    <input id=\"post-permanent\" type=\"checkbox\" value=\"\">Make permanent</input>\
                                </label>\
                            </div>\
                        </div>\
                    </form>\
                </div>\
            </div>";
            
    var popup = new OpenLayers.Popup.FramedCloud("new-popup", 
                                     selectedFeature.geometry.getBounds().getCenterLonLat(),
                                     new OpenLayers.Size(100,100),
                                     html,
                                     null, 
                                     true, 
                                     onNewPopupClose);
    return popup;
}

function postNew(event){
    event.preventDefault();
    var date = new Date().getTime()
    selectedFeature.attributes = {
        'storyPoint': {
            'content': $('#post-text')[0].value,
            'date':date,
            'flag_reason': "",
            'flagged': false,
            'id': newUid(app.storyPoints()),
            'image': avatar_url,
            'isPerm': $('#post-permanent')[0].checked,
            'source_link': "",
            'source_type': "user",
            'source_user_id': app.userID(),
            'title': app.user.name + " Says:",
            'geometry': selectedFeature.geometry
        }
    }
    cleanOldSelected();
}

function newUid(set){
    //from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    if (!set.hasOwnProperty(uid)){
        return uid;
    } else {
        return newUid(type)
    }
}

function makePopup(feature) {
    if (feature.attributes.storyPoint.source_type != 'user') {
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
                <div class=\"news-bubble-img\"><img src=\"" + storyPoint.image + "\"/></div>\
                <a href=\"" + storyPoint.source_link + "\" target=\"_blank\" class=\"news-title\"><h4>" + storyPoint.title + "</h4></a>\
            </div>";
    return html;
}

function postBubble(storyPoint) {
    var html = "<div class=\"post-bubble\">\
                        <div class=\"post-bubble-img\"><img src=\"" + storyPoint.image + "\"/></div>\
                        <h4>" + storyPoint.title + "</h4>\
                        <p>" + storyPoint.content + "</p>\
                </div>";
    return html;
}

function getBubbleContentHTML(lonlat) {
    // lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
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

/*---------------------------------------------------------------------
        DETAILS
---------------------------------------------------------------------*/

/*---------------------------------------------------------------------
        SETTINGS
---------------------------------------------------------------------*/

function onLocusAdd(event) {
}

function onLocusSelect(event) {
}

function onLocusUnselect(event) {
}

function onSelectedLocusAdd(event) {
    drawLocusControls['polygon'].deactivate();
}

function onSelectedLocusSelect(event) {
}

function onSelectedLocusUnselect(event) {
}


/*---------------------------------------------------------------------
        FRIENDS
---------------------------------------------------------------------*/

/*---------------------------------------------------------------------
        OTHER LOCI
---------------------------------------------------------------------*/

function onOtherLocusSelect(event) {
}

function onOtherLocusUnselect(event) {
}
