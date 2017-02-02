<?php
/**
 * Plugin Name: Customize LoopConf Workshop Advanced Examples
 * Description: Examples and a skeleton for hacking and creating new examples.
 * Plugin URI:  https://github.com/xwp/wp-customize-loopconf-workshop-advanced-examples
 * Author:      Weston Ruter, XWP
 * Author URI:  https://make.xwp.co/
 * Text Domain: customize-loopconf-workshop-advanced-examples
 * Domain Path: /languages
 * Version:     0.1.0
 *
 * @package Customize_Featured_Content_Demo
 */

/*
 * Copyright (c) 2017 XWP (https://xwp.co/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 */

namespace Customize_LoopConf_Workshop_Advanced_Examples;

/**
 * Enqueue scripts for the customizer pane/controls/previewer.
 */
function customize_controls_enqueue_scripts() {
	$handle = 'customize-loopconf-workshop-advanced-examples-pane';
	wp_enqueue_script(
		$handle,
		plugin_dir_url( __FILE__ ) . 'pane.js',
		array( 'customize-controls' )
	);
}
add_action( 'customize_controls_enqueue_scripts', __NAMESPACE__ . '\customize_controls_enqueue_scripts' );

/**
 * Handle initialization of customizer preview.
 */
function customize_preview_init() {
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\wp_enqueue_scripts' );
}
add_action( 'customize_preview_init', __NAMESPACE__ . '\customize_preview_init' );

/**
 * Enqueue scripts for the customizer preview.
 */
function wp_enqueue_scripts() {
	$handle = 'customize-loopconf-workshop-advanced-examples-preview';
	wp_enqueue_script(
		$handle,
		plugin_dir_url( __FILE__ ) . 'preview.js',
		array( 'customize-preview' )
	);
}
