<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

?>

<?php if(has_post_thumbnail()): ?>
						<div class="img-holder">
							<?= get_the_post_thumbnail( $post->ID, 'full' ) ?>
						</div>
<?php endif; ?>

                        <div class="intro-text">

                            <?php the_title('<h2>','</h2>'); ?>

                            <?php the_content(); ?>

                        </div>
