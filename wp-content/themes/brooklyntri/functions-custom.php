<?php

define('EVENT_FIELD_ID', 7);

/**
 * login capture
 */

function btc_login() {

    // not the login request?
    if( !isset( $_POST['action'] ) || $_POST['action'] !== 'btc_login_jam') {
        return;
    }

    if( isset( $_POST['action'] ) && $_POST['action'] === 'btc_login_jam') {

        global $wpdb;

        //We shall SQL escape all inputs
        $username = esc_sql( $_POST['user'] );
        $password = esc_sql( $_POST['pass'] );
        //$remember = $wpdb->escape($_POST['rememberme']);

        //if($remember) $remember = "true";
        //else $remember = "false";

        $login_data = array();
        $login_data['user_login'] = $username;
        $login_data['user_password'] = $password;
        $login_data['remember'] = false; //$remember;

        $user_verify = wp_signon( $login_data, false ); 

        if ( is_wp_error( $user_verify ) )  {
            // error message
            echo $user_verify->get_error_message();
        }

        // redirect back to the requested page if login was successful
        header('Location: ' . $_SERVER['SCRIPT_NAME']);
        exit;
    }
    else {
        // No login details entered - you should probably add some more user feedback here, but this does the bare minimum
        echo "Invalid login details";
    }
}
add_action( 'after_setup_theme', 'btc_login' );

// lose the admin bar
add_filter('show_admin_bar', '__return_false');

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

/**
 * Convert hard-coded relative links to use absolute URLs
 *
 * @param string $str The string to convert.
 * @return string The converted string.
 */
function btc_relative_links( $str ) {
	if ( strstr( $str, '<a href="/' ) != false ) {
		return str_replace( '<a href="/', '<a href="' . WP_SITEURL . '/', $str );
	}
	if ( substr( $str, 1 ) == '/') {
		return str_replace( '/', WP_SITEURL . '/', $str );
	}
}

/**
 * Return the custom link text for post, if supplied.
 *
 * @param object $post Optional. The current post object.
 * @return string The post title, or custom link text (if supplied).
 */
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

function btc_leftnav( $post=null ) {

	if( is_null( $post ) ) {
		$post = get_post( get_the_ID() );
	}

	$parent = get_post( $post->post_parent );

	$parent_post = $parent->ID;
	if ( is_null( $parent_post ) ) {
		$parent_post = $post->ID;
	}

	$section_pages = get_pages(array(
	    'parent' => $parent_post,
	    'sort_column' => 'post_date',
	    'child_of' => $parent_post,
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
                                    <li<?= $sub_section->ID == $post->ID ? ' class="active"' : '' ?>><a href="<?= esc_url( get_permalink( $sub_section->ID ) ); ?>"><?= esc_html( $link_text ) ?></a></li>
<?
	endforeach;
?>
                                </ul>
                            </div>
                        </nav>
                    </aside>
<?
}

function btc_breadcrumbs() {
	$breadcrumbs  = get_btc_breadcrumbs(array('separator' => '/', 'richsnippet' => false), $return_array = true);

	if ( $breadcrumbs ): ?>
				<section class="page-title">
					<div class="holder">
						<nav class="breadcrumbs-nav">
							<span>You are here:</span>
							<ul class="breadcrumbs">
<?php foreach ( $breadcrumbs as $crumb ): ?>
								<li><?= $crumb ?></li>
<?php endforeach; ?>
							</ul>
						</nav>
						<h1><?php echo get_the_title( get_the_ID(  ) ); ?></h1>
					</div>
				</section>
<?php endif;
}

function btc_get_sponsor_logos() {
	$premium = get_posts( array( 'category' => 2, 'orderby' => 'post_date', 'order' => 'DESC' ) );
	$sponsors = get_posts( array( 'category' => 3, 'orderby' => 'post_date', 'order' => 'DESC' ) );
	$all_sponsors = array_merge($premium, $sponsors);

	if (count($all_sponsors) > 1) {
?>
				<section class="clients-area">
					<div class="holder">
					<h3>Our Sponsors</h3>
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


/*-----------------------------------------------------------------------------------*/
/* get_breadcrumbs() - Custom breadcrumb generator function  */
/*
/* Params:
/*
/* Arguments Array:
/*
/* 'separator' 			- The character to display between the breadcrumbs.
/* 'before' 			- HTML to display before the breadcrumbs.
/* 'after' 				- HTML to display after the breadcrumbs.
/* 'front_page' 		- Include the front page at the beginning of the breadcrumbs.
/* 'show_home' 			- If $show_home is set and we're not on the front page of the site, link to the home page.
/* 'echo' 				- Specify whether or not to echo the breadcrumbs. Alternative is "return".
/* 'show_posts_page'	- If a static front page is set and there is a posts page, toggle whether or not to display that page's tree.
/*
/*-----------------------------------------------------------------------------------*/


/**
 * The code below is an inspired/modified version by woothemes breadcrumb function which in turn is inspired by Justin Tadlock's Hybrid Core :)
 */
function get_btc_breadcrumbs( $args = array(), $return_array = false ) {
	global $wp_query, $wp_rewrite;

	/* Create an empty variable for the breadcrumb. */
	$breadcrumb = '';

	/* Create an empty array for the trail. */
	$trail = array();
	$path = '';

	/* Set up the default arguments for the breadcrumb. */
	$defaults = array(
		'separator' => '&raquo;',
		'before' => '<nav class="breadcrumbs-nav"><ul>' . __( '<span>You are here:</span>', 'avia_framework' ) . '</ul></nav>',
		'after' => false,
		'front_page' => true,
		'show_home' => __( 'Home', 'avia_framework' ),
		'echo' => false,
		'show_posts_page' => true,
		'truncate' => 70,
		'richsnippet' => false
	);

	/* Allow singular post views to have a taxonomy's terms prefixing the trail. */
	if ( is_singular() )
		$defaults["singular_{$wp_query->post->post_type}_taxonomy"] = false;

	/* Apply filters to the arguments. */
	$args = apply_filters( 'get_breadcrumbs_args', $args );

	/* Parse the arguments and extract them for easy variable naming. */
	extract( wp_parse_args( $args, $defaults ) );

	/* If $show_home is set and we're not on the front page of the site, link to the home page. */
	if ( !is_front_page() && $show_home )
		$trail[] = '<a href="' . home_url() . '" title="' . esc_attr( get_bloginfo( 'name' ) ) . '" rel="home" class="trail-begin">' . $show_home . '</a>';

	/* If viewing the front page of the site. */
	if ( is_front_page() ) {
		if ( !$front_page )
			$trail = false;
		elseif ( $show_home )
			$trail['trail_end'] = "{$show_home}";
	}

	/* If viewing the "home"/posts page. */
	elseif ( is_home() ) {
		$home_page = get_page( $wp_query->get_queried_object_id() );
		$trail = array_merge( $trail, get_breadcrumbs_get_parents( $home_page->post_parent, '' ) );
		$trail['trail_end'] = get_the_title( $home_page->ID );
	}

	/* If viewing a singular post (page, attachment, etc.). */
	elseif ( is_singular() ) {

		/* Get singular post variables needed. */
		$post = $wp_query->get_queried_object();
		$post_id = absint( $wp_query->get_queried_object_id() );
		$post_type = $post->post_type;
		$parent = $post->post_parent;


		/* If a custom post type, check if there are any pages in its hierarchy based on the slug. */
		if ( 'page' !== $post_type && 'post' !== $post_type ) {

			$post_type_object = get_post_type_object( $post_type );

			/* If $front has been set, add it to the $path. */
			if ( 'post' == $post_type || 'attachment' == $post_type || ( $post_type_object->rewrite['with_front'] && $wp_rewrite->front ) )
				$path .= trailingslashit( $wp_rewrite->front );

			/* If there's a slug, add it to the $path. */
			if ( !empty( $post_type_object->rewrite['slug'] ) )
				$path .= $post_type_object->rewrite['slug'];

			/* If there's a path, check for parents. */
			if ( !empty( $path ) )
				$trail = array_merge( $trail, get_breadcrumbs_get_parents( '', $path ) );

			/* If there's an archive page, add it to the trail. */
			if ( !empty( $post_type_object->has_archive ) && function_exists( 'get_post_type_archive_link' ) )
				$trail[] = '<a href="' . get_post_type_archive_link( $post_type ) . '" title="' . esc_attr( $post_type_object->labels->name ) . '">' . $post_type_object->labels->name . '</a>';
		}

		/* try to build a generic taxonomy trail no matter the post type and taxonomy and terms
		$currentTax = "";
		foreach(get_taxonomies() as $tax)
		{
			$terms = get_the_term_list( $post_id, $tax, '', '$$$', '' );
			echo"<pre>";
			print_r($tax.$terms);
			echo"</pre>";
		}
		*/

		/* If the post type path returns nothing and there is a parent, get its parents. */
		if ( empty( $path ) && 0 !== $parent || 'attachment' == $post_type )
			$trail = array_merge( $trail, get_breadcrumbs_get_parents( $parent, '' ) );

		/* Toggle the display of the posts page on single blog posts. */
		if ( 'post' == $post_type && $show_posts_page == true && 'page' == get_option( 'show_on_front' ) ) {
			$posts_page = get_option( 'page_for_posts' );
			if ( $posts_page != '' && is_numeric( $posts_page ) ) {
				$trail = array_merge( $trail, get_breadcrumbs_get_parents( $posts_page, '' ) );
			}
		}

        if('post' == $post_type)
        {
                $category = get_the_category();
				
                foreach($category as $cat)
                {
                    if(!empty($cat->parent))
                    {
                        $parents = get_category_parents($cat->cat_ID, TRUE, '$$$', FALSE );
                        $parents = explode("$$$", $parents);
                        foreach ($parents as $parent_item)
                        {
                            if($parent_item) $trail[] = $parent_item;
                        }
                        break;
                    }
                }
                
                if(isset($category[0]) && empty($parents))
                {
                	$trail[] = '<a href="'.get_category_link($category[0]->term_id ).'">'.$category[0]->cat_name.'</a>';
                }
                
        }

		if($post_type == 'portfolio')
		{
			$parents = get_the_term_list( $post_id, 'portfolio_entries', '', '$$$', '' );
			$parents = explode('$$$',$parents);
			foreach ($parents as $parent_item)
			{
				if($parent_item) $trail[] = $parent_item;
			}
		}

		/* Display terms for specific post type taxonomy if requested. */
		if ( isset( $args["singular_{$post_type}_taxonomy"] ) && $terms = get_the_term_list( $post_id, $args["singular_{$post_type}_taxonomy"], '', ', ', '' ) )
			$trail[] = $terms;

		/* End with the post title. */
		$post_title = get_the_title( $post_id ); // Force the post_id to make sure we get the correct page title.
		if ( !empty( $post_title ) )
			$trail['trail_end'] = $post_title;

	}

	/* If we're viewing any type of archive. */
	elseif ( is_archive() ) {

		/* If viewing a taxonomy term archive. */
		if ( is_tax() || is_category() || is_tag() ) {

			/* Get some taxonomy and term variables. */
			$term = $wp_query->get_queried_object();
			$taxonomy = get_taxonomy( $term->taxonomy );

			/* Get the path to the term archive. Use this to determine if a page is present with it. */
			if ( is_category() )
				$path = get_option( 'category_base' );
			elseif ( is_tag() )
				$path = get_option( 'tag_base' );
			else {
				if ( $taxonomy->rewrite['with_front'] && $wp_rewrite->front )
					$path = trailingslashit( $wp_rewrite->front );
				$path .= $taxonomy->rewrite['slug'];
			}

			/* Get parent pages by path if they exist. */
			if ( $path )
				$trail = array_merge( $trail, get_breadcrumbs_get_parents( '', $path ) );

			/* If the taxonomy is hierarchical, list its parent terms. */
			if ( is_taxonomy_hierarchical( $term->taxonomy ) && $term->parent )
				$trail = array_merge( $trail, get_breadcrumbs_get_term_parents( $term->parent, $term->taxonomy ) );

			/* Add the term name to the trail end. */
			$trail['trail_end'] = $term->name;
		}

		/* If viewing a post type archive. */
		elseif ( function_exists( 'is_post_type_archive' ) && is_post_type_archive() ) {

			/* Get the post type object. */
			$post_type_object = get_post_type_object( get_query_var( 'post_type' ) );

			/* If $front has been set, add it to the $path. */
			if ( $post_type_object->rewrite['with_front'] && $wp_rewrite->front )
				$path .= trailingslashit( $wp_rewrite->front );

			/* If there's a slug, add it to the $path. */
			if ( !empty( $post_type_object->rewrite['archive'] ) )
				$path .= $post_type_object->rewrite['archive'];

			/* If there's a path, check for parents. */
			if ( !empty( $path ) )
				$trail = array_merge( $trail, get_breadcrumbs_get_parents( '', $path ) );

			/* Add the post type [plural] name to the trail end. */
			$trail['trail_end'] = $post_type_object->labels->name;
		}

		/* If viewing an author archive. */
		elseif ( is_author() ) {

			/* If $front has been set, add it to $path. */
			if ( !empty( $wp_rewrite->front ) )
				$path .= trailingslashit( $wp_rewrite->front );

			/* If an $author_base exists, add it to $path. */
			if ( !empty( $wp_rewrite->author_base ) )
				$path .= $wp_rewrite->author_base;

			/* If $path exists, check for parent pages. */
			if ( !empty( $path ) )
				$trail = array_merge( $trail, get_breadcrumbs_get_parents( '', $path ) );

			/* Add the author's display name to the trail end. */
			$trail['trail_end'] =  apply_filters('avf_author_name', get_the_author_meta('display_name', get_query_var('author')), get_query_var('author'));
		}

		/* If viewing a time-based archive. */
		elseif ( is_time() ) {

			if ( get_query_var( 'minute' ) && get_query_var( 'hour' ) )
				$trail['trail_end'] = get_the_time( __( 'g:i a', 'avia_framework' ) );

			elseif ( get_query_var( 'minute' ) )
				$trail['trail_end'] = sprintf( __( 'Minute %1$s', 'avia_framework' ), get_the_time( __( 'i', 'avia_framework' ) ) );

			elseif ( get_query_var( 'hour' ) )
				$trail['trail_end'] = get_the_time( __( 'g a', 'avia_framework' ) );
		}

		/* If viewing a date-based archive. */
		elseif ( is_date() ) {

			/* If $front has been set, check for parent pages. */
			if ( $wp_rewrite->front )
				$trail = array_merge( $trail, get_breadcrumbs_get_parents( '', $wp_rewrite->front ) );

			if ( is_day() ) {
				$trail[] = '<a href="' . get_year_link( get_the_time( 'Y' ) ) . '" title="' . get_the_time( esc_attr__( 'Y', 'avia_framework' ) ) . '">' . get_the_time( __( 'Y', 'avia_framework' ) ) . '</a>';
				$trail[] = '<a href="' . get_month_link( get_the_time( 'Y' ), get_the_time( 'm' ) ) . '" title="' . get_the_time( esc_attr__( 'F', 'avia_framework' ) ) . '">' . get_the_time( __( 'F', 'avia_framework' ) ) . '</a>';
				$trail['trail_end'] = get_the_time( __( 'j', 'avia_framework' ) );
			}

			elseif ( get_query_var( 'w' ) ) {
				$trail[] = '<a href="' . get_year_link( get_the_time( 'Y' ) ) . '" title="' . get_the_time( esc_attr__( 'Y', 'avia_framework' ) ) . '">' . get_the_time( __( 'Y', 'avia_framework' ) ) . '</a>';
				$trail['trail_end'] = sprintf( __( 'Week %1$s', 'avia_framework' ), get_the_time( esc_attr__( 'W', 'avia_framework' ) ) );
			}

			elseif ( is_month() ) {
				$trail[] = '<a href="' . get_year_link( get_the_time( 'Y' ) ) . '" title="' . get_the_time( esc_attr__( 'Y', 'avia_framework' ) ) . '">' . get_the_time( __( 'Y', 'avia_framework' ) ) . '</a>';
				$trail['trail_end'] = get_the_time( __( 'F', 'avia_framework' ) );
			}

			elseif ( is_year() ) {
				$trail['trail_end'] = get_the_time( __( 'Y', 'avia_framework' ) );
			}
		}
	}

	/* If viewing search results. */
	elseif ( is_search() )
		$trail['trail_end'] = sprintf( __( 'Search results for &quot;%1$s&quot;', 'avia_framework' ), esc_attr( get_search_query() ) );

	/* If viewing a 404 error page. */
	elseif ( is_404() )
		$trail['trail_end'] = __( '404 Not Found', 'avia_framework' );

	/* Allow child themes/plugins to filter the trail array. */
	$trail = apply_filters( 'get_breadcrumbs_trail', $trail, $args );

	/* Connect the breadcrumb trail if there are items in the trail. */
	if ( is_array( $trail ) ) {

		if ( $return_array == true ) {
			//$trail[0] = strip_tags($trail[0]);
			return $trail;
		}

		$el_tag = "li";
		$vocabulary = "";

		//google rich snippets
		if($richsnippet === true)
		{
			$vocabulary = 'xmlns:v="http://rdf.data-vocabulary.org/#"';
		}

		/* Open the breadcrumb trail containers. */
		$breadcrumb = '';//'<div class="breadcrumb breadcrumbs avia-breadcrumbs"><div class="breadcrumb-trail" '.$vocabulary.'>';

		/* If $before was set, wrap it in a container. */
		if ( !empty( $before ) )
			$breadcrumb .= '<'.$el_tag.' class="trail-before">' . $before . '</'.$el_tag.'> ';

		/* Wrap the $trail['trail_end'] value in a container. */
		if ( !empty( $trail['trail_end'] ) )
		{
			if(!is_search())
			{
				//$trail['trail_end'] =  avia_backend_truncate($trail['trail_end'], $truncate, " ", $pad="...", false, '<strong><em><span>', true);
			}
			$trail['trail_end'] = '<'.$el_tag.' class="trail-end">' . $trail['trail_end'] . '</'.$el_tag.'>';
		}

		if($richsnippet === true)
		{
			foreach($trail as &$link)
			{
				$link = preg_replace('!rel=".+?"|rel=\'.+?\'|!',"", $link);
				$link = str_replace('<a ', '<a rel="v:url" property="v:title" ', $link);
				$link = '<span typeof="v:Breadcrumb">'.$link.'</span>';
			}
		}


		/* Format the separator. */
		if ( !empty( $separator ) )
			$separator = '<span class="sep">' . $separator . '</span>';

		/* Join the individual trail items into a single string. */
		$breadcrumb .= join( " {$separator} ", $trail );

		/* If $after was set, wrap it in a container. */
		if ( !empty( $after ) )
			$breadcrumb .= ' <span class="trail-after">' . $after . '</span>';

		/* Close the breadcrumb trail containers. */
		//$breadcrumb .= '</div></div>';
	}

	/* Allow developers to filter the breadcrumb trail HTML. */
	$breadcrumb = apply_filters( 'get_breadcrumbs', $breadcrumb );

	/* Output the breadcrumb. */
	if ( $echo )
		echo $breadcrumb;
	else
		return $breadcrumb;

} // End get_breadcrumbs()

/*-----------------------------------------------------------------------------------*/
/* get_breadcrumbs_get_parents() - Retrieve the parents of the current page/post */
/*-----------------------------------------------------------------------------------*/
/**
 * Gets parent pages of any post type or taxonomy by the ID or Path.  The goal of this function is to create
 * a clear path back to home given what would normally be a "ghost" directory.  If any page matches the given
 * path, it'll be added.  But, it's also just a way to check for a hierarchy with hierarchical post types.
 *
 * @since 3.7.0
 * @param int $post_id ID of the post whose parents we want.
 * @param string $path Path of a potential parent page.
 * @return array $trail Array of parent page links.
 */
function get_breadcrumbs_get_parents( $post_id = '', $path = '' ) {

	/* Set up an empty trail array. */
	$trail = array();

	/* If neither a post ID nor path set, return an empty array. */
	if ( empty( $post_id ) && empty( $path ) )
		return $trail;

	/* If the post ID is empty, use the path to get the ID. */
	if ( empty( $post_id ) ) {

		/* Get parent post by the path. */
		$parent_page = get_page_by_path( $path );

		/* ********************************************************************
		Modification: The above line won't get the parent page if
		the post type slug or parent page path is not the full path as required
		by get_page_by_path. By using get_page_with_title, the full parent
		trail can be obtained. This may still be buggy for page names that use
		characters or long concatenated names.
		Author: Byron Rode
		Date: 06 June 2011
		******************************************************************* */

		if( empty( $parent_page ) )
		        // search on page name (single word)
			$parent_page = get_page_by_title ( $path );

		if( empty( $parent_page ) )
			// search on page title (multiple words)
			$parent_page = get_page_by_title ( str_replace( array('-', '_'), ' ', $path ) );

		/* End Modification */

		/* If a parent post is found, set the $post_id variable to it. */
		if ( !empty( $parent_page ) )
			$post_id = $parent_page->ID;
	}

	/* If a post ID and path is set, search for a post by the given path. */
	if ( $post_id == 0 && !empty( $path ) ) {

		/* Separate post names into separate paths by '/'. */
		$path = trim( $path, '/' );
		preg_match_all( "/\/.*?\z/", $path, $matches );

		/* If matches are found for the path. */
		if ( isset( $matches ) ) {

			/* Reverse the array of matches to search for posts in the proper order. */
			$matches = array_reverse( $matches );

			/* Loop through each of the path matches. */
			foreach ( $matches as $match ) {

				/* If a match is found. */
				if ( isset( $match[0] ) ) {

					/* Get the parent post by the given path. */
					$path = str_replace( $match[0], '', $path );
					$parent_page = get_page_by_path( trim( $path, '/' ) );

					/* If a parent post is found, set the $post_id and break out of the loop. */
					if ( !empty( $parent_page ) && $parent_page->ID > 0 ) {
						$post_id = $parent_page->ID;
						break;
					}
				}
			}
		}
	}

	/* While there's a post ID, add the post link to the $parents array. */
	while ( $post_id ) {

		/* Get the post by ID. */
		$page = get_page( $post_id );

		/* Add the formatted post link to the array of parents. */
		$parents[]  = '<a href="' . get_permalink( $post_id ) . '" title="' . esc_attr( get_the_title( $post_id ) ) . '">' . get_the_title( $post_id ) . '</a>';

		/* Set the parent post's parent to the post ID. */
		if(is_object($page))
		{
			$post_id = $page->post_parent;
		}
		else
		{
			$post_id = "";
		}
	}

	/* If we have parent posts, reverse the array to put them in the proper order for the trail. */
	if ( isset( $parents ) )
		$trail = array_reverse( $parents );

	/* Return the trail of parent posts. */
	return $trail;

} // End get_breadcrumbs_get_parents()

/*-----------------------------------------------------------------------------------*/
/* get_breadcrumbs_get_term_parents() - Retrieve the parents of the current term */
/*-----------------------------------------------------------------------------------*/
/**
 * Searches for term parents of hierarchical taxonomies.  This function is similar to the WordPress
 * function get_category_parents() but handles any type of taxonomy.
 *
 * @since 3.7.0
 * @param int $parent_id The ID of the first parent.
 * @param object|string $taxonomy The taxonomy of the term whose parents we want.
 * @return array $trail Array of links to parent terms.
 */
function get_breadcrumbs_get_term_parents( $parent_id = '', $taxonomy = '' ) {

	/* Set up some default arrays. */
	$trail = array();
	$parents = array();

	/* If no term parent ID or taxonomy is given, return an empty array. */
	if ( empty( $parent_id ) || empty( $taxonomy ) )
		return $trail;

	/* While there is a parent ID, add the parent term link to the $parents array. */
	while ( $parent_id ) {

		/* Get the parent term. */
		$parent = get_term( $parent_id, $taxonomy );

		/* Add the formatted term link to the array of parent terms. */
		$parents[] = '<a href="' . get_term_link( $parent, $taxonomy ) . '" title="' . esc_attr( $parent->name ) . '">' . $parent->name . '</a>';

		/* Set the parent term's parent as the parent ID. */
		$parent_id = $parent->parent;
	}

	/* If we have parent terms, reverse the array to put them in the proper order for the trail. */
	if ( !empty( $parents ) )
		$trail = array_reverse( $parents );

	/* Return the trail of parent terms. */
	return $trail;

} // End get_breadcrumbs_get_term_parents()


function get_btc_facebook_likes() {
	$likes = flc_update_like_count( 'https://www.facebook.com/BrooklynTriClub' );
	 //cache data
	return $likes;
}


/**
 * Resources
 */

function is_club_race($cats) {
	if (is_array($cats)) {
		foreach ($cats as $cat) {
			$cat = strip_tags($cat);
			if (n_array('Club Race', $cat)) {
				return true;
			}
		}
	}
	return false;
}

function get_btc_participants($form_id, $event_id) {
	$registrants = RGFormsModel::get_leads($form_id, '2', 'ASC');
	$racers = array();
	foreach ($registrants as $racer) {
		if($racer[EVENT_FIELD_ID] == $event_id) {
			$racers[] = $racer['1'] . ' ' .$racer['2'];
		}
	}
	return $racers;
}

function get_btc_registrants( $form_id, $event_id ) {
	if(!is_numeric($form_id)) {
		return null;
	}

	global $wpdb;
	$form_id = (int) $form_id;

	$sql = 'select group_concat(value, " ") as racers from ' . $wpdb->prefix . 'rg_lead_detail where form_id = ' . $form_id . ' and field_number in (1,2) and (select form_id from ' . $wpdb->prefix . 'rg_lead_detail where field_number=' . EVENT_FIELD_ID . ' and value = \'' . $event_id . '\' ) = ' . $form_id;
	$registrants =  $wpdb->get_results($sql, OBJECT);
	if($registrants && is_array($registrants)) {
		return $registrants;
	}
	return null;
}

function count_btc_registrants( $form_id, $event_id) {
	if(!is_numeric($form_id) || !is_numeric($event_id)) {
		return null;
	}

	global $wpdb;
	$form_id = (int) $form_id;
	$event_id = (int) $event_id;

	// I don't like this:
	$sql = 'select count(distinct lead_id) as btcers from ' . $wpdb->prefix . 'rg_lead_detail where field_number=' . EVENT_FIELD_ID . ' and form_id = ' . $form_id . ' and value = \'' . $event_id . '\'';
	$registrants =  $wpdb->get_results($sql, OBJECT);
	if($registrants && is_array($registrants)) {
		return $registrants[0]->btcers;
	}
	return null;
}