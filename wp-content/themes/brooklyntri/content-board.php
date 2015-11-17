<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

$shown = array();
$categories = array(
	30 => 'club-president',
	31 => 'vice-president',
	32 => 'treasurer',
	33 => 'secretary',
	6 => 'board-member',
);

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
foreach ($categories as $cat => $slug):

    $board = get_posts(
    		array(
    			'category' => $cat,
    			'post_type' => 'post',
				'post_status' => 'publish',
				'posts_per_page' => -1,
    			'orderby' => 'title',
    			'order' => 'ASC'
    		)
    	);

    foreach ( $board as $member ): setup_postdata( $member );
		$image = wp_get_attachment_url( get_post_thumbnail_id( $member->ID ) );
        $content = get_fields( $member->ID );

        if ( !in_array($member->ID, $shown) ):
        	$shown[] = $member->ID;
?>
								<article class="info" itemscope itemtype="http://schema.org/Person">
									<div class="photo">
									<?php if ( !empty( $feat_image ) ): ?>
										<img src="<?= $image ?>" itemprop="image" alt="<?= esc_attr( $member->post_title ) ?>">
									<?php endif; ?>

<?php
	if ( !empty($content['linkedin']) || !empty($content['facebook'])):
?>
										<div class="caption">
											<ul class="social">
												<? if ( !empty($content['linkedin']) ): ?>
												<li>
													<i class="icon-linkedin"></i>
													<a href="<?= esc_url( $content['linkedin'] ) ?>"><span class="link-hover"><?= esc_html( $member->post_title ) ?> on LinkedIn</span></a>
												</li>
												<? endif; ?>

												<? if ( !empty($content['facebook']) ): ?>
												<li>
													<i class="icon-facebook-squared"></i>
													<a href="<?= esc_url( $content['facebook'] ) ?>"><span class="link-hover"><?= esc_html( $member->post_title ) ?> on Facebook</span></a>
												</li>
												<? endif; ?>

											</ul>
										</div>
<?php
	endif;
?>

									</div>
									<h3><span itemprop="name"><?= esc_html( $member->post_title ) ?></span></h3>
									<span class="designation" itemprop="jobTitle"><?= esc_html( $content['job_title'] ) ?></span>
									<p><?= esc_html( $member->post_content ) ?></p>
								</article>
<?php
		endif;
	endforeach;
	wp_reset_postdata();
endforeach;
?>
							</div>
                        </div>


