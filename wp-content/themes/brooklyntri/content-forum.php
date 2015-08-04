<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

?>
				<section class="intro">
					<?php the_title('<h1>','</h1>'); ?>

					<?= the_content(); ?>
				</section>

			    <div class="post" id="post-<?php the_ID(); ?>">
			        <div class="entry" style="text-align:left !important;">

			        </div>
			    </div>