<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */
$fields = get_fields( get_the_ID() );

?>


                        <div class="intro-text">

                            <?php the_title('<h2>','</h2>'); ?>

<?php if(has_post_thumbnail()): ?>
							<div class="img-holder">
								<?= get_the_post_thumbnail( $post->ID, 'full' ) ?>
							</div>
<?php endif; ?>
                            <?php the_content(); ?>

<?php if ( is_user_logged_in() ): ?>
							<p>
								<?= $fields['logged_in_text'] ?>
							</p>
<?php else: ?>
							<p>
								<?= $fields['logged_out_text'] ?>
							</p>
<?php endif; ?>

                        </div>
