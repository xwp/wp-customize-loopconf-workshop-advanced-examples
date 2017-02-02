/* global wp, console */

wp.customize.LoopConfWorkshopAdvancedExamplesPane = (function( $ ) {
	'use strict';

	var component = {};

	/**
	 * Try first Value examples.
	 */
	component.tryValueExample1 = function() {
		var percentage = new wp.customize.Value();
		percentage.validate = function( value ) {
			value = parseFloat( value );
			if ( isNaN( value ) || value < 0 || value > 100 ) {
				return null; // Short-circuit.
			}
			return value;
		};
		percentage.bind( function( value ) {
			console.info( 'The percentage is now:', value );
		} );

		percentage.get(); // ==> undefined
		percentage.set( 0 );
		percentage.set( '50' );
		typeof percentage.get(); // Still number.
		percentage.set( 99.9 );
		percentage.set( -1 ); // No-op since invalid.
		percentage.set( 200 ); // No-op since invalid.
		percentage.set( 'one hundred' ); // No-op since invalid.
		percentage.get(); // ==> Still 99.9.
	};

	/**
	 * Try second Value examples.
	 */
	component.tryValueExample2 = function() {
		// Update a setting.
		wp.customize( 'blogdescription' ).set( 'Just another customizer-managed site.' );

		// Move Site Identity section to the bottom.
		wp.customize.section( 'title_tagline' ).priority.set( 100000 );

		// Switch to mobile preview.
		wp.customize.previewedDevice.set( 'mobile' );

		// Toggle controls pane being expanded.
		var paneVisibleState = wp.customize.state( 'paneVisible' );
		paneVisibleState.set( ! paneVisibleState.get() );

		// Create Site Title input that, along with blogname control, syncs with blogname setting.
		var inputElement = jQuery( '<input placeholder="Site Title" style="width:100%">' );
		jQuery( '#customize-header-actions' ).append( inputElement );
		var elementModel = new wp.customize.Element( inputElement );
		elementModel.set( wp.customize( 'blogname' ).get() );
		elementModel.sync( wp.customize( 'blogname' ) );
	};

	/**
	 * Try first Values examples.
	 */
	component.tryValuesExample1 = function() {
		// Each control.
		var mediaControls = [];
		wp.customize.control.each( function( control ) {
			if ( control.extended( wp.customize.MediaControl ) ) {
				mediaControls.push( control );
			}
		} );

		// Has section.
		if ( ! wp.customize.section.has( 'colors' ) ) {
			console.info( 'Is your theme too gray?' );
		}

		// Getter for panel.
		var widgetsPanel = wp.customize.panel( 'widgets' );
		widgetsPanel.priority.set( 1 ); // Widgets are important!

		// Remove section.
		var section = wp.customize.section( 'title_tagline' );
		wp.customize.section.remove( section.id );
		section.container.remove(); // Shouldn't be needed in future.
	};

	/**
	 * Try second Values examples.
	 */
	component.tryValuesExample2 = function() {

		// Make the blogname control appear at the end when it is available.
		wp.customize.control( 'blogname', function( control ) {
			control.priority.set( 1000 );
		} );


		// Single-setting deferred (this should look very familiar!)
		wp.customize( 'blogname', function( setting ) {
			console.info( 'Your site is named:', setting.get() );
		} );


		// Multi-setting deferred: Let the title and tagline settings sync with each other (why not).
		wp.customize( 'blogname', 'blogdescription', function( title, tagline ) {
			title.sync( tagline );
		} );
	};

	/**
	 * Try third Values examples.
	 */
	component.tryValuesExample3 = function() {

		// Warn users of capital_P_dangit shame, but allow them to proceed anyway.
		wp.customize( 'blogdescription', function( setting ) {
			var code = 'capital_P_dangit';
			setting.bind( function( value ) {
				var notification;
				if ( /[Ww]ordpress/.test( value ) ) {
					notification = new wp.customize.Notification( code, {
						type: 'warning',
						message: 'The WordPress community will shame you for not using a capital P!'
					} );
					setting.notifications.add( code, notification );
				} else {
					setting.notifications.remove( code );
				}
			} );
		} );
	};

	// Message-passing examples.
	wp.customize.bind( 'ready', function() {
		wp.customize.previewer.bind( 'ready', function() {
			wp.customize.previewer.send( 'greeting', 'Howdy, Preview!' );
		} );
	} );
	wp.customize.bind( 'ready', function() {
		wp.customize.previewer.bind( 'greeting', function( message ) {
			console.info( 'Pane sent greeting:', message );
		} );
	} );

	return component;

})( jQuery );
