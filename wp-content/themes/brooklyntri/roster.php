<?php
/**
 * Template Name: Race Roster
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

$current_post = $post;

?>

				<div id="two-columns">
					<div id="content">
						<section class="info-holder">


		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			// Include the page content template.
			get_template_part( 'content', 'roster' ); //content-roster.php


		// End the loop.
		endwhile;
		?>

						</section>
					</div>

				</div>

<?php	
	btc_get_sponsor_logos();
	get_footer();
?>
