<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

$infobox = get_fields( get_the_ID() );

?>
				<section class="forum-area">
					<header>
						<?php the_title('<h1>','</h1>'); ?>
						<?php echo $infobox['intro'] ; ?>
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

<?php
/*
				    <div class="post" id="post-<?php the_ID(); ?>">
				        <div class="entry forum-table">
							<?= the_content(); ?>
				        </div>
				    </div>
*/
?>
				</section>