<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */


/*

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php
		// Post thumbnail.
		brooklyntri_post_thumbnail();
	?>

	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'brooklyntri' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
				'pagelink'    => '<span class="screen-reader-text">' . __( 'Page', 'brooklyntri' ) . ' </span>%',
				'separator'   => '<span class="screen-reader-text">, </span>',
			) );
		?>
	</div><!-- .entry-content -->

	<?php edit_post_link( __( 'Edit', 'brooklyntri' ), '<footer class="entry-footer"><span class="edit-link">', '</span></footer><!-- .entry-footer -->' ); ?>

</article><!-- #post-## -->

*/

btc_breadcrumbs();

?>

				<div id="two-columns">
					<div id="content">
<?
// Start the loop.
while ( have_posts() ) : the_post();

	// Include the page content template.
	get_template_part( 'content', 'plain' ); //content-plain.php

	// If comments are open or we have at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) :
		comments_template();
	endif;

// End the loop.
endwhile;
?>

					</div>
				</div>
