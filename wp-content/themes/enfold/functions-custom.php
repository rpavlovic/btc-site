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
                                <a class="btn-link" href="<?= esc_url( get_permalink( $parent->ID ) ); ?>"><?= esc_html( $parent->post_title; } ?></a>
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