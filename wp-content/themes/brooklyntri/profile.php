<?php
/**
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

get_header();

btc_breadcrumbs();

//$current_post = $post;

?>
				<div class="contact-form-area">
					<div class="holder">
						<div class="img-holder">
							<img src="images/img14.jpg" alt="image description">
						</div>
						<div class="text">
							<h1>YOUR PROFILE</h1>
							<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae quam eu odio feugiat ullamcorper. Nam aliquam dignissim mattis. Donec scelerisque congue eros id vehicula. Quisque quis lorem in nunc facilisis maximus in a lorem. Suspendisse nec sagittis lacus, sed pharetra neque. Vivamus fringilla ultricies sapien, molestie efficitur erat gravida non.</p>
						</div>
					</div>
					<form action="#" class="contact-form">
						<fieldset>
							<legend class="hidden">contact form</legend>
							<div class="heading"><h2>EDIT YOUR PROFILE</h2></div>
							<div class="row">
								<div class="col">
									<label for="first_name">FIRST NAME <span>*</span></label>
									<input type="text" name="first_name" id="first_name" value="Rahmin">
								</div>
								<div class="col">
									<label for="first_name">FIRST NAME <span>*</span></label>
									<input type="text" name="last_name" id="last_name" value="Rahmin">
								</div>
							</div>
							<div class="row">
								<label for="nickname">NICKNAME <span>*</span></label>
								<input type="text" name="nickname" id="nickname" value="Rahmin">
							</div>
							<div class="row">
								<label for="email">E-MAIL <span>*</span></label>
								<input type="text" name="email" id="email" value="Rahmin">
							</div>
							<div class="row">
								<label for="email">WEBSITE <span>*</span></label>
								<input type="text" name="website" id="website" value="Rahmin">
							</div>
							<input class="button" type="submit" value="SUBMIT">
						</fieldset>
					</form>
				</div>
<?php	
	btc_get_sponsor_logos();
	get_footer();
?>
