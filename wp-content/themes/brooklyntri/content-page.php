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

                    <?php
var_dump($_SERVER['REQUEST_URI']);
var_dump($_SERVER['SCRIPT_NAME']);
var_dump($_SERVER['QUERY_STRING']);

                    ?>

                    <?php the_content(); ?>

                </div>
