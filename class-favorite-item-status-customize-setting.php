<?php

namespace Customize_LoopConf_Workshop_Advanced_Examples\Favorite_Items;

class Favorite_Item_Status_Customize_Setting extends \WP_Customize_Setting {
	public $type = 'favorite_item_status';
	public $post_id;
	public $default = 'publish';

	public function value() {
		$status = get_post_status( $this->post_id );
		if ( ! $status ) {
			$status = $this->default;
		}
		return $status;
	}
	protected function update( $value ) {
		return wp_update_post( wp_slash( array(
			'ID' => $this->post_id,
			'post_status' => $value,
		) ) );
	}
	public function preview() {
		if ( ! $this->is_previewed ) {
			add_filter( 'get_post_status', function( $status, $post ) {
				if ( $post->ID === $this->post_id ) {
					$status = $this->post_value( $status );
				}
				return $status;
			}, 10, 2 );
			$this->is_previewed = true;
		}
	}
	public function sanitize( $value ) {
		if ( 'publish' !== $value && 'trash' !== $value ) {
			return new \WP_Error( 'invalid_status', __( 'Invalid Status' ) );
		}
		return parent::sanitize( $value );
	}
}
