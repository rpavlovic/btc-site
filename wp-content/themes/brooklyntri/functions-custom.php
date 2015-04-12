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
	if (strstr($str, '<a href="/') != false) {
		return str_replace('<a href="/', '<a href="' . WP_SITEURL . '/', $str);
	}
	if (substr($str, 1) == '/') {
		return str_replace('/', WP_SITEURL . '/', $str);
	}
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

/**
 * Class to cache and retrieve cached data
 *
 * @since Brooklyn Tri 1.0
 *
 */
class Cacher {
	private $expiration = 360;

	/**
	 * Retrieve cache ID
	 *
	 * @since Brooklyn Tri 1.0
	 *
	 * @param int $id Optional. The (unique) ID of object to cache.
	 * @return int The cache ID.
	 */
	public function get_cache_id($id=null) {
		if(is_null($id) || empty($id)) {
			$id = get_the_ID();
		}
		$id = esc_attribute( str_replace(array(':','/'),'-',$id) );
		$id = substr( $id, 0, 45 );

		return $id;
	}

	/**
	 * Retrieve cached data
	 *
	 * @since Brooklyn Tri 1.0
	 *
	 * @param int $id Optional. The (unique) ID of object to cache.
	 * @return mixed The cached data (string) or false (boolean).
	 */
	public function get_cache($id=null) {
		$id = $this->get_cache_id($id);
		return get_transient( $id );
	}

	/**
	 * Save cached data
	 *
	 * @since Brooklyn Tri 1.0
	 *
	 * @param string $value Data to cache.
	 * @param int $id Optional. The (unique) ID of object to cache.
	 */
	public function set_cache($value, $id=null) {
		$id = $this->get_cache_id($id);
		set_transient( $id, $value, $this->expiration );
	}
}

/**
 * Get number of Facebook shares
 *
 * @since Brooklyn Tri 1.0
 *
 * @param int $id ID of URL to retrieve data for.
 * @return int The number of Facebook shares.
 */
function get_facebook_shares($id='') {
	if(empty($id)) {
		$id = get_the_ID();
	}
	$url = get_permalink($id); 

	$fb_share_count = 0;
	$cache = new Cacher();
	$is_cached = $cache->get_cache('facebook' . $id);

	if($is_cached === false) {
		//$fb_url = 'https://graph.facebook.com/fql?q=SELECT url, normalized_url, share_count, like_count, comment_count, total_count,commentsbox_count, comments_fbid, click_count FROM link_stat WHERE url=\'' . esc_url_raw(get_permalink()) . '\'';
		$fb_url = 'https://api.facebook.com/method/links.getStats?urls=' . esc_url_raw( $url ) . '&format=json';
		$fb_response = wp_remote_retrieve_body(wp_remote_get($fb_url, array('sslverify'=>false)));
		if(!is_wp_error($fb_response)) {
			$fb_response = json_decode($fb_response);
			$fb_share_count = $fb_response[0]->total_count;
			$cache->set_cache($fb_share_count, 'facebook' . $id);
		}
	}
	else {
		$fb_share_count = $is_cached;
	}
	return $fb_share_count;
}


/**
 * Get number of Twitter shares
 *
 * @since Brooklyn Tri 1.0
 *
 * @param int $id ID of URL to retrieve data for.
 * @return int The number of Twitter shares.
 */
function get_twitter_shares($id='') {
	if(empty($id)) {
		$id = get_the_ID();
	}
	$url = get_permalink($id); 

	$tw_share_count = 0;
	$cache = new Cacher();
	$is_cached = $cache->get_cache('twitter' . $id);

	if($is_cached === false) {
		$tw_url = 'http://urls.api.twitter.com/1/urls/count.json?url=' . esc_url_raw( $url ) . '&callback=twttr.receiveCount';
		$tw_response = wp_remote_retrieve_body(wp_remote_get($tw_url, array('sslverify'=>false)));

		// HACK!
		$tw_response = str_replace('/**/twttr.receiveCount(', '', $tw_response);
		$tw_response = str_replace(');', '', $tw_response);
		if(!is_wp_error($tw_response)) {
			$tw_response = json_decode($tw_response);
			$tw_share_count = $tw_response->count;
			$cache->set_cache($tw_share_count, 'twitter' . $id);
		}
	}
	else {
		$tw_share_count = $is_cached;
	}
	return $tw_share_count;
}


function get_slideshow() {
	global $wpdb;
	$sql = 'select * from ' . $wpdb->postmeta . ' where meta_key = \'slides\' limit 1';
	$slides =  $wpdb->get_results($sql, OBJECT);
	if($slides && isset($slides[0])) {
		return unserialize($slides[0]->meta_value);
	}
	return null;
}
