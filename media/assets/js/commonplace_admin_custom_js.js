var CP_Admin = CP_Admin || {};

jQuery(document).ready(function ($) {

	// keep the publish button on the screen
	$('#major-publishing-actions').affix({
		offset: {
			top: 339
		}
	});

	// keep the publish button on the screen
	$('#nav-menu-header').affix({
		offset: {
			top: 171
		}
	});

	$('#nav-menu-meta').affix({
		offset: {
			top: 156
		}
	});

	if ( $('body').is('.will.post-php') ) {
		CP_Admin.showFieldNames();
	}
});

CP_Admin.showFieldNames = function () {
	jQuery('.acf-field[data-name]').each(function(){
		var $t = jQuery(this),
			name = $t.attr('data-name'),
			$target = $t.find('.acf-input');

		if ( $t.is('tr') ) {
			$t.find('.acf-label:eq(0)').append('<span class="acf-field-name-key">Repeater: '+ name + '</span>');
		}
		// No grandparent names
		else if ( $t.find('.acf-field[data-name]').length ) {
			//return;
			$t.prepend('<span class="acf-field-name-key">Repeater: '+ name + '</span>');

		} else {
			$target.append('<span class="acf-field-name-key">'+ name + '</span>');
		}
	});
};

// SCROLL BACK TO THE FIELD
// after closed in fields editor. Because.

CP_Admin.ACF_scrollback = function(evt) {
	var $target = jQuery(evt),
		position = $target.offset(),
		top = position.top - 50;

	jQuery('html, body').animate({
		scrollTop: top
	}, {
		duration: 600,
		complete: function() {

		}
	});
};
acf.add_action( 'close_field', CP_Admin.ACF_scrollback );

CP_Admin.ACF_setupFields = function() {
	// text areas with the maxlength attribute set give users a little countdown
	$(div).find('.textarea[maxlength]').each(function () {
		var max = $(this).attr('maxlength'),
			theID = $(this).attr('id');

		$(this).charactersRemaining();

	});
	
};
acf.add_action( 'setup_fields', CP_Admin.ACF_setupFields );



/*
	
	@charactersRemaining jQuery Plugin
	
	7.7.08 - pdf
	
	xtof wrote some character counting codes for QZ. Here's a plugin version of it.
	Uses max-length property of text area.

	in your js:
	
	$(".charactersremaining").charactersRemaining();

*/

jQuery.fn.charactersRemaining = function () {
	
    // prevent elem has no properties error
    if (this.length === 0) { return (this); }
	
	function Cr($obj) {
		var counter = {
			$target		: $obj,
			maxvalue	: $obj.attr('maxlength'),
			remaining	: null,
			
			init : function () {
				// setting this as property of counter was leaving maxvalue undefined? lookup timing?
				var template = '<label class="counter"><span>' + counter.remaining + '</span> of ';
				template += '<b>' + counter.maxvalue + '</b> characters remaining</label>';

				$obj.after(template);
				counter.remaining = counter.maxvalue - counter.$target.val().length;
				$obj.next('.counter').find('span').text(counter.remaining);
				counter.$target.bind("keyup keydown", counter.tally);
			},
			
			tally : function () {
				// snip it
				if (counter.$target.val().length > counter.maxvalue) {
					counter.$target.val(counter.$target.val().substring(0, counter.maxvalue));
				}

				$obj.next('.counter').find('span').text(counter.maxvalue - counter.$target.val().length);
			}
		};
		// init the counter
		counter.init($obj);
	}
	return this.each(function () {
		new Cr(jQuery(this));
	});
};

// end charactersRemaining

		


