var app;

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
    
    this.userID = userID;
    
    this.users = users;
    
    this.storyPoints = storyPoints;
    
    this.locations = locations;
    
    /*---------------------------------------------------------------------
            DASHBOARD AppViewModel
    ---------------------------------------------------------------------*/
    
    this.communityJSON = [];
    this.communityUsersJSON = {};
    this.newsJSON = [];
    this.features = [];
    
    for (var key in this.storyPoints) {
        if (this.storyPoints.hasOwnProperty(key)) {
            if (this.storyPoints[key].type == 'news') {
                this.newsJSON.push(this.storyPoints[key]);
            } else if (this.storyPoints[key].type == 'post') {
                this.communityJSON.push(this.storyPoints[key]);
                this.communityUsersJSON[this.storyPoints[key].source] = this.users[this.storyPoints[key].source];
            }
            var coords = this.storyPoints[key].geometry.coordinates;
            var point = new OpenLayers.Geometry.Point(coords[0],coords[1]);
            var feature = new OpenLayers.Feature.Vector(point,{
                'storyPoint':storyPoints[key]
            });
            this.features.push(feature);
        }
    }
    storyPointLayer.addFeatures(this.features);
    
    this.communityFeed = ko.observable(JSON2ComFeedHTML(this.communityJSON, this.communityUsersJSON));      //static object to be replaced with AJAX call
    
    this.newsFeed = ko.observable(JSON2NewsFeedHTML(this.newsJSON));      //static object to be replaced with AJAX call
    
    /*---------------------------------------------------------------------
            DETAILS AppViewModel
    ---------------------------------------------------------------------*/
    
    this.reportDetailsJSON = reportDetailsJSON;
    
    this.detailsSummaryDefinition = ko.observable(this.reportDetailsJSON['summary']['definition']);
    this.detailsSummaryOverview = ko.observable(this.reportDetailsJSON['summary']['overview']);
    this.detailsSummaryLanguage = ko.observable(this.reportDetailsJSON['summary']['language']);
    this.detailsSummaryResources = ko.observable(this.reportDetailsJSON['summary']['resources']);
    this.detailsVulnerabilitiesDefinition = ko.observable(this.reportDetailsJSON['vulnerabilities']['definition']);
    this.detailsVulnerabilitiesClimate = ko.observable(this.reportDetailsJSON['vulnerabilities']['climate']);
    this.detailsVulnerabilitiesSocEcon = ko.observable(this.reportDetailsJSON['vulnerabilities']['socecon']);
    this.detailsVulnerabilitiesHazards = ko.observable(this.reportDetailsJSON['vulnerabilities']['hazards']);
    
    /*---------------------------------------------------------------------
            SETTINGS AppViewModel
    ---------------------------------------------------------------------*/
    
    /*---------------------------------------------------------------------
            FRIENDS AppViewModel
    ---------------------------------------------------------------------*/
    
    this.friendsJSON = [];
    // this.friendLocationsJSON = [];
    
    this.otherUsersJSON = [];
    // this.otherLocationsJSON = [];
    
    this.otherFriendsJSON = [];
    
    this.user = this.users[this.userID];
    for (var key in this.users){
        if (key != this.userID) {
            if (this.user['friends'].indexOf(key) > -1) {   //If user is a friend
                if (this.users[key].isLocusUser == true) {      //if friend is locus user
                    this.friendsJSON.push(this.users[key]);
                    // this.friendLocationsJSON.push(this.locations[this.users[key].location])
                } else {        //if friend is not locus user
                    this.otherFriendsJSON.push(this.users[key]);
                    // this.otherLocationsJSON.push(this.locations[this.users[key].location])
                }
            } else {        //if user is not a friend
                if (this.users[key].isLocusUser == true) {      //if other is locus user
                    this.otherUsersJSON.push(this.users[key])
                }
            }
                
        }
    }

    this.friendsList = ko.observable(JSON2UserFeedHTML(this.friendsJSON, this.locations));
  
    this.usersList = ko.observable(JSON2UserFeedHTML(this.otherUsersJSON, this.locations));

    this.inviteList = ko.observable(JSON2CheckboxesHTML(this.otherFriendsJSON));
    
    /*---------------------------------------------------------------------
            OTHER LOCI AppViewModel
    ---------------------------------------------------------------------*/
    
    this.otherCommunityJSON = [];
    this.otherCommunityUsersJSON = {};
    this.otherNewsJSON = [];
    
    for (var key in this.storyPoints) {
        if (this.storyPoints.hasOwnProperty(key)){
            if (this.storyPoints[key].type == 'news') {
                this.otherNewsJSON.push(this.storyPoints[key]);
            } else if (this.storyPoints[key].type == 'post') {
                this.otherCommunityJSON.push(this.storyPoints[key]);
                this.otherCommunityUsersJSON[this.storyPoints[key].source] = this.users[this.storyPoints[key].source];
            }
        }
    }
    
    this.otherCommunityFeed = ko.observable(JSON2ComFeedHTML(this.otherCommunityJSON, this.otherCommunityUsersJSON));      //static object to be replaced with AJAX call
    this.otherNewsFeed = ko.observable(JSON2NewsFeedHTML(this.otherNewsJSON));      //static object to be replaced with AJAX call
    
}


/*---------------------------------------------------------------------
        DASHBOARD
---------------------------------------------------------------------*/

function JSON2UserFeedHTML(json, locations){
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
        html += "                        <div class=\"mug\"><img src=\"" + users[json[i].source].img + "\"/></div>";
        html += mid_div;
        html += "                        <h4>" + users[json[i].source].name + "</h4>";
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