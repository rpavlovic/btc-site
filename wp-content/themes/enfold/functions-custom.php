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
		$link_text = $sub_section->post_title;

		// overwrite page title with custom link text
		$fields = get_fields( $sub_section->ID );
		if ( !empty( $fields['link_text'] ) ) {
			$link_text = $fields['link_text'];
		}
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


function btc_relative_links($str) {
	return str_replace('<a href="/', '<a href="' . WP_SITEURL . '/', $str);
}

function get_sponsor_logos() {
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
		$feat_image = wp_get_attachment_url( get_post_thumbnail_id( $post->ID) );

?>
							<li><a href="<? the_permalink(); ?>"><?= $feat_image ?></a></li>
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