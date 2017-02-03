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
	 * Value 2a: Update a setting.
	 */
	component.tryValueExample2a = function() {
		wp.customize( 'blogdescription' ).set( 'Just another customizer-managed site.' );
	};

	/**
	 * Value 2b: Move Site Identity section to the bottom.
	 */
	component.tryValueExample2b = function() {
		wp.customize.section( 'title_tagline' ).priority.set( 100000 );
	};

	/**
	 * Value 2c: Switch to mobile preview.
	 */
	component.tryValueExample2c = function() {
		wp.customize.previewedDevice.set( 'mobile' );
	};

	/**
	 * Value 2d: Toggle controls pane being expanded.
	 */
	component.tryValueExample2d = function() {
		var paneVisibleState = wp.customize.state( 'paneVisible' );
		paneVisibleState.set( ! paneVisibleState.get() );
	};

	/**
	 * Value 2e: Create Site Title input that, along with blogname control, syncs with blogname setting.
	 */
	component.tryValueExample2e = function() {
		var inputElement = jQuery( '<input placeholder="Site Title" class="widefat">' );
		jQuery( '#customize-header-actions' ).append( inputElement );
		var elementModel = new wp.customize.Element( inputElement );
		elementModel.set( wp.customize( 'blogname' ).get() );
		elementModel.sync( wp.customize( 'blogname' ) );
	};

	/**
	 * Values 1a: Each control.
	 */
	component.tryValuesExample1a = function() {
		var mediaControls = [];
		wp.customize.control.each( function( control ) {
			if ( control.extended( wp.customize.MediaControl ) ) {
				mediaControls.push( control );
			}
		} );
		console.info( 'Media controls:', _.pluck( mediaControls, 'id' ) );
	};

	/**
	 * Values 1b: Has section.
	 */
	component.tryValuesExample1b = function() {
		console.log( wp.customize.section.has( 'colors' ) ? 'Double rainbow?' : 'Dreary?' );
	};

	/**
	 * Values 1c: Getter for panel.
	 */
	component.tryValuesExample1c = function() {
		var widgetsPanel = wp.customize.panel( 'widgets' );
		widgetsPanel.priority.set( 1 ); // Widgets are important!
	};

	/**
	 * Values 1d: Remove section.
	 */
	component.tryValuesExample1d = function() {
		var section = wp.customize.section( 'title_tagline' );
		wp.customize.section.remove( section.id );
		section.container.remove(); // Shouldn't be needed in future.
	};

	/**
	 * Values 2a: Make the blogname control appear at the end when it is available.
	 */
	component.tryValuesExample2a = function() {
		wp.customize.control( 'blogname', function( control ) {
			control.priority.set( 1000 );
		} );
	};

	/**
	 * Values 2b: Single-setting deferred (this should look very familiar!)
	 */
	component.tryValuesExample2b = function() {
		wp.customize( 'blogname', function( setting ) {
			console.info( 'Your site is named:', setting.get() );
		} );
	};

	/**
	 * Values 2c: Multi-setting deferred: Let the title and tagline settings sync with each other (why not).
	 */
	component.tryValuesExample2c = function() {
		wp.customize( 'blogname', 'blogdescription', function( title, tagline ) {
			title.sync( tagline );
		} );
	};

	/**
	 * Values 3: Warn users of capital_P_dangit shame, but allow them to proceed anyway.
	 */
	component.tryValuesExample3 = function() {
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

	/**
	 * Events 1.
	 */
	component.tryEventsExample1 = function() {
		var party = {
			greet: function( name ) {
				console.log( 'Hello, %s!', name );
				this.trigger( 'greeted', name );
			}
		};

		_.extend( party, wp.customize.Events ); // <== Mixin!

		var onGreeted = function( greetedName ) {
			console.log( '%s was greeted!', greetedName );
		};

		party.bind( 'greeted', onGreeted );
		party.greet( 'John' ); // Logs greeted event.
		party.unbind( 'greeted', onGreeted );
		party.greet( 'Jane' ); // No greeted event logged.
	};

	/**
	 * Events 2.
	 */
	component.tryEventsExample2 = function() {
		var Party = wp.customize.Class.extend( {
			greet: function( name ) {
				console.log( 'Hello, %s!', name );
				this.trigger( 'greeted', name );
			}
		} );
		_.extend( Party.prototype, wp.customize.Events ); // <== Mixin!

		var onGreeted = function( greetedName ) {
			console.log( '%s was greeted!', greetedName );
		};

		var gathering = new Party();
		gathering.bind( 'greeted', onGreeted );
		gathering.greet( 'John' ); // Logs greeted event.
		gathering.unbind( 'greeted', onGreeted );
		gathering.greet( 'Jane' ); // No greeted event logged.
	};

	/**
	 * Events 3.
	 */
	component.tryEventsExample3 = function() {

		// Watch for the first expansion of each added section.
		var logSectionFirstExpanded = function( section ) {
			var onceExpanded, onExpandedChange;
			onceExpanded = function() {
				console.info( 'Section "%s" expanded! You should now lazy-load your controls if needed.', section.id );
			};
			if ( section.expanded.get() ) {
				onceExpanded( section ); // Already expanded so no need for onExpandedChange.
			} else {
				onExpandedChange = function( isExpanded ) {
					if ( isExpanded ) {
						section.expanded.unbind( onExpandedChange ); // Value#unbind().
						onceExpanded( section );
					}
				};
				section.expanded.bind( onExpandedChange ); // Value#bind().
			}
		};

		// Watch any sections already added.
		wp.customize.section.each( logSectionFirstExpanded );

		// Watch for sections newly added.
		wp.customize.section.bind( 'add', logSectionFirstExpanded ); // Events#bind().
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
