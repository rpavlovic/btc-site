<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

$fields = get_fields( get_the_ID() );

?>

				<div class="intro-text">

                    <?php the_title('<h2>','</h2>'); ?>

                    <?php the_content(); ?>

					<?php

					if ( !empty( $fields['paypal_form'] ) ):
 
						echo $fields['paypal_form'];

					endif;

					?>

                </div>
