wp.customize.bind( 'ready', function() {
	var setting, control, customizeId = 'favorite_item[9876543210][status]';

	setting = new wp.customize.settingConstructor.favorite_item_status( customizeId, 'publish', {
		previewer: wp.customize.previewer,
		transport: 'postMessage'
	} );
	wp.customize.add( setting.id, setting );

	control = new wp.customize.controlConstructor.favorite_item_status( customizeId, {
		params: {
			section: 'dynamic_special_favorite_items',
			type: 'favorite_item_status', // Needed to for template.
			label: 'Status',
			active: true,
			settings: { 'default': setting.id },
			content: '<li></li>' // Shouldn't be required for long.
		}
	} );
	wp.customize.control.add( control.id, control );
} );

wp.customize.bind( 'ready', function() {
	var section = new wp.customize.Section( 'dynamic_special_favorite_items', {
		params: {
			title: 'Special Favorite Items (Dynamic)',
			type: 'special_favorite_items', // For CSS class name.
			priority: 100,
			active: true,
			customizeAction: 'You are customizing:'
		}
	} );
	wp.customize.section.add( section.id, section );
} );
