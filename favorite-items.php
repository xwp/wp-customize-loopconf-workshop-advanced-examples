<?php

namespace Customize_LoopConf_Workshop_Advanced_Examples\Favorite_Items;

function customize_register( \WP_Customize_Manager $wp_customize ) {
	require_once __DIR__ . '/class-favorite-item-status-customize-control.php';
	require_once __DIR__ . '/class-favorite-item-status-customize-setting.php';

	$wp_customize->register_control_type(
		__NAMESPACE__ . '\Favorite_Item_Status_Customize_Control'
	);

	$section = new \WP_Customize_Section( $wp_customize, 'static_special_favorite_items', array(
		'title' => 'Special Favorite Items (Static)',
		'priority' => 100,
	) );
	$wp_customize->add_section( $section );

	$customize_id = 'favorite_item[123][status]';
	$setting = new Favorite_Item_Status_Customize_Setting( $wp_customize, $customize_id, array(
		'transport' => 'postMessage',
	) );
	$wp_customize->add_setting( $setting );

	$control = new Favorite_Item_Status_Customize_Control( $wp_customize, $customize_id, array(
		'section' => 'static_special_favorite_items',
		'label' => 'Status',
		'settings' => array(
			'default' => $customize_id,
		),
	) );
	$wp_customize->add_control( $control );
}
add_action( 'customize_register', __NAMESPACE__ . '\customize_register' );

/**
 * Enqueue scripts for the customizer pane/controls/previewer.
 */
function customize_controls_enqueue_scripts() {
	$handle = 'favorite-item-status-setting';
	wp_enqueue_script(
		$handle,
		plugin_dir_url( __FILE__ ) . 'favorite-item-status-setting.js',
		array( 'customize-controls' )
	);

	$handle = 'favorite-item-status-control';
	wp_enqueue_script(
		$handle,
		plugin_dir_url( __FILE__ ) . 'favorite-item-status-control.js',
		array( 'customize-controls' )
	);

	$handle = 'favorite-items';
	wp_enqueue_script(
		$handle,
		plugin_dir_url( __FILE__ ) . 'favorite-items.js',
		array(
			'customize-controls',
			'favorite-item-status-setting',
			'favorite-item-status-control',
		)
	);
}
add_action( 'customize_controls_enqueue_scripts', __NAMESPACE__ . '\customize_controls_enqueue_scripts' );

add_filter( 'customize_dynamic_setting_args', function( $args, $setting_id ) {
	$pattern = '#^favorite_item\[(?P<post_id>\d+)\]\[status\]$#';
	if ( preg_match( $pattern, $setting_id, $matches ) ) {
		$args = array(
			'type' => 'favorite_item_status',
			'post_id' => intval( $matches['post_id'] ),
		);
	}
	return $args;
}, 10, 2 );

add_filter( 'customize_dynamic_setting_class', function( $class, $setting_id, $args ) {
	if ( isset( $args['type'] ) && 'favorite_item_status' === $args['type'] ) {
		$class = __NAMESPACE__ . '\Favorite_Item_Status_Customize_Setting';
	}
	return $class;
}, 10, 3 );
