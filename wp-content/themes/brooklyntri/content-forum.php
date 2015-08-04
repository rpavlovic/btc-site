<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

?>


			    <div class="post" id="post-<?php the_ID(); ?>">
			        <div class="entry">

					<?php the_title('<h1>','</h1>'); ?>

					<?= the_content(); ?>

			        </div>
			    </div>