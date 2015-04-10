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

get_header(); ?>

				<div class="cycle-gallery">
					<div class="mask">
						<div class="slideset">
							<section class="slide right">
								<div class="slide-holder">
									<img src="images/img09.jpg" alt="image description">
									<div class="caption">
										<div class="caption-holder">
											<div class="logo">
												<a href="#"><img src="images/logo02.png" alt="BTC BROOKLYN TRIATHLON CLUB ESTABLISHED 2004"></a>
											</div>
											<h1>NEED A PLACE TO SWIM?</h1>
											<span><a href="#">Click here to check out our list of Brooklyn pools </a></span>
										</div>
									</div>
								</div>
							</section>
							<section class="slide">
								<div class="slide-holder">
									<img src="images/img10.jpg" alt="image description">
									<div class="caption">
										<div class="caption-holder">
											<div class="logo">
												<a href="#"><img src="images/logo02.png" alt="BTC BROOKLYN TRIATHLON CLUB ESTABLISHED 2004"></a>
											</div>
											<h1>RACE WITH BTC</h1>
											<span>Members enjoy discounts and more. <a href="#">Click here to learn more.</a></span>
										</div>
									</div>
								</div>
							</section>
							<section class="slide">
								<div class="slide-holder">
									<img src="images/img11.jpg" alt="image description">
									<div class="caption">
										<div class="caption-holder">
											<div class="logo">
												<a href="#"><img src="images/logo02.png" alt="BTC BROOKLYN TRIATHLON CLUB ESTABLISHED 2004"></a>
											</div>
											<h1>26.2 IS BTC‘S IDEA OF FUN.</h1>
											<span>We like to think so. <a href="#">Click here to find out what makes BTC tick.</a></span>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
					<a class="btn-prev" href="#"><i class="icon-left-open-big">&nbsp;</i></a>
					<a class="btn-next" href="#"><i class="icon-right-open-big">&nbsp;</i></a>
					<div class="pagination">
						<!-- pagination generated here -->
					</div>
				</div>

		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			// Include the page content template.
			get_template_part( 'content', 'homepage' ); //content-homepage.php

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		// End the loop.
		endwhile;
		?>

<?php get_footer(); ?>
