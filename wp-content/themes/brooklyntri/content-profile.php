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

					<form action="<?php the_permalink(); ?>" class="contact-form" method="post" enctype="multipart/form-data">
						<input type="hidden" name="action" value="update">
						<input type="hidden" name="user_id" value="<?= sanitize_text_field( $current_user->ID ) ?>">
						<input type="hidden" name="redirect_to" value="<?php echo $_SERVER['REQUEST_URI']; ?>">
						<input type="hidden" name="checkuser_id" value="<?= sanitize_text_field( $current_user->ID ) ?>">
						<fieldset>
							<legend class="hidden">contact form</legend>
							<div class="heading"><h2>EDIT YOUR PROFILE</h2></div>
<?php
global $simple_local_avatars;
$simple_local_avatars->btc_edit_user_avatar( $current_user );
?>

							<div class="row">
								<div class="col">
									<label for="first_name">FIRST NAME </label>
									<input type="text" name="first_name" id="first_name" value="<?= sanitize_text_field( $current_user->first_name ) ?>">
								</div>
								<div class="col">
									<label for="first_name">LAST NAME </label>
									<input type="text" name="last_name" id="last_name" value="<?= sanitize_text_field( $current_user->last_name ) ?>">
								</div>
							</div>
							<div class="row">
								<label for="nickname">NICKNAME <span>*</span></label>
								<input type="text" name="nickname" id="nickname" value="<?= sanitize_text_field( $current_user->nickname ) ?>">
							</div>
							<div class="row">
								<label for="email">E-MAIL <span>*</span></label>
								<input type="text" name="email" id="email" value="<?= sanitize_text_field( $current_user->user_email ) ?>">
							</div>
							<div class="row">
								<input type="radio" name="display_email" value="true"<?= $current_user->display_email == 'true' ? ' checked="checked"' : '' ?>>
								<input type="radio" name="display_email" value="false"<?= $current_user->display_email == 'false' ? ' checked="checked"' : '' ?>>
							</div>

							<div class="heading"><h2>ADDITIONAL INFO</h2></div>
							<div class="row">
								<label for="url">WEBSITE </label>
								<input type="text" type="url" name="url" id="url" value="<?= sanitize_text_field( $current_user->user_url ) ?>">
							</div>
							<div class="row">
								<label for="url">FACEBOOK </label>
								<input type="text" type="url" name="facebook" id="facebook" value="<?= sanitize_text_field( get_the_author_meta( 'facebook', $current_user->ID ) ) ?>">
							</div>
							<div class="row">
								<label for="url">TWITTER </label>
								<input type="text" type="url" name="twitter" id="twitter" value="<?= sanitize_text_field( get_the_author_meta( 'twitter', $current_user->ID ) ) ?>">
							</div>
							<div class="row">
								<label for="url">INSTAGRAM </label>
								<input type="text" type="url" name="instagram" id="instagram" value="<?= sanitize_text_field( get_the_author_meta( 'instagram', $current_user->ID ) ) ?>">
							</div>
							<div class="row">
								<label for="description">Biographical Info</label>
								<textarea name="description" id="description" rows="5" cols="30"><?= sanitize_text_field( $current_user->description ) ?></textarea>
								<p class="description">Share a little biographical information to fill out your profile. This may be shown publicly.</p>
							</div>
							<div class="row">
								<label for="pass1">PASSWORD</label>
								<input type="text" type="password" name="pass1" id="pass1" value="" autocomplete="off">
								<p class="description">If you would like to change the password type a new one. Otherwise leave this blank.</p>
							</div>
							<div class="row">
								<label for="pass2">PASSWORD AGAIN</label>
								<input type="text" type="password" name="pass2" id="pass2" value="" autocomplete="off">
								<p class="description">Type your new password again.</p>
							</div>
							<input class="button" type="submit" value="SUBMIT">
						</fieldset>
					</form>
