<?php

namespace Customize_LoopConf_Workshop_Advanced_Examples\Favorite_Items;

class Favorite_Item_Status_Customize_Control extends \WP_Customize_Control {

	public $type = 'favorite_item_status';

	protected function render_content() {}

	protected function content_template() {
		?>
		<span class="customize-control-title">{{ data.label }}</span>
		<div class="customize-control-notifications-container"></div>
		<button type="button" class="button-secondary toggle-trashed">
			<span class="trash"><?php esc_html_e( 'Trash', 'default' ); ?></span>
			<span class="untrash"><?php esc_html_e( 'Untrash', 'default' ); ?></span>
		</button>
		<?php
	}
}

