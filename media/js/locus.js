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
    
    this.communityFeed = ko.observable(JSON2FeedHTML(this.communityJSON));      //static object to be replaced with AJAX call
    
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
    
    this.newsFeed = ko.observable(JSON2FeedHTML(this.newsJSON));      //static object to be replaced with AJAX call
    
    /*---------------------------------------------------------------------
            DETAILS AppViewModel
    ---------------------------------------------------------------------*/
    
    this.reportDetailsJSON = {
            'summary': {
                'definition': ' <div class="box">\
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
                                </div>',
                'overview':"\
                    <h3>Area</h3>\
                    <div class='freetext'>\
                    <p>\
                    <table  style='width:430px' class='analysis_report_container'>\
                        <tbody>\
                            <tr class=\"grey\">\
                                <td colspan='2'><b>Overall Size of Bioregion</b></td>\
                            </tr>\
                            <tr>\
                                <td colspan='2'>920,674 km<sup>2</sup> / 355,474 mi<sup>2</sup></td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                            <tr class=\"grey\">\
                                <td colspan='2'><b>Terrestrial</b></td>\
                            </tr>\
                            <tr>\
                                <td colspan='2'>916,390 km<sup>2</sup> / 353,820 mi<sup>2</sup></td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                            <tr class=\"grey\">\
                                <td colspan='2'><b>Oceanic</b></td>\
                            </tr>\
                            <tr>\
                                <td colspan='2'>4,284 km<sup>2</sup> / 1,654 mi<sup>2</sup></td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                        </tbody>\
                    </table>\
                    </div>\
\
                    <h3>Population</h3>\
                    <div class='freetext'>\
                    <p>\
                    <table  style='width:430px' class='analysis_report_container'>\
                        <tbody>\
                            <tr class=\"grey\">\
                                <td colspan='2'>\
                                    <b>Estimated Population (2005)</b>\
                                    <sup><a id=\"displayText\" href=\"javascript:toggleDiv('pop05');\">Learn More</a><sup>\
                                    <div id=\"pop05\" style=\"display: none\">\
                                        <p>Gridded Population of the World version3 (GPWv3) data represents global population estimated for 2005.  \
                                        <p>The data is produced by the Columbia University Center for \
                                           International Earth Science Information Network (CIESIN) in collaboration with Centro \
                                           Internacional de Agricultura Tropical (CIAT).  \
                                        <p>In order to create a continuous population \
                                           surface, CIESIN uses a proportional allocation gridding algorithm, utilizing more than \
                                           300,000 national and sub-national administrative units.\
                                        <p>Complete documentation can be found \
                                          <a href=\"http://sedac.ciesin.columbia.edu/gpw/documentation.jsp\" target=\"_blank\">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td  colspan='2'>\
                                \
                                    \
                                        221.9 million\
                                    \
                                \
                                </td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                            <tr class=\"grey\">\
                                <td colspan='2'>\
                                    <b>Estimated Urban Population</b>\
                                    <sup><a id=\"displayText\" href=\"javascript:toggleDiv('urban');\">Learn More</a><sup>\
                                    <div id=\"urban\" style=\"display: none\">\
                                        <p>The urban population estimate was generated by overlaying urban extent data with population estimates for 2005.  \
                                        <p>The data is produced by the Columbia University Center for International Earth Science Information Network (CIESIN) \
                                           in collaboration with Centro Internacional de Agricultura Tropical (CIAT).\
                                        <p>Complete documentation and metadata can be found \
                                           <a href=\"http://sedac.ciesin.columbia.edu/gpw/documentation.jsp\" target=\"_blank\">here</a>.\
                                        <!--<p>This report is based on the Global Rural-Urban Mapping Project (GRUMP) Data Collection, Alpha version\
                                        <p>More information on the GRUMP dataset can be found <a href=\"http://sedac.ciesin.columbia.edu/gpw/metadata3.jsp\" target=\"_blank\">here</a>.\
                                        -->\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan='2'>\
                                    \
                                        \
                                            29.4 million\
                                        \
                                        (13%)\
                                    \
                                </td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                            <tr class=\"grey\">\
                                <td colspan='2'>\
                                    <b>Projected Population (for 2015)</b>\
                                    <sup><a id=\"displayText\" href=\"javascript:toggleDiv('pop15');\">Learn More</a><sup>\
                                    <div id=\"pop15\" style=\"display: none\">\
                                        <p>This data represents global population projected for 2015.  \
                                        <p>The data is produced by the Columbia University Center for International Earth Science Information Network (CIESIN) \
                                           in collaboration with Centro Internacional de Agricultura Tropical (CIAT).  \
                                        <p>The Gridded Population of the World: Future Estimates, 2015 (GPW2015) provides estimates of the world's population \
                                           by country and continent, for the year 2015 and converts the distribution of human population from sub-national \
                                           units to a series of 2.5 arc-minute quadrilateral grids. \
                                        <p>This 2015 data product is entirely derived from the spatial and population input data used to construct the \
                                           Gridded Population of the World version3 (GPWv3) (CIESIN and CIAT, 2005). This is comprised of administrative \
                                           boundary and associated population data.\
                                        <p>Complete documentation can be found \
                                           <a href=\"http://sedac.ciesin.columbia.edu/gpw/documentation.jsp\" target=\"_blank\">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan='2' style='width:225px'>\
                                \
                                    \
                                        261.4 million\
                                    \
                                    \
                                        (increase of 18%)\
                                    \
                                \
                                </td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                        </tbody>\
                    </table>\
                    </div>\
\
                    <h3>Temperature</h3>\
                        <div id=\"temp\" style=\"display: none\">\
                            <p>More information on the Temperature data layers can be found <a href=\"http://www.worldclim.org/\" target=\"_blank\">here</a>.\
                        </div>\
                    <div class='freetext'>\
                    <p>\
                    <table  style='width:430px' class='analysis_report_container'>\
                        <tbody>\
                            <tr class=\"grey\">\
                                <td>\
                                    <b>Median Minimum Temperature</b>\
                                    <sup><a id=\"displayText\" href=\"javascript:toggleDiv('min_temp');\">Learn More</a><sup>\
                                    <div id=\"min_temp\" style=\"display: none\">\
                                        <p>The median value of the minimum temperature during the coldest month.  \
                                        <p>More information on the Temperature datasets can be found <a href=\"http://www.worldclim.org/\" target=\"_blank\">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td>\
                                    \
                                        3&deg; Celsius / 38&deg; Fahrenheit\
                                    \
                                </td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                            <tr class=\"grey\">\
                                <td>\
                                    <b>Median Maximum Temperature</b>\
                                    <sup><a id=\"displayText\" href=\"javascript:toggleDiv('max_temp');\">Learn More</a><sup>\
                                    <div id=\"max_temp\" style=\"display: none\">\
                                        <p>The median value of the maximum temperature during the hottest month.  \
                                        <p>More information on the Temperature datasets can be found <a href=\"http://www.worldclim.org/\" target=\"_blank\">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td>\
                                    \
                                        27&deg; Celsius / 81&deg; Fahrenheit\
                                    \
                                </td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                            <tr class=\"grey\">\
                                <td colspan='2'>\
                                    <b>Mean Annual Temperature</b>\
                                    <sup><a id=\"displayText\" href=\"javascript:toggleDiv('temp_avg');\">Learn More</a><sup>\
                                    <div id=\"temp_avg\" style=\"display: none\">\
                                        <p>More information on the Temperature datasets can be found <a href=\"http://www.worldclim.org/\" target=\"_blank\">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan='2'>\
                                    \
                                        17&deg; Celsius / 63&deg; Fahrenheit\
                                    \
                                </td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                            <tr class=\"grey\">\
                                <td colspan='2'>\
                                    <b>Mean Annual Temperature Range</b>\
                                    <sup><a id=\"displayText\" href=\"javascript:toggleDiv('temp_range');\">Learn More</a><sup>\
                                    <div id=\"temp_range\" style=\"display: none\">\
                                        <p>The difference between the median mimimum temperature and the median maximum temperature.  \
                                        <p>More information on the Temperature datasets can be found <a href=\"http://www.worldclim.org/\" target=\"_blank\">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan='2'>\
                                    \
                                        24&deg; Celsius / 43&deg; Fahrenheit\
                                    \
                                </td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                        </tbody>\
                    </table>\
                    </div>\
\
                    <h3>Precipitation</h3>\
                    <div class='freetext'>\
                    <p>\
                    <table  style='width:430px' class='analysis_report_container'>\
                        <tbody>\
                            <tr class=\"grey\">\
                                <td colspan='2'>\
                                    <b>Mean Annual Precipitation</b>\
                                    <sup><a id=\"displayText\" href=\"javascript:toggleDiv('avg_precip');\">Learn More</a><sup>\
                                    <div id=\"avg_precip\" style=\"display: none\">\
                                        <p>The average yearly rainfall.  \
                                        <p>More information on the Precipitation dataset can be found <a href=\"http://www.worldclim.org/\" target=\"_blank\">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan='2'>\
                                    \
                                        183 cm / 72 in\
                                    \
                                </td>\
                            </tr>\
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                        </tbody>\
                    </table>\
                    </div>\
                    <p>\
                ",
                'language': "\
                    <div class='freetext'>\
                    <p>\
                    <table  style='width:430px' class='analysis_report_container'>\
                        <tbody>\
                            <tr class=\"grey\">\
                                <td colspan='2'>\
                                    <b>Spoken Languages</b>\
                                    <sup><a id=\"displayText\" href=\"javascript:toggleDiv('lang');\">Learn More</a><sup>\
                                    <div id=\"lang\" style=\"display: none\">\
                                        <p>The languages reported below are ordered by estimated population within the bioregion, with languages estimated \
                                           to have more speakers at the top of the list and languages estimated to have fewer speakers at the bottom.\
                                        <p>Language data was obtained from the World Language Mapping System (WLMS), which has locations of the world's 6,900 languages.\
                                        <p>More information on the WLMS can be found <a href=\"http://www.worldgeodatasets.com/language/\" target=\"_blank\">here</a>.\
                                        <p>PLEASE NOTE:  Due to the spatial complexity of language and certain limitations of the data, not all languages from \
                                           a given area (nor all areas) may be properly represented.  \
                                    </div>\
                                </td>\
                            </tr>\
                            \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Bengali</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Sadri, Oraon</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Assamese</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Santali</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Rangpuri</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Burmese</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Chittagonian</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Hindi</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Kurux</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Rakhine</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Garo</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Nepali</td>\
                                    </tr>\
                                    \
                                \
                                     \
                                    <tr>\
                                        <td colspan='2'>Bihari</td>\
                                    </tr>\
                                    \
                                    \
                            \
                            <tr><td></td><td></td></tr>\
                            <tr><td></td><td></td></tr>\
                        </tbody>\
                    </table>\
                    </div>\
                ",
                'resources':"\
                <h3>Net Primary Production</h3>\
\
                <div class='freetext'>\
                <p>\
                <table  style='width:430px' class='analysis_report_container'>\
                    <tbody>\
                        <tr class=\"grey\">\
                            <td colspan='2'>\
                                <b>Average Terrestrial Net Primary Production</b> \
                                <sup><a id=\"displayText\" href=\"javascript:toggleDiv('npp_terr');\">Learn More</a><sup>\
                                <div id=\"npp_terr\" style=\"display: none\">\
                                    <p>Terrestrial Net Primary Production (NPP) is defined as the measure of organic compound production from atmospheric \
                                       carbon dioxide.\
                                       It is the rate at which all plants in an ecosystem produce net useful chemical energy.  \
                                    <p>NPP is measured in mass / area / time.  The following report uses a measure of grams of carbon per meter squared per year. \
                                    <p><b>The average global terrestrial NPP is 426 g C/m<sup>2</sup>/year.</b>\
                                    <p>More information on the Terrestrial NPP dataset can be found <a href=\"http://sedac.ciesin.columbia.edu/es/hanpp.html\" target=\"_blank\">here</a>.\
                                    <p>NOTE:  Many significant land masses are not represented within this dataset, such absences are reported as\
                                       'No Data Available'.  \
                                </div>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td colspan='2'>\
                                \
                                    615 g C/m<sup>2</sup>/yr\
                                \
                            </td>\
                        </tr>\
                        <tr><td></td><td></td></tr>\
                        <tr><td></td><td></td></tr>\
                        <tr class=\"grey\">\
                            <td colspan='2'>\
                                <b>Average Oceanic Net Primary Production</b> \
                                <sup><a id=\"displayText\" href=\"javascript:toggleDiv('npp_ocn');\">Learn More</a><sup>\
                                <div id=\"npp_ocn\" style=\"display: none\">\
                                    <p>Oceanic Net Primary Production (NPP) is defined as the measure of organic compound production from aquatic\
                                       carbon dioxide.\
                                       It is the rate at which all plants in an ecosystem produce net useful chemical energy.  \
                                    <p>NPP is measured in mass / area / time.  The following report uses a measure of grams of carbon per meter squared per year. \
                                    <p><b>The average global oceanic NPP is 140 g C/m<sup>2</sup>/year with coastal areas tending higher than deep sea areas.</b>\
                                    <p>More information on the Oceanic NPP dataset can be found <a href=\"http://www.science.oregonstate.edu/ocean.productivity/index.php\" target=\"_blank\">here</a>.\
                                </div>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td colspan='2'>\
                                \
                                    1267 g C/m<sup>2</sup>/yr\
                                \
                            </td>\
                        </tr>\
                        <tr><td></td><td></td></tr>\
                        <tr><td></td><td></td></tr>\
                    </tbody>\
                </table>\
                </div>\
\
                <h3>Land-Based Agicultural Characteristics</h3>\
                <div class='freetext'>\
                <p>\
                <table  style='width:430px' class='analysis_report_container'>\
                    <tbody>\
                        <tr class=\"grey\">\
                            <td colspan='2'>\
                                <b>Proportion Suitable for Agriculture</b>\
                                <sup><a id=\"displayText\" href=\"javascript:toggleDiv('agriculture');\">Learn More</a><sup>\
                                <div id=\"agriculture\" style=\"display: none\">\
                                    <p>This value represents the proportion of the terrestrial area in the bioregion that is considered suitable for \
                                       agriculture based on temperature and soil quality measurements.  \
                                    <p>The data was created by Ramnkutty, N., J.A. Foley, J. Norman, and K. McSweeney in 2001.  \
                                    <p>More information on the Agricultural Suitability dataset can be found <a href=\"http://www.sage.wisc.edu/atlas/maps.php?datasetid=19&includerelatedlinks=1&dataset=19\" target=\"_blank\">here</a>.\
                                    <p>NOTE:  Many significant land masses were not included within this dataset, such absences are reported as\
                                       'No Data Available'.  \
                                </div>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td colspan='2'>\
                                \
                                    38% \
                                    <p>(350,122 km<sup>2</sup> / 135,183 mi<sup>2</sup>)\
                                \
                            </td>\
                        </tr>\
                        <tr><td></td><td></td></tr>\
                        <tr><td></td><td></td></tr>\
                        <tr class=\"grey\">\
                            <td colspan='2'>\
                                <b>Proportion Equipped for Irrigation</b>\
                                <sup><a id=\"displayText\" href=\"javascript:toggleDiv('irrigation');\">Learn More</a><sup>\
                                <div id=\"irrigation\" style=\"display: none\">\
                                    <p>This value represents the proportion of the terrestrial area in the bioregion that is equipped for irrigation.\
                                    <p>Source: Stefan Siebert, Petra Doll, Sebastian Feick, Jippe Hoogeveen, and Karen Frenken (2007) \
                                       Global Map of Irrigation Areas version 4.0.1 Johann Wolfgang, Goethe University, Frankfurt am Main, Germain / Food\
                                       and Agriculture Organization of the United Nations, Rome, Italy.  \
                                    <p>More information on the Irrigation dataset can be found <a href=\"http://www.fao.org/nr/water/aquastat/irrigationmap/index.stm\" target=\"_blank\">here</a>.\
                                </div>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td colspan='2'>\
                                \
                                    6.5%\
                                    <p>(59,437 km<sup>2</sup> / 22,949 mi<sup>2</sup>)\
                                \
                            </td>\
                        </tr>\
                        <tr><td></td><td></td></tr>\
                        <tr><td></td><td></td></tr>\
                    </tbody>\
                </table>\
                </div>\
\
                <h3>Ecological Regions</h3>\
                <div class='freetext'>\
                <p>\
                <table  style='width:430px' class='analysis_report_container'>\
                    <tbody>\
                        <tr class=\"grey\">\
                            <td colspan='2'>\
                                <b>WWF Ecoregions</b>\
                                <sup><a id=\"displayText\" href=\"javascript:toggleDiv('ecoregions');\">Learn More</a><sup>\
                                <div id=\"ecoregions\" style=\"display: none\">\
                                    <p>World Wildlife Federation Terrestrial Ecoregions of the World.  \
                                    <p>More information on the WWF Ecoregions dataset can be found <a href=\"http://www.worldwildlife.org/science/ecoregions/item1267.html\" target=\"_blank\">here</a>.\
                                </div>\
                            </td>\
                        </tr>\
                        \
                        \
                        <tr>\
                            <td colspan='2'>Brahmaputra Valley semi-evergreen forests (56,840 km<sup>2</sup> / 21,946 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        <tr>\
                            <td colspan='2'>Chhota-Nagpur dry deciduous forests (399 km<sup>2</sup> / 154 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        <tr>\
                            <td colspan='2'>Chin Hills-Arakan Yoma montane forests (26,580 km<sup>2</sup> / 10,262 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        <tr>\
                            <td colspan='2'>Eastern Himalayan alpine shrub and meadows (65,184 km<sup>2</sup> / 25,168 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        <tr>\
                            <td colspan='2'>Eastern Himalayan broadleaf forests (73,746 km<sup>2</sup> / 28,473 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        \
                        \
                        <tr><td></td><td></td></tr>\
                        <tr><td></td><td></td></tr>\
                        <tr class=\"grey\">\
                            <td colspan='2'>\
                                <b>Wild Regions</b>\
                                <sup><a id=\"displayText\" href=\"javascript:toggleDiv('last_wild');\">Learn More</a><sup>\
                                <div id=\"last_wild\" style=\"display: none\">\
                                    <p>This report represents the amount of the world's 10% least influenced areas. \
                                    <p>More information on the Wild Regions dataset can be found <a href=\"http://sedac.ciesin.columbia.edu/wildareas/methods.jsp\" target=\"_blank\">here</a>.\
                                </div>\
                            </td>\
                        </tr>\
                        \
                        \
                        <tr>\
                            <td colspan='2'>Brahmaputra Valley semi-evergreen forests (15 km<sup>2</sup> / 6 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        <tr>\
                            <td colspan='2'>Eastern Himalayan alpine shrub and meadows (39,926 km<sup>2</sup> / 15,415 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        <tr>\
                            <td colspan='2'>Eastern Himalayan broadleaf forests (13,059 km<sup>2</sup> / 5,042 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        <tr>\
                            <td colspan='2'>Eastern Himalayan subalpine conifer forests (7,554 km<sup>2</sup> / 2,917 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        <tr>\
                            <td colspan='2'>Hengduan Mountains subalpine conifer forests (4,462 km<sup>2</sup> / 1,723 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        <tr>\
                            <td colspan='2'>Irrawaddy moist deciduous forests (1,123 km<sup>2</sup> / 434 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        \
                        \
                        <tr><td></td><td></td></tr>\
                        <tr><td></td><td></td></tr>\
                        <tr class=\"grey\">\
                            <td colspan='2'>\
                                <b>Watersheds</b>\
                                <sup><a id=\"displayText\" href=\"javascript:toggleDiv('watersheds');\">Learn More</a><sup>\
                                <div id=\"watersheds\" style=\"display: none\">\
                                    <p>Watershed data (HydroSHEDS) has been developed by the Conservation Science Program of World Wildlife Fund (WWF), \
                                       in partnership with the U.S. Geological Survey (USGS), the International Centre for Tropical Agriculture (CIAT), \
                                       The Nature Conservancy (TNC), and the Center for Environmental Systems Research (CESR) of the University of Kassel, \
                                       Germany. Major funding for this project was provided to WWF by JohnsonDiversey, Inc.\
                                    <p>More information on the Watersheds dataset can be found <a href=\"http://hydrosheds.cr.usgs.gov/overview.php\" target=\"_blank\">here</a>.\
                                    <p>NOTE:  Many significant land masses were not included within this dataset, we report on such absences with\
                                       'No Data Available'.  \
                                </div>\
                            </td>\
                        </tr>\
                        \
                            \
                            <tr>\
                                <td colspan='2'>Bay of Bengal, North East Coast (67,456 km<sup>2</sup> / 26,045 mi<sup>2</sup>)</td>\
                            </tr>\
                            \
                            <tr>\
                                <td colspan='2'>Ganges - Bramaputra (517,307 km<sup>2</sup> / 199,733 mi<sup>2</sup>)</td>\
                            </tr>\
                            \
                            <tr>\
                                <td colspan='2'>Irrawaddy (255,189 km<sup>2</sup> / 98,529 mi<sup>2</sup>)</td>\
                            </tr>\
                            \
                            <tr>\
                                <td colspan='2'>Mekong (20,614 km<sup>2</sup> / 7,959 mi<sup>2</sup>)</td>\
                            </tr>\
                            \
                            <tr>\
                                <td colspan='2'>Salween (36,307 km<sup>2</sup> / 14,018 mi<sup>2</sup>)</td>\
                            </tr>\
                            \
                            <tr>\
                                <td colspan='2'>Yangtze (21,202 km<sup>2</sup> / 8,186 mi<sup>2</sup>)</td>\
                            </tr>\
                            \
                        \
                        <tr><td></td><td></td></tr>\
                        <tr><td></td><td></td></tr>\
                        <tr class=\"grey\">\
                            <td colspan='2'>\
                                <b>WWF Marine Ecoregions</b>\
                                <sup><a id=\"displayText\" href=\"javascript:toggleDiv('marine_regions');\">Learn More</a><sup>\
                                <div id=\"marine_regions\" style=\"display: none\">\
                                    <p>World Wildlife Federation Marine Ecoregions of the World.  \
                                    <p>More information on the WWF Marine Ecoregions dataset can be found <a href=\"http://www.worldwildlife.org/science/ecoregions/marine/item1266.html\" target=\"_blank\">here</a>.\
                                </div>\
                            </td>\
                        </tr>\
                        \
                        \
                        <tr>\
                            <td colspan='2'>Northern Bay of Bengal (4,284 km<sup>2</sup> / 1,654 mi<sup>2</sup>)</td>\
                        </tr>\
                        \
                        \
                        <tr><td></td><td></td></tr>\
                        <tr><td></td><td></td></tr>\
                    </tbody>\
                </table>\
                </div>\
                <p>\
                <script type=\"text/javascript\" src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js\"></script>\
                <script type=\"text/javascript\">\
                function toggleDiv(divId) {\
                   $(\"#\"+divId).toggle();\
                }\
                </script>\
\
                <style type=\"text/css\">\
                h3 { font-weight: bold; }\
                </style>\
\
                    </div>\
                "
            },
            'vulnerabilities': {
                'definition': "<p>Definition placeholder</p>",
                'climate': "<p>Climate Change placeholder</p>",
                'socecon': "<p>Socio-Economic placeholder</p>",
                'hazards': "<p>Natural Hazards placeholder</p>"
            }
        };
    
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
    
    /*---------------------------------------------------------------------
            OTHER LOCI AppViewModel
    ---------------------------------------------------------------------*/
    
}


/*---------------------------------------------------------------------
        DASHBOARD
---------------------------------------------------------------------*/

function JSON2FeedHTML(json){
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