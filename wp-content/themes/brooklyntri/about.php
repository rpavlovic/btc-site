<?php
/**
 * Template Name: About
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

get_header(); ?>
				<section class="page-title">
					<div class="holder">
						<nav class="breadcrumbs-nav">
							<span>You are here:</span>
							<ul class="breadcrumbs">
								<li><a href="#">Home</a></li>
								<li class="active">RESOURCES</li>
								<li>MEMBER DISCOUNTS</li>
							</ul>
						</nav>
						<h1>RESOURCES</h1>
					</div>
				</section>
				<div id="two-columns">
					<div id="content">

		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			// Include the page content template.
			get_template_part( 'content', 'about' ); //content-about.php

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		// End the loop.
		endwhile;
		?>
					</div>
					<?php btc_leftnav( get_the_ID() ); ?>
				</div>

<?php	
	btc_get_sponsor_logos();
	get_footer();
?>
