<?php
/**
 * The template used for displaying profile content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */


global $current_user;

get_currentuserinfo();

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
									<input type="text" name="first_name" id="first_name" value="<?= sanitize_text_field( $current_user->first_name ) ?>">
								</div>
								<div class="col">
									<label for="first_name">FIRST NAME <span>*</span></label>
									<input type="text" name="last_name" id="last_name" value="<?= sanitize_text_field( $current_user->last_name ) ?>">
								</div>
							</div>
							<div class="row">
								<label for="nickname">NICKNAME <span>*</span></label>
								<input type="text" name="nickname" id="nickname" value="<?= sanitize_text_field( $current_user->nickname ) ?>">
							</div>
							<div class="row">
								<label for="email">E-MAIL <span>*</span></label>
								<input type="text" name="email" id="email" value="<?= sanitize_text_field( $current_user->email ) ?>">
							</div>
							<div class="row">
								<label for="email">WEBSITE <span>*</span></label>
								<input type="text" name="website" id="website" value="<?= sanitize_text_field( $current_user->website ) ?>">
							</div>
							<input class="button" type="submit" value="SUBMIT">
						</fieldset>
					</form>
