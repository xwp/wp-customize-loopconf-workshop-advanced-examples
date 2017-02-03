
// Enqueue JS at customize_controls_enqueue_scripts w/ customize-controls dependency.
wp.customize.controlConstructor.favorite_item_status = wp.customize.Control.extend({
	ready: function() {
		var control = this;
		control.button = control.container.find( 'button' );
		control.button.on( 'click', function() {
			var status = 'publish' === control.setting.get() ? 'trash' : 'publish';
			control.setting.set( status );
		} );
		control.updateButton();
		control.setting.bind( _.bind( control.updateButton, control ) ); // BIND THEM!
	},

	updateButton: function() {
		var control = this;
		control.button.find( '.trash' ).toggle( 'trash' !== control.setting.get() );
		control.button.find( '.untrash' ).toggle( 'trash' === control.setting.get() );
	}
});
