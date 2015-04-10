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
					<a href="#" itemprop="url"><img src="images/logo02.png" alt="BTC BROOKLYN TRIATHLON CLUB ESTABLISHED 2004"></a>
				</div>
				<div class="col-holder">
					<div class="col">
						<h2>CONTACT BTC</h2>
						<p>Want to contact BTC with questions? <a href="#">Please click here.</a></p>
						<h2>FOLLOW BTC</h2>
						<ul class="social">
							<li>
								<a class="twitter" href="#"><i class="icon-twitter">&nbsp;</i></a>
								<div class="text">
									<span>6664</span>
									<p>Followers</p>
								</div>
							</li>
							<li>
								<a class="facebook" href="#"><i class="icon-facebook">&nbsp;</i></a>
								<div class="text">
									<span>665</span>
									<p>Likes</p>
								</div>
							</li>
						</ul>
					</div>
					<div class="col">
						<h2>BTC GROUP WORKOUTS</h2>
						<ul class="list">
							<li>
								<h3><a href="#">STRENGTH TRAIN BTC</a></h3>
								<p>Monday Evening Strength Training Coached by <a href="#">Ben Kessel</a></p>
							</li>
							<li>
								<h3><a href="#">RIDE BTC</a></h3>
								<p>Tuesday Morning Rides Coached by <a href="#">David Lipscomb</a></p>
							</li>
							<li>
								<h3><a href="#">RUN BTC</a></h3>
								<p>Wednesday Night Speed Runs Coached by <a href="#">Dave Mendelsohn</a></p>
							</li>
							<li>
								<h3><a href="#">BRICK BTC</a></h3>
								<p>Thursday Morning Bricks Coached by <a href="#">John Stewart</a></p>
							</li>
						</ul>
					</div>
					<div class="col add">
						<h2>MEMBER LOGIN</h2>
						<form action="#" class="login-form">
							<fieldset>
								<legend class="hidden">login form</legend>
								<div class="form-holder">
									<div class="row">
										<label for="name02">USERNAME <span>*</span></label>
										<input type="text" id="name02">
									</div>
									<div class="row">
										<label for="password02">PASSWORD <span>*</span></label>
										<input type="password" id="password02">
									</div>
								</div>
								<input class="button" type="submit" value="LOGIN">
							</fieldset>
						</form>
					</div>
				</div>
			</div>
			<div class="footer-frame">
				<div class="holder">
					<ul class="add-nav">
						<li><a href="#">HOME</a></li>
						<li><a href="#">ABOUT</a></li>
						<li><a href="#">JOIN BTC</a></li>
						<li><a href="#">RESOURCES</a></li>
					</ul>
					<span class="copyright">&copy; <?= date("Y") ?> <a href="#">Brooklyn Tri Club</a>. Some rights reserved. <a href="#" class="policy">Privacy Policy</a></span>
				</div>
			</div>
		</footer>
		<a class="accessibility" href="#wrapper">Back to top</a>
	</div>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script type="text/javascript">window.jQuery || document.write('<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/jquery-1.11.2.min.js"><\/script>')</script>
	<script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/jquery.main.js"></script>

<?php wp_footer(); ?>

</body>
</html>
