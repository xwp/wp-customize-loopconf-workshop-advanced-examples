
// Enqueue JS at customize_controls_enqueue_scripts w/ customize-controls dependency.
wp.customize.settingConstructor.favorite_item_status = wp.customize.Setting.extend({

	validate: function validate( newValue ) {
		var setting = this, value;
		value = wp.customize.Setting.prototype.validate.call( setting, newValue );

		if ( value !== 'publish' && value !== 'trash' ) {
			value = null; // Prevent invalid value from being written to setting.
		}

		return value;
	}

});
