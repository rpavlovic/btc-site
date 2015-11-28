<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */


?>

				<div class="contact-form-area row">

					<div class="col">
	                    <?php the_title('<h2>','</h2>'); ?>

	                    <?php the_content(); ?>
                    </div>

					<div class="col">
<?php if (strstr($_SERVER['REQUEST_URI'], 'login?login=failed') != false): ?>
	If you are seeing this message, one of three things is happening:
	<ol>
		<li>Either your username or password are incorrect. Try logging in again. If you're having consistent issues, please email <a href="mailto:ITHelp@brooklyntri.org">ITHelp@brooklyntri.org</a> and we'll work to reset your credentials.</li>
		<li>Your membership has expired. You must be a member in active standing to login to the site. <a href="<?= site_url( '/join' ) ?>">Please renew your membership</a>.</li>
		<li>You’ve never been a member at all. Please check out <a href="<?= site_url( '/join' ) ?>">our membership benefits</a> and considering joining the club!</li>
	</ol>
<?php elseif (strstr($_SERVER['REQUEST_URI'], 'login?redirect_to') != false): ?>
	<ol>
		<li>You haven’t logged in. You must be logged in to view this page.</li>
		<li>You logged in, but your membership has expired. You must be a member in active standing to view this page. <a href="<?= site_url( '/join' ) ?>">Please renew your membership</a>.</li>
		<li>You’ve never been a member at all. Please check out <a href="<?= site_url( '/join' ) ?>">our membership benefits</a> and considering joining the club!</li>
	</ol>
<?php endif; ?>

                    </div>
                </div>



<?php if (strstr($_SERVER['REQUEST_URI'], 'login?login=failed') != false): ?>
<script type="text/javascript">
	jQuery( "#theme-my-login" ).prepend( '<p class="message">Looks like either your username or password are incorrect. Try logging in again. If you\'re having consistent issues, please email <a href="mailto:ITHelp@brooklyntri.org">ITHelp@brooklyntri.org</a> and we\'ll work to reset your credentials.</p>' );
</script>
<?php endif; ?>
