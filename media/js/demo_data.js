
var userID = '2';

var userLocus = new OpenLayers.Geometry.LinearRing([
            // Cascadia
            // new OpenLayers.Geometry.Point(-13789481.843754, 4852833.2010937),
            // new OpenLayers.Geometry.Point(-13466611.836322, 5038728.0538574),
            // new OpenLayers.Geometry.Point(-13564451.232513, 5273542.6047168),
            // new OpenLayers.Geometry.Point(-13368772.440131, 6281288.3854882),
            // new OpenLayers.Geometry.Point(-13642722.749466, 6741133.5475878),
            // new OpenLayers.Geometry.Point(-13975376.696517, 6966164.1588281),
            // new OpenLayers.Geometry.Point(-14288462.76433, 6780269.3060644),
            // new OpenLayers.Geometry.Point(-14063432.15309, 6545454.755205),
            // new OpenLayers.Geometry.Point(-14268894.885091, 6604158.3929199),
            // new OpenLayers.Geometry.Point(-14308030.643568, 6555238.6948242),
            // new OpenLayers.Geometry.Point(-13828617.60223, 6173665.0496777),
            // new OpenLayers.Geometry.Point(-13730778.206039, 6203016.8685351),
            // new OpenLayers.Geometry.Point(-13828617.60223, 6330208.0835839),
            // new OpenLayers.Geometry.Point(-13887321.239945, 6359559.9024414),
            // new OpenLayers.Geometry.Point(-13936240.938041, 6486751.1174902),
            // new OpenLayers.Geometry.Point(-13681858.507943, 6300856.2647265),
            // new OpenLayers.Geometry.Point(-13642722.749466, 6134529.2912011),
            // new OpenLayers.Geometry.Point(-13701426.387181, 6105177.4723437),
            // new OpenLayers.Geometry.Point(-13789481.843754, 6105177.4723437),
            // new OpenLayers.Geometry.Point(-13857969.421088, 6154097.1704394),
            // new OpenLayers.Geometry.Point(-13877537.300326, 6046473.8346289),
            // new OpenLayers.Geometry.Point(-13799265.783373, 5899714.7403418),
            // new OpenLayers.Geometry.Point(-13799265.783373, 5518141.0951953),
            // new OpenLayers.Geometry.Point(-13887321.239945, 5332246.2424316),
            // new OpenLayers.Geometry.Point(-13818833.662611, 5058295.9330957),
            // new OpenLayers.Geometry.Point(-13848185.481468, 4901752.8991894)
            
            // Bangladesh to Sichuan
            new OpenLayers.Geometry.Point(10441913.472857, 2172033.2354491),
            new OpenLayers.Geometry.Point(10177747.10314, 2582958.699453),
            new OpenLayers.Geometry.Point(10030988.008853, 2553606.8805956),
            new OpenLayers.Geometry.Point(9962500.4315188, 2768853.5522166),
            new OpenLayers.Geometry.Point(9747253.7598977, 2876476.8880272),
            new OpenLayers.Geometry.Point(9786389.5183743, 3355889.9293651),
            new OpenLayers.Geometry.Point(10872406.816099, 3923358.4272752),
            new OpenLayers.Geometry.Point(11498578.951724, 3463513.2651756),
            new OpenLayers.Geometry.Point(10441913.472857, 2172033.2354491)
]);

/* var users = {
    '1':{
        'id': '1',
        'name': 'You',
        'location': '1',
        'friends':['2','3','4','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/FACE.png",
        'isLocusUser': true
    },
    '2':{
        'name': 'Chris',
        'id': '2',
        'location': '1',
        'friends':['1','3','4','5','6','o1','o2','o3'],
        'img':"/media/DEMO/img/faces/Chris.jpg",
        'isLocusUser': true
    },
    '3':{
        'name': 'Bettina',
        'id': '3',
        'location': '2',
        'friends':['1','2','7','o4','o5','o6'],
        'img':"/media/DEMO/img/faces/Bettina.jpg",
        'isLocusUser': true
    },
    '4':{
        'name': 'Edwin',
        'id': '4',
        'location': '1',
        'friends':['1','2','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/faces/Edwin.jpg",
        'isLocusUser': true
    },
    '5':{
        'name': 'Jocelyn',
        'id': '5',
        'location': '2',
        'friends':['2','6','7','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/faces/Jocelyn.jpg",
        'isLocusUser': true
    },
    '6':{
        'name': 'Ryan',
        'id': '6',
        'location': '3',
        'friends':['2','5','7','8','10','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/faces/Ryan.jpg",
        'isLocusUser': true
    },
    '7':{
        'name': 'Jon',
        'id': '7',
        'location': '3',
        'friends':['3','5','6','9','10','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/faces/Chris.jpg",
        'isLocusUser': true
    },
    '8':{
        'name': 'Matt',
        'id': '8',
        'location': '4',
        'friends':['6','9','10','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/faces/Matt.jpg",
        'isLocusUser': true
    },
    '9':{
        'name': 'Mike',
        'id': '9',
        'location': '5',
        'friends':['7','8','10','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/faces/Mike.jpg",
        'isLocusUser': true
    },
    '10':{
        'name': 'Robert',
        'id': '10',
        'location': '5',
        'friends':['6','7','8','9','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/faces/Robert.jpg",
        'isLocusUser': true
    },
    'o1':{
        'name': 'Abby',
        'id': 'o1',
        'location': null,
        'friends': [],
        'img': null,
        'isLocusUser': false
    },
    'o2':{
        'name': 'Ben',
        'id': 'o1',
        'location': null,
        'friends': [],
        'img': null,
        'isLocusUser': false
    },
    'o3':{
        'name': 'Cathy',
        'id': 'o1',
        'location': null,
        'friends': [],
        'img': null,
        'isLocusUser': false
    },
    'o4':{
        'name': 'David',
        'id': 'o1',
        'location': null,
        'friends': [],
        'img': null,
        'isLocusUser': false
    },
    'o5':{
        'name': 'Elise',
        'id': 'o1',
        'location': null,
        'friends': [],
        'img': null,
        'isLocusUser': false
    },
    'o6':{
        'name': 'Fernando',
        'id': 'o1',
        'location': null,
        'friends': [],
        'img': null,
        'isLocusUser': false
    }
};
*/
var storyPoints = {
    "1": {
        'id': '1',
        'geometry': {
            'type': 'Point',
            // 'coordinates': [-142844.93957374,1095801.0673437]
            'coordinates': [11000000,3000000]
        },
        'type': 'post',
        'source': '2',
        'title': null,
        'text': 'At the China/Myanmar border right now!',
        'img': null,
        'date': '03/22/2013',
        'isPerm': false
    },
    "2": {
        'id': '2',
        'geometry': {
            'type': 'Point',
            // 'coordinates': [-9221668.3421389,3481589.9423626]
            'coordinates': [10500000,2800000]
        },
        'type': 'post',
        'source': '6',
        'title': null,
        // 'text': 'I think cement is a lot more interesting than most people think.',
        'text': 'I\'m at the India/Myanmar border right now!',
        'img': null,
        'date': '03/21/2013',
        'isPerm': false
    },
    "3": {
        'id': '3',
        'geometry': {
            'type': 'Point',
            // 'coordinates': [12955407.625552,4853259.8378846]
            'coordinates': [9955407.625552,2853259.8378846]
        },
        'type': 'news',
        'source': 'http://switchboard.nrdc.org/blogs/bfinamore/will_chinas_new_leaders_clean.html',
        'title': 'Will China\'s New Leaders Clean Up the Environment?',
        'text': 'I was trying to clean the coal dust from the windows of my dingy Beijing apartment one day in March 1992 when the phone rang with astonishing news. Nearly one-third of the delegates to the National People’s Congress had just abstained or voted against the construction of the massive Three Gorges Dam, the world’s largest hydropower project. I simply could not believe my ears. China’s rubber-stamp legislature had never displayed such a level of opposition in its entire history, let alone on environmental grounds.  The vote was even more remarkable in light of the government’s strenuous attempts to stifle public debate about the project’s environmental, safety and social impacts.',
        'img': 'http://switchboard.nrdc.org/blogs/bfinamore/Three%20Gorges%20Dam.jpg',
        'date': '03/25/2013',
        'isPerm': false
    },
    "4": {
        'id': '4',
        'geometry': {
            'type': 'Point',
            // 'coordinates': [13205510.262066,4195901.0547237]
            'coordinates': [10705510.262066,3595901.0547237]
        },
        'type': 'news',
        'source': 'http://wwf.panda.org/who_we_are/wwf_offices/china/environmental_problems_china/',
        'title': 'Local problems leading to global disasters?',
        'text': 'For centuries, China has been the most populous nation on Earth. Today, its population\'s impact on the environment is evident even in the most remote areas. But with an unprecedented economic boom, these effects are taking very serious proportions. While individual use of resources remains low, the cumulative impact of steady growth in the consumption of over a billion people is tremendous.',
        'img': 'http://awsassets.panda.org/img/yang_coal_factory_china_352334.jpg',
        'date': '03/25/2013',
        'isPerm': false
    },
    "5": {
        'id': '5',
        'geometry': {
            'type': 'Point',
            // 'coordinates': [13401189.054449,4526109.0168696]
            'coordinates': [10401189.054449,2526109.0168696]
        },
        'type': 'news',
        'source': 'http://www.guardian.co.uk/environment/blog/2011/apr/12/china-green-plans-america',
        'title': 'China\'s green progress leaves US red-faced',
        'text': 'China pushes ahead with an emissions trading scheme, while American initiatives remain sunk in Congressional quicksand. When it comes to responding to climate change, the contrast between China and the United States is stark. It has been clear for some time that the Asian powerhouse is moving more rapidly on renewable technologies. A recent report by Pew Charitable Trusts shows China led the world last year with a $54.4bn investment in clean technology, about 40% higher than third-placed America.',
        'img': 'http://static.guim.co.uk/sys-images/Environment/Pix/columnists/2011/2/28/1298909592540/China-GDP-slowdown-008.jpg',
        'date': '04/12/2011',
        'isPerm': false
    },
};

var locations = {
    '1':{
        'country':"USA",
        'district':"Oregon",
        'city':"Portland",
        'lat':45.523668,
        'lon':-122.673454
    },
    '2':{
        'country':"Canada",
        'district':"Saskatchewan",
        'city':"Saskatoon",
        'lat':52.134331,
        'lon':-106.652584
    },
    '3':{
        'country':"Australia",
        'district':"New South Wales",
        'city':"Wollongong",
        'lat':-34.425107,
        'lon':150.89334
    },
    '4':{
        'country':"Mali",
        'district':"Tombouctou",
        'city':"Timbuktu",
        'lat':16.774877,
        'lon':-3.008294
    },
    '5':{
        'country':"Bolivia",
        'district':"Pedro Domingo Murillo",
        'city':"La Paz",
        'lat':-16.49897,
        'lon':-68.145161
    },
};

var reportDetailsJSON = {
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
                                221.9 million\
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
                                    29.4 million\
                                (13%)\
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
                                261.4 million\
                                (increase of 18%)\
                        </td>\
                    </tr>\
                    <tr><td></td><td></td></tr>\
                    <tr><td></td><td></td></tr>\
                </tbody>\
            </table>\
            </div>\
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
                                3&deg; Celsius / 38&deg; Fahrenheit\
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
        'resources':"<h3>Net Primary Production</h3>\
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
                                615 g C/m<sup>2</sup>/yr\
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
                                1267 g C/m<sup>2</sup>/yr\
                        </td>\
                    </tr>\
                    <tr><td></td><td></td></tr>\
                    <tr><td></td><td></td></tr>\
                </tbody>\
            </table>\
            </div>\
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
            <style type=\"text/css\">\
                h3 { font-weight: bold; }\
            </style>\
        </div>"
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
            </div>',
        'climate': '\
            <div class="panel">\
                <h3>Climate Change Vulnerabilities</h3>\
                <div class="freetext">\
                    <p> </p>\
                    <table class="analysis_report_container" style="width:430px">\
                        <tbody>\
                            <tr class="grey">\
                                <td colspan="2">\
                                    <b>Human Vulnerabilities to Climate Change</b>\
                                    <sup>\
                                        <a id="displayText" href="javascript:toggleDiv(\'human\');">Learn More</a>\
                                        <sup>\
                                            <div id="human" style="display: none">\
                                                <p>This report is an indicator of the Global Climate-Demography Vulnerability Index (CDVI) which is estimated by subtacting climate vulnerabilities from demographic annual growth rates. In this case, high vulnerability is predicted for regions where a decline in climate conditions currently supporting high population density is combined with rapid population growth.</p>\
                                                <p>CDVI < -12 is considered Low, </p>\
                                                <p>-12 <= CDVI < -4 is Moderately low, </p>\
                                                <p>-4 <= CDVI < 4 is Moderate, </p>\
                                                <p>4 <= CDVI < 12 is Moderately high, </p>\
                                                <p>and CDVI >= 12 is considered high </p>\
                                                <p>\
                                                    More information on this dataset can be found\
                                                    <a target="_blank" href="http://chairedb.uqar.qc.ca/documents/2011Samsonetal.GEB.pdf">here</a>\
                                                    .\
                                                </p>\
                                            </div>\
                                        </sup>\
                                    </sup>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2"> Moderate (CDVI = 1.0) </td>\
                            </tr>\
                            <tr class="grey">\
                                <td colspan="2">\
                                    <b>Impact on Temperature</b>\
                                    <sup>\
                                        <a id="displayText" href="javascript:toggleDiv(\'temp_change\');">Learn More</a>\
                                        <sup>\
                                            <div id="temp_change" style="display: none">\
                                                <p>This report represents anticipated temperature changes by end of century and was created by Ecotrust solely for use in the Bioregion Discovery Tool reports section. </p>\
                                                <p>\
                                                    The results reflect a mean change in temperature between 2010 and 2050, using the International Panel on Climate Change\'s\
                                                    <a target="_blank" href="http://www.ipcc.ch/ipccreports/sres/emission/index.php?idp=98">scenario A2</a>\
                                                    . This research uses data provided by the \
                                                    <a target="_blank" href="http://www.ccsm.ucar.edu">Community Climate System Model project</a>\
                                                    , supported by the Directorate for Geoscience of the National Science Foundation and the Office of Biological and Environmental Research of the U.S. Department of Energy. NCAR GIS Initiative provided CCSM data in the GIS format through \
                                                    <a target="_blank" href="http://www.gisclimatechange.org">GIS Climate Change Scenarios portal</a>\
                                                    .\
                                                </p>\
                                                <p>\
                                                    The data this research was based on can be found\
                                                    <a target="_blank" href="http://www.gisclimatechange.org/startPage.do">here</a>\
                                                    .\
                                                </p>\
                                                <p>NOTE: Due to the nature of predictive modeling and the inherent complexities of unseen climatic variables, the results of this analysis are only meant to serve as a rough calculation of potential changes in temperature over time. </p>\
                                            </div>\
                                        </sup>\
                                    </sup>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2"> Increase of 0.9° Celsius / 1.6° Fahrenheit by 2050 </td>\
                            </tr>\
                            <tr class="grey">\
                                <td colspan="2">\
                                    <b>Impact on Agricultural Production</b>\
                                    <sup>\
                                        <a id="displayText" href="javascript:toggleDiv(\'ag_prod\');">Learn More</a>\
                                        <sup>\
                                            <div id="ag_prod" style="display: none">\
                                                <p>This report represents the expected impacts that climate change will have on terrestrial agriculture. </p>\
                                                <p>The data was created by the International Institute for Applied Systems Analysis (IIASA) and the Food and Agriculture Organization (FAO) of the United Nations for the Global Agro-ecological Assessment for Agriculture in the 21st Century. Data is from Plate 69 of this report.</p>\
                                                <p>\
                                                    More information on this dataset can be found\
                                                    <a target="_blank" href="http://www.iiasa.ac.at/Research/LUC/SAEZ/index.html">here</a>\
                                                    .\
                                                </p>\
                                            </div>\
                                        </sup>\
                                    </sup>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2"> 36% of this region can expect a Slight Decrease in Production  </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2"> 31% of this region can expect a Slight Increase in Production </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2"> 28% of this region is not covered by this dataset  </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2"> 2% of this region can expect a General Decrease in Production </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2"> 2% of this region can expect a Major Increase in Production  </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2"> 0% of this region can expect an General Increase in Production </td>\
                            </tr>\
                            <tr>\
                                <td colspan="2"> 0% of this region can expect a Major Decrease in Production </td>\
                            </tr>\
                            <tr class="grey">\
                                <td colspan="2">\
                                    <b>Impact on Precipitation</b>\
                                    <sup><a id="displayText" href="javascript:toggleDiv(\'water\');">Learn More</a><sup>\
                                    <div id="water" style="display: none">\
                                        <p>This report represents anticipated precipitation changes by end of century and was created by Ecotrust solely for use\
                                           in the Bioregion Discovery Tool reports section.  \
                                        <p>The results reflect a mean change in precipitation data between 2010 and 2099, using the International Panel on \
                                           Climate Change\'s <a href="http://www.ipcc.ch/ipccreports/sres/emission/index.php?idp=98" target="_blank">scenario A2</a>.\
                                           This research uses data provided by the <a href="http://www.ccsm.ucar.edu" target="_blank">Community Climate System Model project</a>, \
                                           supported by the Directorate for Geoscience of the National Science Foundation and the Offic of Biological and Environmental Research\
                                           of the U.S. Department of Energy.  NCAR GIS Initiative provided CCSM data in the GIS format through \
                                           <a href="http://www.gisclimatechange.org" target="_blank">GIS Climate Change Scenarios portal</a>.\
                                        <p>The data this research was based on can be found <a href="http://www.gisclimatechange.org/startPage.do" target="_blank">here</a>.\
                                        <p>NOTE:  Due to the nature of predictive modeling and the inherent complexities of unseen climatic variables, the results\
                                           of this analysis are only meant to serve as a rough calculation of potential changes in precipitation over time. \
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan=2>\
                                    98% of this region can expect Less Precipitation\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan=2>\
                                    2% of this region can expect More Precipitation\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <h3>Rising Sea Levels</h3>\
                <h3 align="center" class="analysis_report_container">1 Meter</h3>\
                <div class=\'freetext\'>\
                    <p>\
                    <table  style=\'width:430px\' class=\'analysis_report_container\'>\
                        <tbody>  \
                            <tr class="grey">\
                                <td colspan=2>\
                                    <b>Estimated Loss of Land</b><sup><a id="displayText" href="javascript:toggleDiv(\'land_loss_1m\');">Learn More</a><sup>\
                                    <div id="land_loss_1m" style="display: none" align="center">\
                                        <p>The following report estimates the loss of land that would result from a 1 meter rise in sea levels.\
                                        <p>More information on the sea rise datasets can be found <a href="https://www.cresis.ku.edu/data/sea-level-rise-maps" target="_blank">here</a>.\
                                    </div>\
                                </td>\
                            </tr>      \
                            <tr>\
                                <td colspan=2>\
                                    \
                                        2,074 km<sup>2</sup> / 800 mi<sup>2</sup>\
                                    \
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <h3 align="center" class="analysis_report_container">3 Meter</h3>\
                <div class=\'freetext\'>\
                    <p>\
                    <table  style=\'width:430px\' class=\'analysis_report_container\'>\
                        <tbody>  \
                            <tr class="grey">\
                                <td colspan=2>\
                                    <b>Estimated Loss of Land</b><sup><a id="displayText" href="javascript:toggleDiv(\'land_loss_3m\');">Learn More</a><sup>\
                                    <div id="land_loss_3m" style="display: none" align="center">\
                                        <p>The following report estimates the loss of land that would result from a 3 meter rise in sea levels.\
                                        <p>More information on the sea rise datasets can be found <a href="https://www.cresis.ku.edu/data/sea-level-rise-maps" target="_blank">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan=2>\
                                    15,458 km<sup>2</sup> / 5,968 mi<sup>2</sup>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <h3 align="center" class="analysis_report_container">6 Meter</h3>\
                <div class=\'freetext\'>\
                    <p>\
                    <table  style=\'width:430px\' class=\'analysis_report_container\'>\
                        <tbody>  \
                            <tr class="grey">\
                                <td colspan=2>\
                                    <b>Estimated Loss of Land</b><sup><a id="displayText" href="javascript:toggleDiv(\'land_loss_6m\');">Learn More</a><sup>\
                                    <div id="land_loss_6m" style="display: none" align="center">\
                                        <p>The following report estimates the loss of land that would result from a 6 meter rise in sea levels.\
                                        <p>More information on the sea rise datasets can be found <a href="https://www.cresis.ku.edu/data/sea-level-rise-maps" target="_blank">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan=2>\
                                    \
                                        38,632 km<sup>2</sup> / 14,915 mi<sup>2</sup></td>\
                                    \
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>\
                <script type="text/javascript">\
                function toggleDiv(divId) {\
                   $("#"+divId).toggle();\
                }\
                </script>\
                <style type="text/css">\
                h3 { font-weight: bold; }\
                </style>\
            </div>',
        'socecon': '\
            <div class="panel">\
                <h3>Human Impacts</h3>\
                <div class=\'freetext\'>\
                    <p>\
                    <table  style=\'width:430px\' class=\'analysis_report_container\'>\
                        <tbody>\
                            <tr class="grey">\
                                <td>\
                                    <b>Area of Land Developed</b>\
                                    <sup><a id="displayText" href="javascript:toggleDiv(\'land\');">Learn More</a><sup>\
                                    <div id="land" style="display: none">\
                                        <p>The Developed Land dataset represents a combination of modeled built-up areas (based on nighttime lights) and \
                                           observed built-up areas (based on IGBP (International Geosphere-Biosphere Programme) land cover data).\
                                        <p>More information on the Developed Land dataset can be found <a href="http://www.sage.wisc.edu/atlas/maps.php?datasetid=18&includerelatedlinks=1&dataset=18" target="_blank">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td>\
                                        22.19%\
                                </td>\
                            </tr>\
                            <tr class="grey">\
                                <td>\
                                    <b>Human Consumption</b>\
                                    <sup><a id="displayText" href="javascript:toggleDiv(\'consumption\');">Learn More</a><sup>\
                                    <div id="consumption" style="display: none">\
                                        <p>This report represents the Human Appropriation of the local Terrestrial Net Primary Productivity.\
                                           This is the amount of carbon required to derive food and fiber products consumed by humans, \
                                           and can be seen as a ratio of consumption to the local food system.  \
                                        <p>More information on the HANPP dataset can be found <a href="http://sedac.ciesin.columbia.edu/es/hanpp.html" target="_blank">here</a>.\
                                        <p>NOTE: This report does not directly capture other forms of environmental impact, such as freshwater abstraction,\
                                           use of fossil fuels, pollutant emissions, and appropriation of NPP from freshwater and marine systems.  Nor does \
                                           it include components of NPP that are lost due to land transformations (e.g. shifting cultivation and land clearing\
                                           for development). \
                                        <p>ALSO:  Many significant land masses are not represented within this dataset, such absences are reported as\
                                           \'No Data Available\'.  \
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td>\
                                        44% of Net Primary Production \
                                </td>\
                            </tr>\
                            <tr class="grey">\
                                <td>\
                                    <b>Human Impact of Marine Ecosystems</b>\
                                    <sup><a id="displayText" href="javascript:toggleDiv(\'marine\');">Learn More</a><sup>\
                                    <div id="marine" style="display: none">\
                                        <p>From the <a href="http://www.nceas.ucsb.edu/globalmarine" target="_blank">Human Impacts to Marine Ecosystems website</a>,\
                                           this report is a measure of the ecological impacts of 17 different activities that include categories of fishing, \
                                           climate change, and pollution.   \
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td>\
                                        Low Impact\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <h3>Human Needs</h3>\
                <div class=\'freetext\'>\
                    <p>\
                    <table  style=\'width:430px\' class=\'analysis_report_container\'>\
                        <tbody>\
                            <tr class="grey">\
                                <td>\
                                    <b>Proportion Suitable for Agriculture</b>\
                                    <sup><a id="displayText" href="javascript:toggleDiv(\'suit\');">Learn More</a><sup>\
                                    <div id="suit" style="display: none">\
                                        <p>This value represents the proportion of the terrestrial area in the bioregion that is considered suitable for \
                                           agriculture based on temperature and soil quality measurements.  \
                                        <p>The data was created by Ramnkutty, N., J.A. Foley, J. Norman, and K. McSweeney in 2001.  \
                                        <p>More information on the Agricultural Suitability dataset can be found <a href="http://www.sage.wisc.edu/atlas/maps.php?datasetid=19&includerelatedlinks=1&dataset=19" target="_blank">here</a>.\
                                        <p>NOTE:  Many significant land masses were not included within this dataset, such absences are reported as\
                                           \'No Data Available\'.  \
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td>\
                                        38%\
                                </td>\
                            </tr>\
                            <tr class="grey">\
                                <td>\
                                    <b>Water Stress Index</b>\
                                    <sup><a id="displayText" href="javascript:toggleDiv(\'water_stress\');">Learn More</a><sup>\
                                    <div id="water_stress" style="display: none">\
                                        <p>This report is based on the ratio of human water use (sum of domestic, industrial, and agricultural demand) to \
                                           renewable water supply (available local run-off (precipitation less evaporation) as delivered through streams, \
                                           rivers, and shallow groundwaters).\
                                        <p>This dataset was reclassed into 4 categories: \
                                            <p>1 is considered Unstressed.\
                                            <p>2 is considered Low Stress.\
                                            <p>3 is considered Medium Stress.\
                                            <p>4 is considered High Stress.\
                                        <p>and the zonal average is reported below. \
                                        <p>Metadata on the Water Stress dataset can be found <a href="http://wwdrii.sr.unh.edu/sourcematerial/Water_stress_metadata.html" target="_blank">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>            \
                                <td>\
                                        Unstressed (Stress Index of 1.1)\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <h3>Social Equity</h3>\
                <div class=\'freetext\'>\
                    <p>\
                    <table  style=\'width:430px\' class=\'analysis_report_container\'>\
                        <tbody>\
                            <tr class="grey">\
                                <td>\
                                    <b>Estimated Population in Poverty</b>\
                                    <sup><a id="displayText" href="javascript:toggleDiv(\'poverty\');">Learn More</a><sup>\
                                    <div id="poverty" style="display: none">\
                                        <p>This report is derived from a global dataset that enumerates the number of children under 5 years of age \
                                           who are underweight.  This data is being used to estimate poverty due to the current absence of a gridded\
                                           global poverty data layer.  \
                                        <p>The analysis makes the assumption that the number of underweight children directly corresponds to the number\
                                           of children living in poverty for a given region.  Using this enumeration of underweight children, \
                                           an estimate is derived of the total population living in poverty within this bioregion.  \
                                        <p>To estimate the total poverty population we first estimate the proportion of the world\'s impoverished\
                                           contained within this bioregion.  This is achieved by dividing the number of underweight children reported\
                                           in this bioregion by the estimated number of underweight children under the age of 5 worldwide\
                                           (<a href="http://www.who.int/whosis/whostat/EN_WHS2011_Part1.pdf" target="_blank">estimated at 115 million</a>).  \
                                        <p>We then estimate the number of people living in poverty by multiplying the proportion of the world\'s impoverished,  \
                                           as estimated, by the global population of impoverised (as <a href="http://en.wikipedia.org/wiki/Poverty" target="_blank">estimated on Wikipedia</a>\
                                           as 1.7 billion in <a href="http://en.wikipedia.org/wiki/Poverty_threshold" target="_blank">absolute poverty</a>).  \
                                        <p>More information on the dataset used to estimate the number of underweight children under 5 years of age can be found \
                                           <a href="http://sedac.ciesin.columbia.edu/legacy?url=http://sedac.ciesin.columbia.edu/povmap/methods.jsp" target="_blank">here</a>.\
                                        <p>NOTE:  Many areas around the globe are not accounted for in this dataset.  If your bioregion includes any of  \
                                           these areas of no data, it will be reported as \'No Data Available\'.  \
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td>\
                                            193.3 million \
                                        (87.1% of population)\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <h3>Cultural Pressures</h3>\
                <div class=\'freetext\'>\
                    <p>\
                    <table  style=\'width:430px\' class=\'analysis_report_container\'>\
                        <tbody>\
                            <tr class="grey">\
                                <td>\
                                    <b>Extinct / Near Extinct Languages</b>\
                                    <sup><a id="displayText" href="javascript:toggleDiv(\'ex_lang\');">Learn More</a><sup>\
                                    <div id="ex_lang" style="display: none">\
                                        <p>Data was obtained from the World Language Mapping System (WLMS), which has locations of the world\'s 6,900 languages,\
                                           including languages that are classified as "extinct" in the 15th Ethnologue.\
                                        <p>More information on the WLMS datasets can be found <a href="http://www.worldgeodatasets.com/language/" target="_blank">here</a>.\
                                    </div>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td colspan=\'2\'>Ahom (Estimated Speakers: 0)</td>\
                            </tr>\
                            \
                            <tr>\
                                <td colspan=\'2\'>Pali (Estimated Speakers: 0)</td>\
                            </tr>\
                            \
                            <tr>\
                                <td colspan=\'2\'>Taman (Estimated Speakers: 0)</td>\
                            </tr>\
                            \
                            <tr>\
                                <td colspan=\'2\'>Turung (Estimated Speakers: 0)</td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <p>\
                <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>\
                <script type="text/javascript">\
                    function toggleDiv(divId) {\
                       $("#"+divId).toggle();\
                    }\
                </script>\
                <style type="text/css">\
                    h3 { font-weight: bold; }\
                </style>\
            </div>',
        'hazards': '\
            <div class="panel">\
                <h3>Natural Hazards</h3>\
                <div class=\'freetext\'>\
                <p>\
                <table  style=\'width:430px\' class=\'analysis_report_container\'>\
                    <tbody>\
                        <tr class="grey">\
                            <td><b>Natural Disaster Vulnerabilities</b>\
                                <sup><a id="displayText" href="javascript:toggleDiv(\'hazards\');">Learn More</a><sup>\
                                <div id="hazards" style="display: none">\
                                    <p>This report represents which of six major natural hazards (earthquakes, volancoes, landslides, floods, \
                                       drought, and cyclones) are considered high risk for the bioregion.\
                                    <p>Risk has been estimated by combining hazard exposure with historical vulnerability for two indicators of \
                                       elements at risk -- population and Gross Domestic Product per unit area.\
                                    <p>More information on the Natural Hazards datasets can be found <a href="http://www.ldeo.columbia.edu/chrr/research/hotspots/" target="_blank">here</a>.\
                                </div>\
                            </td>\
                        </tr>\
                        <tr>\
                            <td>High Risk of Cyclone <p>(with High economic impact)</td>\
                        </tr>\
                        <tr>\
                            <td>High Risk of Drought <p>(with High economic impact)</td>\
                        </tr>\
                        <tr>\
                            <td>High Risk of Earthquake <p>(with High economic impact)</td>\
                        </tr>\
                        <tr>\
                            <td>High Risk of Flood <p>(with High economic impact)</td>\
                        </tr>\
                        <tr>\
                            <td>High Risk of Landslide <p>(with High economic impact)</td>\
                        </tr>\
                    </tbody>\
                </table>\
                </div>\
                <p>\
                <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>\
                <script type="text/javascript">\
                function toggleDiv(divId) {\
                   $("#"+divId).toggle();\
                }\
                </script>\
                <style type="text/css">\
                    h3 { font-weight: bold; }\
                </style>\
            </div>'
    }
};
