if ( typeof window.envira_zoom_settings === 'undefined' ) {
	var envira_zoom_settings = {};
}

var zoom_window_height      = parseInt(envira_zoom_settings.zoom_window_height);
var zoom_window_width       = parseInt(envira_zoom_settings.zoom_window_width);
var zoom_window_offset_x    = parseInt(envira_zoom_settings.zoom_window_offset_x);
var zoom_window_offset_y    = parseInt(envira_zoom_settings.zoom_window_offset_y);
var zoom_window_position    = parseInt(envira_zoom_settings.zoom_window_position);
var zoom_lens_size          = 200;
var mobile_zoom             = false;
var zoom_click              = false;

if ( envira_zoom_settings.mobile_zoom === '1' ) { mobile_zoom = true; }
if ( envira_zoom_settings.zoom_hover === 'click' ) { zoom_click = true; }

function envira_setup_zoom_vars() {

	/* Let's Check Again, IE related */

	if ( zoom_window_height === undefined )    { zoom_window_height      = parseInt(envira_zoom_settings.zoom_window_height); }
	if ( zoom_window_width === undefined )     { zoom_window_width       = parseInt(envira_zoom_settings.zoom_window_width); }
	if ( zoom_window_offset_x === undefined )  { zoom_window_offset_x    = parseInt(envira_zoom_settings.zoom_window_offset_x); }
	if ( zoom_window_offset_y === undefined )  { zoom_window_offset_y    = parseInt(envira_zoom_settings.zoom_window_offset_y); }
	if ( zoom_window_position === undefined )  { zoom_window_position    = parseInt(envira_zoom_settings.zoom_window_position); }
	if ( zoom_lens_size === undefined )        { zoom_lens_size          = 200; }
	if ( mobile_zoom === undefined )           { if ( envira_zoom_settings.mobile_zoom === '1' ) { mobile_zoom = true; } }
	if ( zoom_click === undefined )            { if ( envira_zoom_settings.zoom_hover === 'click' ) { zoom_click = true; } }

	var browser_width = jQuery(window).width();
	var offset_percent = 1;
	var max_width = 9999;
	var x_offset_offset = 2;
	var y_offset_offset = -2;

	switch (true) {
		case ( browser_width < 400 ):
			offset_percent = 0.50;
			max_width = 100;
			zoom_lens_size = 5;
			x_offset_offset = 2;
			y_offset_offset = -2;
			if ( envira_zoom_settings.mobile_zoom_js !== '') {
				mobile_zoom = false;
			}
			break;
		case ( browser_width > 399 && browser_width < 768):
			offset_percent = 0.70;
			max_width = 200;
			zoom_lens_size = 100;
			x_offset_offset = 2;
			y_offset_offset = -2;
			if ( envira_zoom_settings.mobile_zoom_js !== '') {
				mobile_zoom = false;
			} 
			break;
		case ( browser_width > 767 && browser_width < 1024):
			offset_percent = 0.90;
			max_width = 300;
			x_offset_offset = 2;
			y_offset_offset = -2;
			mobile_zoom = 'true';
			break;
		case ( browser_width > 1023 && browser_width < 1200):
			offset_percent = 0.90;
			max_width = 300;
			x_offset_offset = 2;
			y_offset_offset = -2;
			mobile_zoom = 'true';
			break;
		default:
			offset_percent = 1;
			x_offset_offset = 2;
			y_offset_offset = -2;
			mobile_zoom = 'true';
			break;
	}

	/* x_offset_offset is a "hack" to resolve a one-pixel shift seen at a narrow range of browser sizes in Chrome */

	zoom_window_height      = parseInt(envira_zoom_settings.zoom_window_height) * offset_percent;
	zoom_window_width       = parseInt(envira_zoom_settings.zoom_window_width) * offset_percent;
	zoom_window_offset_x    = (parseInt(envira_zoom_settings.zoom_window_offset_x) * offset_percent);
	zoom_window_offset_y    = (parseInt(envira_zoom_settings.zoom_window_offset_y) * offset_percent);

	/* Ensure Max Is Not Exceeded */

	if ( zoom_window_height > max_width )   { zoom_window_height = max_width; }
	if ( zoom_window_width > max_width )    { zoom_window_width = max_width; }
	if ( zoom_window_offset_x > max_width ) { zoom_window_offset_x = max_width; }
	if ( zoom_window_offset_y > max_width ) { zoom_window_offset_y = max_width; }    

}    

envira_setup_zoom_vars();

function envirabox_zoom_init() { 

	var scrollZoom = false;
	if ( envira_zoom_settings.scrollZoom === '1' ) { scrollZoom = true; }

	var easing = false;
	if ( envira_zoom_settings.easing === '1' ) { easing = true; }
	 
	jQuery('.envirabox-image').elevateZoom({
		responsive : false,
		zoomType   : envira_zoom_settings.zoomType,
		lensSize   : 200,
		containLensZoom : true,
		scrollZoom : scrollZoom,
		tint: envira_zoom_settings.tint,
		tintColour: '#' + envira_zoom_settings.tint_color,
		tintOpacity: envira_zoom_settings.tint_color_opacity,
		zoomWindowPosition : zoom_window_position,
		zoomWindowHeight: zoom_window_height,
		zoomWindowWidth: zoom_window_width,
		borderSize: 1,
		easing: easing,
		easingDuration: envira_zoom_settings.easingDuration,
		lensFadeOut: envira_zoom_settings.lensFadeOut,
		lensFadeIn: envira_zoom_settings.lensFadeIn,
		zoomWindowOffetx : zoom_window_offset_x,
		zoomWindowOffety : zoom_window_offset_y,
		lensShape: envira_zoom_settings.zoom_lens_shape,
	});

} /* envirabox_zoom_init */

envirabox_zoom_init();


/* Output the ElevateZoom JS with all it's settings */

if ( zoom_window_height === undefined ) {
	envira_setup_zoom_vars();
}

/* On click event only if the click was selected instead of hover */

if ( envira_zoom_settings.zoom_hover === 'click' ) {

	jQuery('body').on('click', '#btnZoom:not(.btnZoomOff)', function() {
		/* kill the elevateZoom instance */
		var img = jQuery('.envirabox-image');
		jQuery('.zoomContainer').remove();
		img.removeData('elevateZoom');
		img.removeData('zoomImage');
		jQuery(this).removeClass('btnZoomOn').addClass('btnZoomOff').parent().removeClass('zoom-on');
	});

	jQuery('body').on('click', '#btnZoom:not(.btnZoomOn)', function(e) {
		e.preventDefault();
		jQuery(this).removeClass('btnZoomOff').addClass('btnZoomOn').parent().addClass('zoom-on'); 
		envira_setup_zoom_vars();
		jQuery('.zoomContainer').show();
		envirabox_zoom_init();
	});

}




jQuery( window ).resize(function() {


	if ( jQuery('.zoomContainer').length ) {
		/* kill it */
		var img = jQuery('.envirabox-image');
		jQuery('.zoomContainer').remove();
		img.removeData('elevateZoom');
		img.removeData('zoomImage');

		envira_setup_zoom_vars();
		envirabox_zoom_init();
	}

}); 
