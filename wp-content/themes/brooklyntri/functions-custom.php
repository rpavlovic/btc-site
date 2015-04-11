<?php

/**
 * Convert new lines to paragraph tag
 *
 * @param string $str String to escape.
 * @param string $line_breaks Optional. Specifies if line breaks should be preserved.
 * @param string $xml Optional. Specifies if string should adhere to XML spec.
 * @return string The escaped string.
 */
function nl2p($string, $line_breaks = false, $xml = true) {

	$string = str_replace(array('<p>', '</p>', '<br>', '<br />', '<br/>'), '', $string);

	// Conceivable that people will want single line-breaks
	// without breaking into a new paragraph.
	if ($line_breaks == true) {
	    $string = '<p>'.preg_replace(array("/([\n]{2,})/i", "/([^>])\n([^<])/i"), array("</p>\n<p>", '$1<br'.($xml == true ? ' /' : '').'>$2'), trim($string)).'</p>';
	}
	else {
	    $string = '<p>'.preg_replace(
		    array("/([\n]{2,})/i", "/([\r\n]{3,})/i","/([^>])\n([^<])/i"),
		    array("</p>\n<p>", "</p>\n<p>", '$1<br'.($xml == true ? ' /' : '').'>$2'), trim($string)).'</p>';

		$string = str_replace(array('<br>', '<br />', '<br/>'), '', $string);
	}
	return $string;
}

function btc_relative_links($str) {
	return str_replace('<a href="/', '<a href="' . WP_SITEURL . '/', $str);
}

function get_link_text( $post=null ) {
	if( is_null( $post ) ) {
		$post = get_post( get_the_ID() );
	}

	$link_text = $post->post_title;

	// overwrite page title with custom link text
	$custom = get_fields( $post->ID );
	if ( !empty( $custom['link_text'] ) ) {
		$link_text = $custom['link_text'];
	}

	return $link_text;
}

function btc_leftnav($post=null) {

	if(is_null($post)) {
		$post = get_post( get_the_ID() );
	}

	$parent = get_post( $post->post_parent );

	$section_pages = get_pages(array(
	    'parent' => $parent->ID,
	    'sort_column' => 'post_date',
	    'child_of' => $parent->ID,
	    'sort_order' => 'ASC',
	));

?>
                    <aside id="sidebar">
                        <a href="#" class="opener"><span>Menu</span></a>
                        <nav class="aside-nav">
                            <div class="drop">
                                <a class="btn-link" href="<?= esc_url( get_permalink( $parent->ID ) ); ?>"><?= esc_html( $parent->post_title ) ?></a>
                                <ul>
<?
	foreach ( $section_pages as $sub_section ):
		$link_text = get_link_text( $sub_section );
?>
                                    <li<?= $sub_section->ID == get_the_ID() ? ' class="active"' : '' ?>><a href="<?= esc_url( get_permalink( $sub_section->ID ) ); ?>"><?= esc_html( $link_text ) ?></a></li>
<?
	endforeach;
?>
                                </ul>
                            </div>
                        </nav>
                    </aside>
<?
}

function btc_get_sponsor_logos() {
	$premium = get_posts( array( 'category' => 2, 'orderby' => 'post_date', 'order' => 'DESC' ) );
	$sponsors = get_posts( array( 'category' => 3, 'orderby' => 'post_date', 'order' => 'DESC' ) );
	$all_sponsors = array_merge($premium, $sponsors);

	if (count($all_sponsors) > 1) {
?>
				<section class="clients-area">
					<div class="holder">
					<h1>our sponsors</h1>
						<ul class="clients-logo">
<?
	foreach ( $all_sponsors as $post ): setup_postdata( $post );
		$feat_image = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );

?>
							<li><a href="<?= WP_SITEURL ?>/resources/member-discounts-members-only/"><img src="<?= $feat_image ?>" alt="<?= esc_html( $post->post_title ) ?>" title="<?= esc_html( $post->post_title ) ?>"></a></li>
<?

	endforeach;
	wp_reset_postdata();
?>
						</ul>
					</div>
				</section>
<?

	} // if sponsors
}

function register_btc_menu() {
  register_nav_menu('header-menu',__( 'Main Navbar' ));

}
add_action( 'init', 'register_btc_menu' );

/**
 * Return a menu based on slug name.
 *
 * @return menu object.
 */
function get_btc_main_menu() {
    $menu_name = 'header-menu';

    if ( ( $locations = get_nav_menu_locations(  ) ) && isset( $locations[ $menu_name ] ) ) {
		$menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
		$menu_items = wp_get_nav_menu_items($menu->term_id, array('output' => ARRAY_A ));

		return $menu_items;
	}
	return null;
}

/**
 * Return all parent menu items in menu
 *
 * @param object $menu Required. The WP menu to traverse.
 * @return object $items The top level menu items in menu.
 */
function get_btc_parent_menu_items($menu) {
	$items = array();
	foreach ( $menu as $key=>$item ) {
		if ( $item->menu_item_parent == 0 ) {
			$items[] = $item;
		}
	}
	return $items;
}

/**
 * Return all child menu items of menu item
 *
 * @param object $menu Required. The WP menu to traverse.
 * @param int $id Required. The id of the parent menu whose children you want to kidnap.
 * @return object $items The all child menu items belonging to parent menu item.
 */
function get_btc_child_menu_items($menu, $id) {
	$items = array();
	foreach ( $menu as $key=>$item ) {
		if ( $item->menu_item_parent == $id ) {
			$items[] = $item;
		}
	}
	return $items;
}

/**
 * Returns a CSS friendly string.
 *
 * @param string $str Required. The string to escape.
 * @return string $str The css friendly string.
 */
function esc_css( $str ) {
	$str = strtolower( str_replace( ' ', '-', $str ) );
	$str = strtolower( str_replace( '&', '', $str ) );
	return $str;
}
