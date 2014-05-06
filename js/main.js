jQuery(document).ready(function($) {
   
   'use strict';
   
   
   //REVOLUTION SLIDER
   var revapi;


   revapi = jQuery('.tp-banner').revolution(
	{
		delay:9000,
		startwidth:1170,
		startheight:500,
		hideThumbs:10,
		fullWidth:"on",
		forceFullWidth:"on"
	});


	
	//SMOOTH SCROLL
	smoothScroll.init({
		speed: 500, // How fast to complete the scroll in milliseconds
		easing: 'easeInOutCubic', // Easing pattern to use
		updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
		callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
		callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
	 });

    
	  
	//OWLCAROUSEL TESTIMONIAL
	$("#quote").owlCarousel({
 
		pagination : false, 
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		navigation : true, // Show next and prev buttons
		navigationText : ['<i class="fa fa-2x fa-angle-left"></i>','<i class="fa fa-2x fa-angle-right"></i>']
 

	});
	
	//OWLCAROUSEL TEAM
	$("#team-slider").owlCarousel({
 
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:false,
		items : 3,
		itemsDesktop : [1200,3],
		itemsDesktopSmall : [980,3],
		itemsTablet: [768,2],
		itemsMobile : [479,1],
		navigation : false // Show next and prev buttons

	});
  
	//LIGHTBOX GALLERY
	(function ($, window, document, undefined) {

		var gridContainer = $('#grid-container'),
			filtersContainer = $('#filters-container');

		// init cubeportfolio
		gridContainer.cubeportfolio({

			defaultFilter: '*',

			animationType: 'rotateSides',

			gapHorizontal: 10,

			gapVertical: 10,

			gridAdjustment: 'responsive',

			caption: 'pushTop',

			displayType: 'sequentially',

			displayTypeSpeed: 100,

			// lightbox
			lightboxDelegate: '.cbp-lightbox',
			lightboxGallery: true,
			lightboxTitleSrc: 'data-title',
			lightboxShowCounter: true,

			// singlePage popup
			singlePageDelegate: '.cbp-singlePage',
			singlePageDeeplinking: true,
			singlePageStickyNavigation: true,
			singlePageShowCounter: true,
			singlePageCallback: function (url, element) {
				// to update singlePage content use the following method: this.updateSinglePage(yourContent)
			},

			// singlePageInline
			singlePageInlineDelegate: '.cbp-singlePageInline',
			singlePageInlinePosition: 'below',
			singlePageInlineShowCounter: true,
			singlePageInlineInFocus: true,
			singlePageInlineCallback: function(url, element) {

				// to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
				var t = this;

				$.ajax({
					url: url,
					type: 'GET',
					dataType: 'html',
					timeout: 5000
				})
				.done(function(result) {

					t.updateSinglePageInline(result);

				})
				.fail(function() {
					t.updateSinglePageInline("Error! Please refresh the page!");
				});

			}
		});

		// add listener for filters click
		filtersContainer.on('click', '.cbp-filter-item', function (e) {

			var me = $(this), wrap;

			// get cubeportfolio data and check if is still animating (reposition) the items.
			if ( !$.data(gridContainer[0], 'cubeportfolio').isAnimating ) {

				if ( filtersContainer.hasClass('cbp-l-filters-dropdown') ) {
					wrap = $('.cbp-l-filters-dropdownWrap');

					wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');

					wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());

					me.addClass('cbp-filter-item-active');
				} else {
					me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
				}

			}

			// filter the items
			gridContainer.cubeportfolio('filter', me.data('filter'), function () {});

		});

		// activate counter for filters
		gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));


		// add listener for load more click
		$('.cbp-l-loadMore-button-link').on('click', function(e) {

			e.preventDefault();

			var clicks, me = $(this), oMsg;

			if (me.hasClass('cbp-l-loadMore-button-stop')) return;

			// get the number of times the loadMore link has been clicked
			clicks = $.data(this, 'numberOfClicks');
			clicks = (clicks)? ++clicks : 1;
			$.data(this, 'numberOfClicks', clicks);

			// set loading status
			oMsg = me.text();
			me.text('LOADING...');

			// perform ajax request
			$.ajax({
				url: me.attr('href'),
				type: 'GET',
				dataType: 'HTML'
			})
			.done( function (result) {
				var items, itemsNext;

				// find current container
				items = $(result).filter( function () {
					return $(this).is('div' + '.cbp-loadMore-block' + clicks);
				});

				gridContainer.cubeportfolio('appendItems', items.html(),
					 function () {
						// put the original message back

						me.text(oMsg);

						// check if we have more works
						itemsNext = $(result).filter( function () {
							return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
						});

						if (itemsNext.length === 0) {
							me.text('NO MORE WORKS');
							me.addClass('cbp-l-loadMore-button-stop');
						}

					 });

			})
			.fail(function() {
				// error
			});

		});

	})(jQuery, window, document);

}); 

$(window).load(function(){

    //PRELOADER
    $('.preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.

	//HEADER ANIMATION
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

});


// CONTACT FORM FUNCTION
var contact_send = function(){
	
	'use strict';
	
	var name 	= $("#name").val();
	var email	= $("#email").val();
	var message = $("#message").val();
	
	if ( name=="" ){ alert("Your name is empty!"); $("#name").focus(); }
	else if ( email=="" ){ alert("Your email address is empty!"); $("#email").focus(); }
	else if ( message=="" ){ alert("Your message is empty!"); $("#message").focus(); }
	else {
		$.post("contact.send.php", { name:name, email:email, message:message }, function( result ){
			if ( result=="SUCCESS" ){
				alert("Your contact form is sent.");
				setTimeout(function(){
					$("#name").val("");
					$("#email").val("");
					$("#message").val("");
				}, 3000);
			} else {
				alert("Your contact form isn't sent. Please check fields and try again.");
			}
		});
	}

};