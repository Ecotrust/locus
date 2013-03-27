
var userID = '1';
    
var users = {
    '1':{
        'id': '1',
        'name': 'Allan',
        'location': '1',
        'friends':['2','3','4','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/FACE.png",
        'isLocusUser': true
    },
    '2':{
        'name': 'Brenda',
        'id': '2',
        'location': '1',
        'friends':['1','3','4','5','6','o1','o2','o3'],
        'img':"/media/DEMO/img/FACE.png",
        'isLocusUser': true
    },
    '3':{
        'name': 'Charlie',
        'id': '3',
        'location': '2',
        'friends':['1','2','7','o4','o5','o6'],
        'img':"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYyzOW1JKSJABKWCPjoGclLfngFotuZOzW3TBlwveMMnSbSaj",
        'isLocusUser': true
    },
    '4':{
        'name': 'Doris',
        'id': '4',
        'location': '1',
        'friends':['1','2','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/FACE.png",
        'isLocusUser': true
    },
    '5':{
        'name': 'Ernie',
        'id': '5',
        'location': '2',
        'friends':['2','6','7','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/FACE.png",
        'isLocusUser': true
    },
    '6':{
        'name': 'Florida Man',
        'id': '6',
        'location': '3',
        'friends':['2','5','7','8','10','o1','o2','o3','o4','o5','o6'],
        'img':"https://si0.twimg.com/profile_images/3383369551/b25b46ee871bb862bac7bb0fe2afe9f0.jpeg",
        'isLocusUser': true
    },
    '7':{
        'name': 'Guillermo',
        'id': '7',
        'location': '3',
        'friends':['3','5','6','9','10','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/FACE.png",
        'isLocusUser': true
    },
    '8':{
        'name': 'Helga',
        'id': '8',
        'location': '4',
        'friends':['6','9','10','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/FACE.png",
        'isLocusUser': true
    },
    '9':{
        'name': 'Irvin',
        'id': '9',
        'location': '5',
        'friends':['7','8','10','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/FACE.png",
        'isLocusUser': true
    },
    '10':{
        'name': 'Janice',
        'id': '10',
        'location': '5',
        'friends':['6','7','8','9','o1','o2','o3','o4','o5','o6'],
        'img':"/media/DEMO/img/FACE.png",
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

var storyPoints = [
    {
        'id': '1',
        'geometry': null,
        'type': 'post',
        'source': '3',
        'title': null,
        'text': 'Tiger blood!',
        'img': null,
        'date': '03/22/2013',
        'isPerm': false
    },
    {
        'id': '2',
        'geometry': null,
        'type': 'post',
        'source': '6',
        'title': null,
        'text': 'I was Arrested For Threatening Neighbor With Machete... again.',
        'img': null,
        'date': '03/21/2013',
        'isPerm': false
    },
    {
        'id': '3',
        'geometry': null,
        'type': 'news',
        'source': 'http://switchboard.nrdc.org/blogs/bfinamore/will_chinas_new_leaders_clean.html',
        'title': 'Will China\'s New Leaders Clean Up the Environment?',
        'text': 'I was trying to clean the coal dust from the windows of my dingy Beijing apartment one day in March 1992 when the phone rang with astonishing news. Nearly one-third of the delegates to the National People’s Congress had just abstained or voted against the construction of the massive Three Gorges Dam, the world’s largest hydropower project. I simply could not believe my ears. China’s rubber-stamp legislature had never displayed such a level of opposition in its entire history, let alone on environmental grounds.  The vote was even more remarkable in light of the government’s strenuous attempts to stifle public debate about the project’s environmental, safety and social impacts.',
        'img': 'http://switchboard.nrdc.org/blogs/bfinamore/Three%20Gorges%20Dam.jpg',
        'date': '03/25/2013',
        'isPerm': false
    },
    {
        'id': '4',
        'geometry': null,
        'type': 'news',
        'source': 'http://wwf.panda.org/who_we_are/wwf_offices/china/environmental_problems_china/',
        'title': 'Local problems leading to global disasters?',
        'text': 'For centuries, China has been the most populous nation on Earth. Today, its population\'s impact on the environment is evident even in the most remote areas. But with an unprecedented economic boom, these effects are taking very serious proportions. While individual use of resources remains low, the cumulative impact of steady growth in the consumption of over a billion people is tremendous.',
        'img': 'http://awsassets.panda.org/img/yang_coal_factory_china_352334.jpg',
        'date': '03/25/2013',
        'isPerm': false
    },
    {
        'id': '5',
        'geometry': null,
        'type': 'news',
        'source': 'http://www.guardian.co.uk/environment/blog/2011/apr/12/china-green-plans-america',
        'title': 'China\'s green progress leaves US red-faced',
        'text': 'China pushes ahead with an emissions trading scheme, while American initiatives remain sunk in Congressional quicksand. When it comes to responding to climate change, the contrast between China and the United States is stark. It has been clear for some time that the Asian powerhouse is moving more rapidly on renewable technologies. A recent report by Pew Charitable Trusts shows China led the world last year with a $54.4bn investment in clean technology, about 40% higher than third-placed America.',
        'img': 'http://static.guim.co.uk/sys-images/Environment/Pix/columnists/2011/2/28/1298909592540/China-GDP-slowdown-008.jpg',
        'date': '04/12/2011',
        'isPerm': false
    },
];

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