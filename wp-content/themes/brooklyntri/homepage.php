<?php
/**
 * Template Name: Homepage
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

$slides = get_slideshow();

if ( !empty( $slides ) ):
?>
				<div class="cycle-gallery">
					<div class="mask">
						<div class="slideset">

<? for ($i=1; $i <= count($slides); $i++): ?>

							<section class="slide right">
								<div class="slide-holder">
									<?= wp_get_attachment_image( $slides[$i]['postId'], 'full' ); ?>
									<div class="caption">
										<div class="caption-holder">
											<div class="logo">
												<a href="<?= btc_relative_links( $slides[$i]['url'] ) ?>"><img src="images/logo02.png" alt="BTC BROOKLYN TRIATHLON CLUB ESTABLISHED 2004"></a>
											</div>
											<h1><?= esc_html( $slides[$i]['title'] ) ?></h1>
											<span><a href="<?= btc_relative_links( $slides[$i]['url'] ) ?>"><?= esc_html( $slides[$i]['description'] ) ?></a></span>
										</div>
									</div>
								</div>
							</section>
<?php endfor; ?>

						</div>
					</div>
					<a class="btn-prev" href="#"><i class="icon-left-open-big">&nbsp;</i></a>
					<a class="btn-next" href="#"><i class="icon-right-open-big">&nbsp;</i></a>
					<div class="pagination">
						<!-- pagination generated here -->
					</div>
				</div>
		<?
			endif;
		?>

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
