var app;
var CPM = CPM || {};
var mapShown = false;

function init() {

/*
 *

        var user = '{{userName}}';
        var userID = '{{userId}}';
        var userprovider = '{{userProvider}}';
        var token = '{{token}}';
        var avatar_url = '{{avatar}}'      //TODO: Replace with id and plug in to avatar address.
        var geojson_format = new OpenLayers.Format.GeoJSON();
        var userLocus = geojson_format.read('{{userLocus}}'.replace(/&quot;/ig, '"'));
        if (userLocus && userLocus.length > 0) {
            userLocus = userLocus[0].geometry;
        }
        var gen_id = {{genId}};
        var locus_name = '{{locusName}}';
        var news_sources = $.parseJSON('{{newsSources}}'.replace(/&quot;/ig, '"'));
        var locusSizeClass = 'medium';
        var appID = '{{appID}}'


*/
}

$(document).ready(function () {
	//init();
    mapInit();

    // Activates knockout.js
    ko.applyBindings(new AppViewModel());

	//table of contents
	CPM.tocHandler();

	// about overlay
	CPM.aboutHandler();

	// circles are pretty. 
	CPM.prettyLabels();

	/*
        if (userLocus && userLocus.length > 0) {
            userLocus = userLocus[0].geometry;
        }
*/

	//set settings as the active tab
	//TODO Dashboard should be first if the user has an existing loci
	if ( userID !== 'None' ) {
		//$('#dashboard-tab').tab('show');		
		$('#friends-tab').tab('show');		
	} else {
		$('#home-tab').tab('show');		
	};
});

function OptionDef(name, value){
    var self = this;
    self.name = name;
    self.value = value;
};

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
    
    this.storyPoints = ko.observable();

    /*---------------------------------------------------------------------
            DASHBOARD AppViewModel
    ---------------------------------------------------------------------*/

    this.focusLocus = ko.observable(userLocus);

    availableLayers = ko.observableArray([
        new OptionDef('My Locus', 'Mine'),
        new OptionDef('Friends\' Loci', 'Friend'),
        new OptionDef('All Loci', 'All')
    ]);

    baseLayers = ko.observableArray([
        new OptionDef('Aerial', 'Aerial'),
        new OptionDef('Hybrid', 'Hybrid'),
        new OptionDef('ESRI Ocean', 'Ocean')
    ]);

    self.selectedLayer = ko.observable(self.availableLayers()[0]);
    self.selectedBaseLayer = ko.observable(self.baseLayers()[0]);

    this.communityJSON = ko.observable([]);
    // this.communityUsersJSON = {};
    this.newsJSON = ko.observable([]);
    this.newsItems = ko.observable([]);
    this.communityFeed = ko.observable();
    this.newsFeed = ko.observable();
    
    var userLocusVector = new OpenLayers.Feature.Vector(userLocus, {});
    map.locusLayer.addFeatures([userLocusVector]);

    function sortStoryFeed(a,b) {
        var a_date = Date.parse(a.data.storyPoint.date);
        var b_date = Date.parse(b.data.storyPoint.date);

        if (a_date < b_date) {
            return 1;
        }
        if (a_date > b_date) {
            return -1;
        }
        return 0;
    };

    this.getStoryFeeds = function() {
        app.communityJSON([]);
        //app.newsJSON([]);
        app.newsItems([]);
        app.storyPoints().sort(sortStoryFeed);
        for (var i = 0; i < app.storyPoints().length; i++) {
            spoint = app.storyPoints()[i];
            if (spoint.data.storyPoint.source_type == 'user') {
                app.communityJSON(app.communityJSON().concat(spoint));
            } else {
                //app.newsJSON(app.newsJSON().concat(spoint));
                app.newsItems(app.newsItems().concat(spoint.data.storyPoint));
            }
        }
        app.users = [];
        this.communityFeed(JSON2ComFeedHTML(this.communityJSON()));
        //this.newsFeed(JSON2NewsFeedHTML(this.newsJSON()));
        
    };

    self.layerChanged = function() {
        var opt = self.selectedLayer().value;
        if (opt == 'Mine'){
            map.locusLayer.setVisibility(true);
            map.storyPointLayer.setVisibility(true);
            map.zoomToExtent(map.locusLayer.getDataExtent());
        } else {
            map.locusLayer.setVisibility(false);
            map.storyPointLayer.setVisibility(false);
        }
        if (opt == 'Friend'){
            map.friendLayer.setVisibility(true);
            map.zoomToExtent(map.friendLayer.getDataExtent());
        } else {
            map.friendLayer.setVisibility(false);
        }
		if (opt == 'All'){
            map.lociLayer.setVisibility(true);
            map.zoomToExtent(map.lociLayer.getDataExtent());
        } else {
            map.lociLayer.setVisibility(false);
        }
    };

    self.baseLayerChanged = function() {
        var opt = self.selectedBaseLayer().value;
        if (opt == 'Aerial'){
            map.setBaseLayer(map.aerial);
        }
        if (opt == 'Hybrid'){
            map.setBaseLayer(map.hybrid);
        }
        if (opt == 'Ocean'){
            map.setBaseLayer(map.esriOcean);
        }
    };

    /*---------------------------------------------------------------------
            DETAILS AppViewModel
    ---------------------------------------------------------------------*/
    

    //TODO: on userLocus change, collapse the appropriate accordion groups.

	// No longer used. Inserted into HTML 8/21/14-wm
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

    this.detailsSummaryDefinition = ko.observable(this.reportDetailsJSON['summary']['definition']);

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
        map.locusLayer.removeAllFeatures();
        gen_id = null;
        userLocus = null;
        this.locus_type(null);
    };

    this.clearSelectedLocus = function() {
        map.selectedLocusLayer.removeAllFeatures();
        selectedLocus = null;
        this.locusSelected(false);
        this.biggest(false);
        this.smallest(false);
        this.drawing(false);
    };

    this.clearStoryPoints = function() {
        map.storyPointLayer.removeAllFeatures();
        if (this.userID() != 'None') {
            getStoryPoints();
        }
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
        var feature = map.selectedLocusLayer.features[0];
        if (feature) {
            var geometry = feature.geometry.toString();
            app.focusLocus(feature.geometry);
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
                app.clearStoryPoints();
                app.userHasLocus(true);
                map.locusLayer.addFeatures([map.selectedLocusLayer.features[0]]);
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
    
    this.friendsList = ko.observable();
    this.usersList = ko.observable();
    this.usersListHtml = ko.observable();
    this.friendRequests = ko.observable();
    if (this.userID() != 'None') {
        getFriendsList();
    }
  

    this.inviteList = ko.observable();
	//this.inviteListRaw populated in get_friends below
	this.inviteListRaw = ko.observableArray([]);
    this.inviteFriendsFilter = ko.observable("");

	this.inviteListFiltered = ko.computed(function () {
		var filter = app.inviteFriendsFilter().toLowerCase();

		if (!filter) {
			return app.inviteListRaw();
		} else {
		   return ko.utils.arrayFilter(app.inviteListRaw(), function (friend) {
				return friend.name.toLowerCase().indexOf(filter) != -1;
			});
		}

	}, this).extend({ throttle: 500 });    
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

    this.otherCommunityFeed = ko.observable(JSON2ComFeedHTML(this.otherCommunityJSON));      //static object to be replaced with AJAX call
    this.otherNewsFeed = ko.observable(JSON2NewsFeedHTML(this.otherNewsJSON));      //static object to be replaced with AJAX call
    
}

/*---------------------------------------------------------------------
        ACCOUNT
---------------------------------------------------------------------*/

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
        html += "                        <h4><a href=\"/get_storypoints/" + json[i].id + "/\">" + json[i].name + "</a></h4>";
        html += mid_div_2;
        html += "                        <p>" + locations[json[i].location].city +
                                        ", " + locations[json[i].location].district +
                                        ", " + locations[json[i].location].country + "</p>";
        html += end_div;
    }
    return html;
}

function JSON2ComFeedHTML____ORIGINAL(json){
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
        html += "                        <div class=\"mug\"><img src=\"" + json[i].data.storyPoint.image + "\"/></div>";
        html += mid_div;
        html += "                        <h4><a href=\"/get_storypoints/" + json[i].data.storyPoint.source_user_id + "/\">" + json[i].data.storyPoint.source_user_name + "</a></h4>";
        html += mid_div_2;
        html += "                        <p>" + json[i].data.storyPoint.content + "</p>";
        html += "                        <p class='feed-date'>" + json[i].data.storyPoint.date + "</p>";
        html += end_div;
    }
    return html;
}

/*
	<li><a href="#">
		<img src="http://ecotrust.org/media/RS665_City-of-Garibaldi-aerial-125x125.jpg" alt="">
		<div class="content">
			<h3>Abbey Smith</h3>
			<p>Commonplace Name</p>
		</div>
	</a></li>
*/

function JSON2ComFeedHTML(json){

    html = "";
    for (var i=0; i<json.length; i++) {

		html += '<li><a href="/get_storypoints/"'+ json[i].data.storyPoint.source_user_id + '>';
		html += '<img src="'+ json[i].data.storyPoint.image +'">';
		html += '<div class="content">';
		html += '<h3>'  + json[i].data.storyPoint.source_user_name + '</h3>';
		html += '<p>' + json[i].data.storyPoint.content + '</p>';
		html += '    <div class="meta">';
		html += '      <span class="source">News Source (in comps) / </span>';
		html += '      <time content="2014-05-13T19:00:38+00:00" datetime="2014-05-13T19:00:38+00:00" class="published" itemprop="datePublished"> ';
		html +=			json[i].data.storyPoint.date + '</time>';
		html += '    </div>';
		html += '</div>';
		html += '</a></li>';

		/*
        html += "                        <div class=\"mug\"><img src=\"" + json[i].data.storyPoint.image + "\"/></div>";
        html += "                        <h4><a href=\"/get_storypoints/" + json[i].data.storyPoint.source_user_id + "/\">" + json[i].data.storyPoint.source_user_name + "</a></h4>";
        html += "                        <p>" + json[i].data.storyPoint.content + "</p>";
        html += "                        <p class='feed-date'>" + json[i].data.storyPoint.date + "</p>";
		*/
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
        html += "                        <a href=\"" + json[i].data.storyPoint.source_link + "\" target=\"_blank\" class=\"news-title\">";
        html += well_div;
        html += "                        <div class=\"news-img\"><img src=\"" + json[i].data.storyPoint.image + "\"/></div>\
                                        <h4>" + json[i].data.storyPoint.title + "</h4>\
                                        <p>" + json[i].data.storyPoint.content + "</p>";
        html += "                       <p class='feed-date'>" + json[i].data.storyPoint.date + "</p>";
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
            map.storyPointLayer.removeFeatures(selectedFeature);
        }
    }
}

function onPopupClose(evt) {
    map.removePopup(selectedFeature.popup);
    unselectSelectedFeature(selectedFeature);
}

function onNewPopupClose(evt) {
    map.removePopup(selectedFeature.popup);
    if (!selectedFeature.attributes.storyPoint) {
        map.storyPointLayer.removeFeatures(selectedFeature);
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
                                <button class=\"btn new-storypoint\">Post</button>\
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
            
    var popup = new OpenLayers.Popup.Anchored("new-popup", 
                                     selectedFeature.geometry.getBounds().getCenterLonLat(),
                                     new OpenLayers.Size(325,375),
                                     html,
                                     null, 
                                     true, 
                                     onNewPopupClose);
    return popup;
}

function postNew(event){
    event.preventDefault();

    // TODO: Show spinner
    
    this.geom = selectedFeature.geometry.toString();
    $.ajax({
        url: "/set_storypoints/",
        type: 'POST',
        data: {
            'content': $('#post-text')[0].value,
            'image': avatar_url,
            'isPerm': $('#post-permanent')[0].checked,
            'source_type': "user",
            'source_user_id': app.userID(),
            'title': app.user.name + " Says:",
            'geometry': this.geom
        },
        dataType: 'json',
        success: function(data){
            if (data.status == 200) {
                selectedFeature.attributes = data.feature;
                cleanOldSelected();
                app.clearStoryPoints();
            } else {
                alert('Status: ' + data.status + " - " + data.message);
            }
        }
    });
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
	var popup;
    if (feature.attributes.storyPoint.source_type != 'user') {
        popup = new OpenLayers.Popup.Anchored("point-popup", 
                                     feature.geometry.getBounds().getCenterLonLat(),
                                     new OpenLayers.Size(185,185),
                                     newsBubble(feature.attributes.storyPoint),
									 null,
                                     true, 
                                     onPopupClose);
    } else {
        popup = new OpenLayers.Popup.Anchored("point-popup", 
                                     selectedFeature.geometry.getBounds().getCenterLonLat(),
                                     new OpenLayers.Size(185,185),
                                     postBubble(feature.attributes.storyPoint),
									 null,
									 true, 
									 onPopupClose);
    }
    popup.updateSize();
    return popup;
}

function newsBubble(storyPoint) {
    if (storyPoint.source_type == 'twitter'){
        var html = "<div class=\"news-bubble\">\
                    <div class=\"news-bubble-img\"><img src=\"" + storyPoint.image + "\"/></div>\
                    <a href=\"" + storyPoint.source_link + "\" target=\"_blank\" class=\"news-title\"><h4>" + storyPoint.title + "</h4></a>\
                    <p>" + storyPoint.content + "</p>\
                </div>";

    } else {
        var html = "<div class=\"news-bubble\">\
                    <div class=\"news-bubble-img\"><img src=\"" + storyPoint.image + "\"/></div>\
                    <a href=\"" + storyPoint.source_link + "\" target=\"_blank\" class=\"news-title\"><h4>" + storyPoint.title + "</h4></a>\
                </div>";
    }
    return html;
}

function postBubble(storyPoint) {
    if (storyPoint.source_user_id == userID){
        var actionContent = "<a href=\"/edit_storypoint/" + storyPoint.id + "/\"><i class=\"icon-pencil\"></i>edit</a><a class=\"pull-right\" href=\"/delete_storypoint/" + storyPoint.id + "/\"><i class=\"icon-remove\"></i>delete</a>";
    } else {
        var actionContent = "";
    }
    var html = "<div class=\"post-bubble\">\
                        <div class=\"post-bubble-img\"><img src=\"" + storyPoint.image + "\"/></div>\
                        <h4>" + storyPoint.title + "</h4>\
                        <p>" + storyPoint.content + "</p>" +
                        actionContent +
                "</div>";
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
        success: processFriendsList
    });
}

function processFriendsList(fb_result) {
    if(!fb_result.error){
        var friends = JSON.stringify(fb_result.data);
    } else {
        var friends = JSON.stringify([]);
    }
    $.ajax({
        url: '/get_friends/',
        type: 'POST',
        data: {
            'friends': friends,
            'user_id': app.userID()
        },
        dataType: 'json',
        success: function(data){
            frndlst = "";
            for(var i = 0; i < data.user_friends.length; i++) {
                if (data.user_friends[i].id) {
                    facebook_index = data.user_friends[i].providers.indexOf('facebook')
                    if (facebook_index > -1) {
                        frndlst = frndlst + 
                            "<li><img class=\"mug\" src=\"http://graph.facebook.com/" + 
                            data.user_friends[i].uids[facebook_index] +
                            "/picture?type=large\">" +
                            data.user_friends[i].name +
                            "<button class='icon-btn' title='Remove " + data.user_friends[i].name +
							"' onclick='deleteFriendship(" + data.user_friends[i].id + ")'>" +
                            "</li>";
                    } else {
                        frndlst = frndlst +
                            "<li><img class=\"mug\" src=\"/media/img/blank.png\">" +
                            data.user_friends[i].name +
                            "<button class='icon-btn' title='Remove " + data.user_friends[i].name +
							"' onclick='deleteFriendship(" + data.user_friends[i].id + ")'>" +
                            "</li>";
                    }
                }
            }
            app.friendsList(frndlst);

            strngrlst = "";
            for(var i = 0; i < data.user_strangers.length; i++){
                if (data.user_strangers[i].id) {
                    facebook_index = data.user_strangers[i].providers.indexOf('facebook');
                    if (facebook_index > -1) {
                        strngrlst = strngrlst + 
                            "<li><img class=\"mug\" src=\"http://graph.facebook.com/" +
                            data.user_strangers[i].uids[facebook_index] +
                            "/picture?type=large\">" +
                            data.user_strangers[i].name +
                            "<button class='icon-btn' onclick='requestFriendship(" + data.user_strangers[i].id + ")'><i class='category-icon icon-plus'></i></button>" +
                            "</li>";
                    } else {
                        strngrlst = strngrlst +
                            "<li><img class=\"mug\" src=\"/media/img/blank.png\">" +
                            data.user_strangers[i].name +
                            "<button class='icon-btn' onclick='requestFriendship(" + data.user_strangers[i].id + ")'><i class='category-icon icon-plus'></i></button>" +
                            "</li>";
                    }
                }
            }
            app.usersListHtml(strngrlst);

			// Create the Facebook Friends array
			ko.utils.arrayForEach(data.just_friends, function(item){
				app.inviteListRaw.push(item);
			});
			$('body').trigger('facebookLoaded');
			/*
            invitelst = "";
            for(var i=0; i < data.just_friends.length; i++) {
                if (data.just_friends[i].id) {
					app.inviteListRaw.push( data.just_friends[i] );
                    invitelst = invitelst + '<input class="invite-chk" type="checkbox" name="' + data.just_friends[i].name + '" value="' + data.just_friends[i].id + '">' + data.just_friends[i].name + '</input><br/>';
                }
            }
            app.inviteList(invitelst);
			*/

            reqlst = "";
            for(var i=0; i<data.friend_requests.length; i++){
                if (data.friend_requests[i].id) {
                    facebook_index = data.friend_requests[i].providers.indexOf('facebook');
                    if (facebook_index > -1) {
                        reqlst = reqlst + 
                            "<p><img class=\"mug\" src=\"http://graph.facebook.com/" +
                            data.friend_requests[i].uids[facebook_index] +
                            "/picture?type=large\">" +
                            data.friend_requests[i].name +
                            "<button class='btn' onclick='acceptFriendship(" + data.friend_requests[i].request_id + ")'>Accept</button>" +
                            "<button class='btn' onclick='declineFriendship(" + data.friend_requests[i].request_id + ")'>Decline</button>" +
                            "</p>";
                    } else {
                        reqlst = reqlst +
                            "<p><img class=\"mug\" src=\"/media/img/blank.png\">" +
                            data.friend_requests[i].name +
                            "<button class='btn' onclick='acceptFriendship(" + data.friend_requests[i].request_id + ")'>Accept</button>" +
                            "<button class='btn' onclick='declineFriendship(" + data.friend_requests[i].request_id + ")'>Decline</button>" +
                            "</p>";
                    }
                }
            app.friendRequests(reqlst)

            }

            getFriendLoci(data.user_friends);
        }
    });
}

function requestFriendship(requestee_id) {
    $.ajax({
        url: '/create_friend_request/',
        type: 'POST',
        data: {
            'requestee_id':requestee_id
        },
        success: function(data){
            alert(data)
        }
    })
}

function acceptFriendship(request_id){
    $.ajax({
        url: '/accept_friend_request/',
        type: 'POST',
        dataType: 'json',
        data: {
            'request_id': request_id
        },
        success: function(data){
            alert(data);
        }
    })
}

function declineFriendship(request_id){
    $.ajax({
        url: '/decline_friend_request/',
        type: 'POST',
        dataType: 'json',
        data: {
            'request_id': request_id
        },
        success: function(data){
            alert(data);
        }
    })
}

function deleteFriendship(unfriend_id) {
    $.ajax({
        url: '/delete_friendship/',
        type: 'POST',
        data: {
            'unfriend_id': unfriend_id
        },
        success: function(data){
            alert(data.message);
            // window.location.href="/";
        }
    })
}

function inviteFriends(formElement) {
    var inviteList = []
    var message = "";
    for (var i=0; i < formElement.elements.length; i++){
        if (formElement.elements[i].className == "invite-chk" && formElement.elements[i].checked){
            inviteList.push(formElement.elements[i].value);
        } else if (formElement.elements[i].className == "friend-textarea"){
            message = formElement.elements[i].value;
        }
    }
    if (inviteList.length > 0) {
        FB.ui({method: 'apprequests',
            message: message,
            to: inviteList
        }, function() {
            alert('Friends invited!');
        });
    } else {
        alert('Please select some friends to invite!');
    }
}

/*---------------------------------------------------------------------
        OTHER LOCI
---------------------------------------------------------------------*/

function onOtherLocusSelect(event) {
}

function onOtherLocusUnselect(event) {
}

// @TODO DRY FAIL
CPM.tocHandler = function () {
	var $toc = $('.toc'),
		$mask = $('<div class="mask"></div>'),
		$body = $('body');

	function toggleToc(evt) {

		if ( $toc.is('.open') ) {
			$('.mask').remove();
		} else {
			$body.append( $mask );
		}

		$toc.toggleClass('open');
	}

	$body.on('click ', '.toc-toggle, .toc a', toggleToc);

};
CPM.aboutHandler =  function() {
	var $about = $('.cp-about'),
		$home = $('#home-tab-content'),
		$aboutContent = $home.find('.content').html(),
		$mask = $('<div class="mask"></div>'),
		$body = $('body');

	function aboutToc(evt) {

		if ( $about.is('.open') ) {
			$('.mask').remove();
			$home.find('.content').html($aboutContent);
		} else {
			$about.find('.content').html($aboutContent);
			$body.append( $mask );
		}

		//$body.toggleClass('about-open');
		$about.toggleClass('open');
	}

	//$body.on('click ','.menu-about a, .about-open .mask, .cp-about a', aboutToc);
	$body.on('click ','.menu-about a, .cp-about a', aboutToc);
};

CPM.prettyLabels = function () {
	var $label, $input;

	$('#invite-form')
		.addClass('js')
		.on('click',  function(evt){
			// double triggering weirdness.
			if ( $(evt.target).is('.invite-chk') ) {
				return;
			}
			$label = $(evt.target).parents('li').find('label'),
			$input = $label.find('.invite-chk');

			$label.toggleClass('is-checked');

		});
};

CPM.resizeMap = function (){
    map.updateSize();
};

CPM.resizeIt = "";
window.onresize = function(){
  clearTimeout(CPM.resizeIt);
  CPM.resizeIt = setTimeout(CPM.resizeMap, 150);
};
