// Modified http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
// Only fires on body class (working off strictly WordPress body_class)

var CP = {

	$body : $('body'),

    is_mobile: function () {
        if ( CP.get_breakpoint() === 'phone' ) {
            return true;
        } else {
            return false;
        }

    },
    is_retina_test: function () {
        return window.devicePixelRatio > 1 ? true : false;
    },
    set_break_point_indicator: function () {
        // Create the state-indicator element
        CP.breakPointIndicator = document.createElement('div');
        CP.breakPointIndicator.className = 'break-point-indicator';
        document.body.appendChild(CP.breakPointIndicator);
    },
    
    scrollTarget : 'WebkitAppearance' in document.documentElement.style ? $('body') : $('html'),

    title : document.title.split(' | ')[0],
    
    bannerHeight : $('#banner').height(),
    
	$banner : $("#banner"),
	
	$window : $(window),

    get_breakpoint: function () {
        var index = parseInt(window.getComputedStyle(CP.breakPointIndicator).getPropertyValue('z-index'), 10);

        var states = {
            10: 'tablet',
            20: 'desktop',
            30: 'desktop-lg',
            40: 'desktop-xl'
        };

        return states[index] || 'phone';
    },


    // All pages
    common: {
        init: function() {


            CP.is_retina = CP.is_retina_test() ? true : false;
            
            CP.set_break_point_indicator();

            $('.dbug h2').on('click', function(){
                $(this).parent().find('.dbug-content').toggle();
            });

            //CP.dealWithOldBrowsers();


           
			CP.tocHandler();
			CP.aboutHandler();

			CP.handleDataLinks();

			//CP.delayBgLoad();


            if (  CP.is_retina ) {
                //CP.retinaSwapper();
            }

            //CP.eventTracking();

			// DEMO ONLY?
			//CP.setupModals();

        },
        // finalize is run last, after init and after and page specific methods
        finalize: function() {
        }
    },
    // Home page
    home: {
        init: function() {

        }
    },
    will: {
        init: function () {
            $('#qm-wrapper thead').on('dblclick', function(){
                $(this).closest('table').find('tbody').toggle();
            });
        }
    },


};


CP.tocHandler = function () {
	var $toc = $('.toc'),
		$mask = $('<div class="mask"></div>');


	function toggleToc(evt) {

		if ( $toc.is('.open') ) {
			$('.mask').remove();
		} else {
			CP.$body.append( $mask );
		}

		$toc.toggleClass('open');
	}

	CP.$body.on('click ','.toc-toggle, .mask, .toc a', toggleToc);

};
CP.aboutHandler =  function() {
	var $about = $('.cp-about'),
		$mask = $('<div class="mask"></div>');


	function aboutToc(evt) {

		if ( $about.is('.open') ) {
			$('.mask').remove();
		} else {
			CP.$body.append( $mask );
		}
		$about.toggleClass('open');
	}

	CP.$body.on('click ','.menu-about a, .mask, .cp-about a', aboutToc);
};

CP.delayBgLoad = function () {

	//CP.loadBgImage($('main .feature'));

	// GRAB original and add a 'pre' option
	// to trigger an action just before it enters the viewport
	// preThreshold (number +/- when it's visible)
	// preCallback (so you can load something earlier if needed)
	/*
	$('header.feature').scrollClass({
		delay: 20, //set class after 20 milliseconds delay
		threshold: 3, //set class when 3% of element enters the viewport
		offsetTop: 50, //height in pixels of a fixed top navbar
		callback: function () { //fire a callback
			CP.loadBgImage( $(this) );
		}
	});
	*/
};

CP.hashClean = location.hash.split('#')[1];
CP.hashHandler = function (evt) {
    CP.hashClean = location.hash.split('#')[1];

    if (document.getElementById(CP.hashClean) ){
		//console.info("Is hash undefined?", location.hash, 'cp.hashClean',CP.hashClean );
        CP.scrollTo(CP.hashClean);
    }
};





CP.dealWithOldBrowsers = function () {
    if (!Modernizr.input.placeholder) {
        //inputs[0].focus();
        $('input[placeholder]').each(function () {
            $(this)
                .closest('form').addClass('no-placeholder')
                .find('.sr-only').removeClass('sr-only');
        });
        //placeholderFix();
    }

    if ( $('meta[name="oldie"]').attr('content') === "true" ) {
        $('html').addClass('oldIE');
    }
};

CP.eventTracking = function () {
/*
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced
 * https://developers.google.com/analytics/devguides/collection/protocol/v1/
 * Back end tracking
 * http://www.stumiller.me/implementing-google-analytics-measurement-protocol-in-php-and-wordpress/
 *
 *
 * TODO:
 * tracking nice search via GA filters http://www.lunametrics.com/blog/2013/07/01/google-analytics-site-search-seo-friendly-urls/
 * track retina via custom var https://gist.github.com/andrewrocco/3130217
 * move Viewport to custom dimension?
 *
 *
 * ga('send', 'event', 'category', 'action', 'label', value);  // value is a number.
 * ga('send', 'event', 'button', 'click', 'nav buttons', 4);
 * ga('send', 'event', 'category', 'action', {'page': '/my-new-page'});
 ga('send', {
  'hitType': 'event',          // Required.
  'eventCategory': 'button',   // Required.
  'eventAction': 'click',      // Required.
  'eventLabel': 'nav buttons',
  'eventValue': 4
  'hitCallback' : function () {
    document.location = href;
}
});
*/

    CP.GA_Report_Social();
    CP.GA_Report_Random();
};



CP.GA_Report_Social = function () {
    $('.social-join-us').find('a').on('click', function () {
        var link = $(this).attr('href'),
            text = $(this).text();
        
        ga('send', 'event', 'Social', 'Connect With Us', text, {'hitCallback':
            function () {
                document.location = link;
            }
        });

    });

    $('.social-links').find('a').on('click', function () {
        var link = $(this).attr('href'),
            text = $(this).find('span').text();
        
        ga('send', 'event', 'Social', 'Blog Share', text, {'hitCallback':
            function () {
                document.location = link;
            }
        });

    });
};



CP.GA_Report_Random = function () {
    //until these find a better home
    $('.image-info-grid').on('click', '.grid-item', function () {
        var title = $(this).find('.title').text();
        ga('send', 'event', 'UI Interactions', 'Info Grid Click', title);
    });

    $('#cats-dropdown').on('click', function(){
        if (! $(this).hasClass('closed') ) {
            ga('send', 'event', 'Blog', 'Categories Opened');
        }
    }).on('click', 'a', function() {
        var title = $(this).text();
        ga('send', 'event', 'Blog', 'Category Clicked', title, {'hitCallback':
            function () {
                document.location = link;
            }
        });

    });

    $('.related').on('click', 'a', function () {
        var title = $(this).text();
        title = $.trim(title);
        
        ga('send', 'event', 'Blog', 'Related Clicked', title, {'hitCallback':
            function () {
                document.location = link;
            }
        });
    });
};

/*
CP.add2x = function (url) {
    var first, type, newURL;

    first = url.slice(0,-4);
    type = url.slice(-4);
    newURL = first + '@2x' + type;

    return newURL;
};

CP.backGroundImageRetina = function (item) {
        var style = item.currentStyle || window.getComputedStyle(item, false),
            bi = style.backgroundImage.slice(4, -1),
            newbg = bi.slice(0, -5) + '@2x.jpg"';

        item.style.backgroundImage = 'url(' + newbg + ')';
};
CP.retinaSwapper = function () {
    var width, height, src, newURL;

    $('.img-retina').each(function (i, img) {
        width = img.width;
        height = img.height;
        src = img.src;
        newURL = CP.add2x(src);

        $(img)
            .attr('src', newURL)
            .attr('width', width)
            .attr('height', height);
    });

    
};

*/
// used to keep urls pointing at canonical urls but allow jumping
// to #positions on overview pages. 
CP.handleDataLinks = function () {
    var $links = $('a[data-link]'),
        $t, dataLink, newUrl;

    $links.each(function () {
        $t = $(this);
		dataLink = $t.attr('data-link');
		newUrl = dataLink.indexOf("#") === 0 ? dataLink : "#" + dataLink;
        //$t.attr('href', $t.attr('data-link') );
        $t.attr('href', newUrl );
    });
};

CP.scrollTo = function (hash, easing) {
	//console.log('scrollTo Params:', hash, easing);
    var $target, position, currentOffset,
        $body = CP.scrollTarget,
        easingType = easing || "easeInOutQuint";

	$target = hash.indexOf('#') === 0 ? $(hash) : $('#'+hash);
    
    if ($target !== undefined) {
        if ( $target.offset() !== undefined ) {
            position = $target.offset().top;
        } else {
        }
        currentOffset = $body.scrollTop() - position;


        // scroll to the container
        $body.animate({
            // nav offset
            scrollTop: position - CP.bannerHeight
        }, {
            duration: 1500,
            easing: easingType,
            complete: function() {
				//console.log('Scroll Complete');
            }
        });
    } else {
        //console.log('scrollTo got an undefined target.', hash);
    }
};



CP.jumpLinkHandler = function( evt ) {
	//console.info('JumpLinkHandler');
    var $t = $(evt.target),
        href = $t.attr('href');
        //$target = $(href);

    CP.scrollTo(href);

    // prevent the occasional pre animation jump
    evt.preventDefault();
};


CP.setupModals = function (arg) {
	$('.lightbox-image').magnificPopup({
		type:'image'
		, disableOn : 520
		, closeOnContentClick : true
		, image: {
			verticalFit: true,
			titleSrc: function(item) {
				// item.el == $(item)
				return item.el.find('.sr-only').html();
				//return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.src+'" target="_blank">open original</a>';
			}
		}
	});
	$('.lightbox-iframe').magnificPopup({
		type:'iframe'
		, disableOn : 520
		, closeOnContentClick : true
	});
	// http://codepen.io/dimsemenov/pen/zvLny
	$('.lightbox-gallery-link').click(function() {

		var items = [],
			$t = $(this),
			$gallery = $( $t.attr('href') ),
			source = "";

		$gallery.find('.gallery-item').each(function() {
			//source = $(this).attr('href');
			//source = source.split('..');

			items.push( {
				//src: source[1]
				src: $(this).attr('href'),
				title : $(this).html()
				//title : $(this).find('.caption')
			} );
		});

		$.magnificPopup.open({
			items:items,
			type: 'image',
			gallery: {
				enabled: true,
				preload: [0,1]
			},
			callbacks: {
				change: function() {
					//console.log('Content changed');
					//console.log(this.content); // Direct reference to your popup element
				},
				resize: function(data) {
					// resize event triggers only when height is changed or layout forced
				},
				imageLoadComplete: function(data) {
					// fires when image in current popup finished loading
					//console.log('this', this);
					//console.log('this.el', this.el);
					//console.log('this.src', this.src);
					// avaiable since v0.9.0
					//console.log('Image loaded');
				}
			}
			
		});
	});
	$('.lightbox-gallery').each(function() {
		$(this).magnificPopup({
			delegate: 'a' // the selector for gallery item
			, type: 'image'
			, gallery: {
				enabled:true
			}
			, image: { /*
				markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<div class="mfp-img"></div>'+
					'<div class="mfp-bottom-bar">'+
						'<div class="mfp-project"></div>'+
						'<div class="mfp-title"></div>'+
						'<div class="mfp-counter"></div>'+
					'</div>'+
				'</div>'
				,*/ titleSrc: function(item) {
					var title = $(item.el).next('p');
					return title;
				}
			}
		});
	});

	$('.menu-about > a').magnificPopup({
		type: 'ajax',
		callbacks: {
			parseAjax: function(mfpResponse) {
				mfpResponse.data = $(mfpResponse.data).find('#about-and-issues');
				//console.log('Ajax content loaded:', mfpResponse);
			},
			ajaxContentAdded: function() {
				// Ajax content is loaded and appended to DOM
				//console.log(this.content);
			}
		}

	});
	$('.toc-issues').magnificPopup({
		type: 'ajax',
		callbacks: {
			parseAjax: function(mfpResponse) {
				mfpResponse.data = $(mfpResponse.data).find('#issues');
				//console.log('Ajax content loaded:', mfpResponse);
			},
			ajaxContentAdded: function() {
				// Ajax content is loaded and appended to DOM
				//console.log(this.content);
			}
		}

	});
};

CP.setUpMaps = function (m) {};



var UTIL = {
    fire: function(func, funcname, args) {
        var namespace = CP;
        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
            namespace[func][funcname](args);
        }
    },
    loadEvents: function() {
        UTIL.fire('common');

        $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
            //console.log('Util classname: ', classnm);
            UTIL.fire(classnm);
        });

        UTIL.fire('common', 'finalize');
    }
};

$(document).ready(UTIL.loadEvents);
