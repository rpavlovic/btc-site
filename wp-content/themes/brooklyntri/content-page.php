<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */


?>

				<div class="contact-form-area">

                    <?php the_title('<h2>','</h2>'); ?>

                    <?php if (strstr($_SERVER['REQUEST_URI'], 'login?login=failed') != false): ?>
                    
                    <p class="message">You fucked up bro</p>

                    <?php endif; ?>

                    <?php the_content(); ?>

                </div>
