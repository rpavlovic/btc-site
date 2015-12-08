<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */


if ( isset( $_GET['key'] ) && isset( $_GET['action'] ) && isset( $_GET['login'] ) && $_GET['action'] == 'rp' ) {
	wp_redirect( '/wp-login.php?' . $_SERVER['QUERY_STRING'] );
	exit;
}

get_header();

btc_breadcrumbs();


?>

				<div id="two-columns">
					<div id="content">
<?
// Start the loop.
while ( have_posts() ) : the_post();

	// Include the page content template.
	get_template_part( 'content', 'page' ); //content-page.php

	// If comments are open or we have at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) :
		comments_template();
	endif;

// End the loop.
endwhile;
?>

					</div>
					<aside id="sidebar">
						<div class="img-holder">
							<?= get_the_post_thumbnail( 15, 'full' ) ?>
						</div>
					</aside>
				</div>

<?php	
	btc_get_sponsor_logos();
	get_footer();
?>