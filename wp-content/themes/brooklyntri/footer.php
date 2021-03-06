<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "site-content" div and all content after.
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */
?>

			</main>

		</div><!-- .w1 -->

		<footer id="footer" itemscope itemtype="http://schema.org/Organization">
			<div class="footer-holder">
				<div class="logo" itemprop="name">
					<a href="<?= esc_url( site_url( '/mission' ) ); ?>" itemprop="url"><?= wp_get_attachment_image( 9, 'full' ) ?></a>
				</div>
				<div class="col-holder">
					<div class="col">
						<h2>CONTACT BTC</h2>
						<p>Want to contact BTC with questions? <a href="<?= WP_SITEURL . '/contact' ?>">Please click here.</a></p>
						<h2>FOLLOW BTC</h2>
						<ul class="social">
							<li>
								<a class="twitter" href="<?= TWITTER_URL ?>"><i class="icon-twitter">&nbsp;</i></a>
								<div class="text">
									<span><?= get_btc_twitter_followers() ?></span>
									<p>Followers</p>
								</div>
							</li>
							<li>
								<a class="facebook" href="<?= FACEBOOK_URL ?>"><i class="icon-facebook">&nbsp;</i></a>
								<div class="text">
									<span><?= get_scp_counter( 'facebook' ) ?></span>
									<p>Likes</p>
								</div>
							</li>
							<li>
								<a class="strava" href="<?= STRAVA_URL ?>"><i class="icon-strava">&nbsp;</i></a>
								<div class="text">
									<span>Strava</span>
									<p>Club</p>
								</div>
							</li>
						</ul>
					</div>
					<div class="col">
						<h2>BTC GROUP WORKOUTS</h2>
<?php
$workouts = get_fields( 471 );
echo btc_relative_links( $workouts['footer_list'] );
?>
					</div>
<?php if ( !is_user_logged_in() ): ?>
					<div class="col add">
						<h2>MEMBER LOGIN</h2>
						<form action="<?php echo get_permalink(); ?>" method="post" class="login-form">
							<fieldset>
								<legend class="hidden">login form</legend>
								<div class="form-holder">
									<div class="row">
										<label for="name02">USERNAME <span>*</span></label>
										<input type="text" id="name02" name="user">
									</div>
									<div class="row">
										<label for="password02">PASSWORD <span>*</span></label>
										<input type="password" id="password02" name="pass">
									</div>
								</div>
								<input type="hidden" name="testcookie" value="1">
								<input type="hidden" name="action" value="btc_login_jam">
								<input class="button" type="submit" value="LOGIN">
							</fieldset>
						</form>
					</div>
<?php else: ?>
					<div class="col">
						<h2>Upcoming Events</h2>
						<ul class="list">
<?php
$races = tribe_get_events(array('posts_per_page'=>5, 'eventDisplay'=>'future') );
foreach($races as $post): setup_postdata($post);
?>
							<li>
								<h3><a href="<?= get_permalink( $post->ID ) ?>"><?= date("F d, Y, ga", strtotime( $post->EventStartDate ) ) ?></a></h3>
								<p><?= $post->post_title ?></p>
							</li>
<?php endforeach; ?>
						</ul>
<?php if ( count($races) < 3 ): ?>
						<p>
							Stay tuned for upcoming races.
						</p>
<?php endif; ?>
					</div>
<?php endif; ?>
				</div>
			</div>
			<div class="footer-frame">
				<div class="holder">
					<ul class="add-nav">
<?php

wp_nav_menu( array(
	'menu' => 'footer',
	'container' => false
));
?>
					</ul>
					<span class="copyright">&copy; <?= date("Y") ?> <a href="<?= esc_url( home_url( '/' ) ); ?>">Brooklyn Tri Club</a>. Some rights reserved. <a href="<?= get_permalink( 457 ) ?>" class="policy">Privacy Policy</a></span>
				</div>
			</div>
		</footer>
		<a class="accessibility" href="#wrapper">Back to top</a>
	</div>
	<script type="text/javascript">window.jQuery || document.write('<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/jquery-1.11.3.min.js"><\/script>')</script>
	<script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/jquery.main.js"></script>

<?php wp_footer(); ?>

</body>
</html>
