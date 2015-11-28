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

                    </div>
                </div>

<?php if (strstr($_SERVER['REQUEST_URI'], 'login?login=failed') != false): ?>

<?php endif; ?>

<?php if (strstr($_SERVER['REQUEST_URI'], 'login?login=failed') != false): ?>
<script type="text/javascript">
	jQuery( "#theme-my-login" ).prepend( '<p class="message">Looks like either your username or password are incorrect. Try logging in again. If you\'re having consistent issues, please email <a href="mailto:ITHelp@brooklyntri.org">ITHelp@brooklyntri.org</a> and we\'ll work to reset your credentials.</p>' );
</script>
<?php endif; ?>
