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
						<div class="visual">
							<?= get_the_post_thumbnail( $post->ID, 'full' ) ?>
						</div>
<?php endif; ?>
						<div class="person-info-area">
							<div class="text">

								<?php the_title('<h2>','</h2>'); ?>

                            	<?php the_content(); ?>

							</div>
							<div class="holder">
<?php
    $board = get_posts( array( 'category__in' => array( 3, 6, 30, 31, 32, 33 ), 'orderby' => 'post_date', 'order' => 'DESC' ) );
	//$board = new WP_Query( 'cat=3,6,30,31,32,33' );

    foreach ( $board as $member ): setup_postdata( $member );
		$image = wp_get_attachment_url( get_post_thumbnail_id( $member->ID ) );
        $content = get_fields( $member->ID );
?>
								<article class="info" itemscope itemtype="http://schema.org/Person">
									<div class="photo">
									<?php if ( !empty( $feat_image ) ): ?>
										<img src="<?= $image ?>" itemprop="image" alt="<?= $member->post_title ?>">
									<?php endif; ?>

<?php
	if ( !empty($content['linkedin']) || !empty($content['facebook'])):
?>
										<div class="caption">
											<ul class="social">
												<? if ( !empty($content['linkedin']) ): ?>
												<li>
													<i class="icon-linkedin"></i>
													<a href="<?= $content['linkedin'] ?>"><span class="link-hover"><?= $member->post_title ?> on LinkedIn</span></a>
												</li>
												<? endif; ?>

												<? if ( !empty($content['facebook']) ): ?>
												<li>
													<i class="icon-facebook-squared"></i>
													<a href="<?= $content['facebook'] ?>"><span class="link-hover"><?= $member->post_title ?> on Facebook</span></a>
												</li>
												<? endif; ?>

											</ul>
										</div>
<?php
	endif;
?>

									</div>
									<h3><a href="#" itemprop="name"><?= $member->post_title ?></a></h3>
									<span class="designation" itemprop="jobTitle"><?= $content['job_title'] ?></span>
									<p><?= $member->post_content ?></p>
								</article>
<?php
	endforeach;
	wp_reset_postdata();
?>
							</div>
                        </div>


