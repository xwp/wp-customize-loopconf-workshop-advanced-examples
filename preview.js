/* global wp, console */

wp.customize.LoopConfWorkshopAdvancedExamplesPreview = (function( $ ) {
	'use strict';

	var component = {};

	// Message-passing examples.
	wp.customize.bind( 'preview-ready', function() {
		wp.customize.preview.bind( 'greeting', function( message ) {
			console.info( 'Pane sent greeting:', message );
		} );
	} );
	wp.customize.bind( 'preview-ready', function() {
		wp.customize.preview.bind( 'active', function() {
			wp.customize.preview.send( 'greeting', 'Howdy, Pane!' );
		} );
	} );

	return component;

})( jQuery );
