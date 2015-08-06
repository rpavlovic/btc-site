<?php
/**
 * Template Name: Forum
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

get_header();

btc_breadcrumbs();

?>

				<div id="two-columns">
					<div id="fullwidth">
<?
// Start the loop.
while ( have_posts() ) : the_post();

	// Include the page content template.
	get_template_part( 'content', 'forum' ); //content-forum.php

	// If comments are open or we have at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) :
		comments_template();
	endif;

// End the loop.
endwhile;
?>
					</div>
					<?php forum_leftnav( ); ?>
				</div>

<?

get_footer();

?>