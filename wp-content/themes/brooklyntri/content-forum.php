<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

?>
				<section class="forum-area">
					<header>
						<?php the_title('<h1>','</h1>'); ?>
						<?= the_content(); ?>
					</header>

					<div class="divider">
						<div class="holder"></div>
					</div>

					<form action="#" class="search-form">
						<fieldset>
							<legend class="hidden">search form</legend>
							<input class="button" type="submit" value="SEARCH">
							<div class="input-holder">
								<label for="search" class="hidden">search</label>
								<input class="search" type="search" id="search">
							</div>
						</fieldset>
					</form>

				    <div class="post" id="post-<?php the_ID(); ?>">
				        <div class="entry forum-table">

				        </div>
				    </div>

				</section>