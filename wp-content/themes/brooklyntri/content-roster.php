<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

?>


					<header class="rosta">
                      <?php the_title('<h2>','</h2>'); ?>
						<?php the_content(); ?>
					</header>
					<div class="bar">
						<p><i class="icon-star"></i> DENOTES 2015 CLUB RACE</p>
					</div>

<?php
$get_posts = tribe_get_events(array('posts_per_page'=>-1, 'eventDisplay'=>'future') );
?>

					<form action="#" class="info-form">
						<fieldset>
							<legend class="hidden">info form</legend>
							<ul class="info-list">
<?php
foreach($get_posts as $post): setup_postdata($post);

	$categories = tribe_get_event_categories( $post->ID );
	$categories = strip_tags($categories, '<a><li>');
	$categories = explode('<li>', $categories);
	unset($categories[0]);
?>

								<li><!--  class="active" -->
									<input type="checkbox" title="checkbox" checked>
									<a class="opener" href="#">
										<div class="col">
											<h2><i class="icon-star"></i> <?= $post->post_title ?></h2>
										</div>
										<div class="col">
											<span>50 BTCERS</span>
										</div>
										<div class="col">
											<time datetime="<?= date("Y-m-d",strtotime($post->EventStartDate)) ?>"><?= date("m/d/Y",strtotime($post->EventStartDate)) ?></time>
										</div>
									</a>
									<div class="slide">
										<dl>
											<dt>TYPE:</dt>
											<?php foreach($categories as $category): ?>
											<dd><?= str_replace('</li>','', $category) ?></dd>
											<?php endforeach; ?>
											<dt>LOCATION:</dt>
											<dd><?= tribe_get_city( $post->ID ) ?>, <?= tribe_get_state( $post->ID ) ?></dd>
										</dl>
										<dl>
											<dt>WEBSITE:</dt>
											<dd><a href="#">www.nyrr.org/races-and-events/2015/...</a></dd>
											<dt>ATHLETE LIST:</dt>
											<dd><a href="#">click to view</a></dd>
										</dl>
									</div>
								</li>
<?php endforeach; ?>

							</ul>
							<div class="btn-holder">
								<input type="submit" class="btn" value="SAVE CHANGES">
								<a class="btn" href="#">SUGGEST A RACE</a>
							</div>
						</fieldset>
					</form>

