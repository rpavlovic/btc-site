<?php
/**
 * The template for displaying link post formats
 *
 * Used for both single and index/archive/search.
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */
?>
<!-- content-link -->
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php brooklyntri_post_thumbnail(); ?>

	<header class="entry-header">
		<?php
			if ( is_single() ) :
				the_title( sprintf( '<h1 class="entry-title"><a href="%s">', esc_url( brooklyntri_get_link_url() ) ), '</a></h1>' );
			else :
				the_title( sprintf( '<h2 class="entry-title"><a href="%s">', esc_url( brooklyntri_get_link_url() ) ), '</a></h2>' );
			endif;
		?>
	</header>
	<!-- .entry-header -->

	<div class="entry-content">
		<?php
			/* translators: %s: Name of current post */
			the_content( sprintf(
				__( 'Continue reading %s', 'brooklyntri' ),
				the_title( '<span class="screen-reader-text">', '</span>', false )
			) );

			wp_link_pages( array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'brooklyntri' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
				'pagelink'    => '<span class="screen-reader-text">' . __( 'Page', 'brooklyntri' ) . ' </span>%',
				'separator'   => '<span class="screen-reader-text">, </span>',
			) );
		?>
	</div>
	<!-- .entry-content -->

	<?php
		// Author bio.
		if ( is_single() && get_the_author_meta( 'description' ) ) :
			get_template_part( 'author-bio' );
		endif;
	?>

	<footer class="entry-footer">
		<?php brooklyntri_entry_meta(); ?>
		<?php edit_post_link( __( 'Edit', 'brooklyntri' ), '<span class="edit-link">', '</span>' ); ?>
	</footer>
	<!-- .entry-footer -->

</article><!-- #post-## -->
