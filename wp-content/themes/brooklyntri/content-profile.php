<?php
/**
 * The template used for displaying profile content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */


?>

					<div class="holder">
						<div class="text">

		                    <?php the_title('<h2>','</h2>'); ?>

		                    <?php the_content(); ?>

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
