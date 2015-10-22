<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

global $current_user;
get_currentuserinfo();
$current_person = is_user_logged_in() ? $current_user->user_firstname . ' ' . $current_user->user_lastname : '';

$get_posts = tribe_get_events(array('posts_per_page'=>-1, 'eventDisplay'=>'future') );

?>


					<header class="rosta">
						<?php the_title('<h2>','</h2>'); ?>
						<?php the_content(); ?>
					</header>
<?php if (!$get_posts): ?>
					<p>
						Stay tuned for upcoming races.
					</p>
<?php else: ?>
					<div class="bar">
						<p><i class="icon-star"></i> DENOTES 2015 CLUB RACE</p>
					</div>

					<form action="#" class="info-form">
						<fieldset>
							<legend class="hidden">info form</legend>
							<ul class="info-list">
<?php
$form_set = false;
foreach($get_posts as $post): setup_postdata($post);
	$registrants = get_btc_participants(1, $post->ID);
	$btcers = count($registrants); // count_btc_registrants(1, $post->ID);
	$event_link = tribe_get_event_website_link();

	$categories = tribe_get_event_categories( $post->ID );
	$categories = strip_tags($categories, '<a><li>');
	$categories = explode('<li>', $categories);
	unset($categories[0]);
?>

								<li><!--  class="active" -->
									<? /* <input type="checkbox" title="checkbox" checked> */ ?>
									<a class="opener" href="#">
										<div class="col">
											<h2><?= is_club_race( $categories ) ? '<i class="icon-star"></i>' : '' ?> <?= $post->post_title ?></h2>
										</div>
										<div class="col">
											<span><?= $btcers ?> BTCER<?= ( $btcers !=1 ) ? 'S' : '' ?></span>
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
<?php if( !empty( $event_link ) ): ?>
											<dt>WEBSITE:</dt>
											<dd><?= $event_link ?></dd>
<?php endif; ?>

<?php if ( count( $registrants ) > 0): ?>
											<dt>ATHLETE LIST:</dt>
											<dd>
												<ol>
										<?php foreach($registrants as $racer): ?>
													<li><?= $racer ?></li>
										<?php endforeach; ?>
												</ol>
											</dd>
<?php endif; ?>

										</dl>

<?php
if ( !$form_set && is_user_logged_in() && !current_user_registered( $post->ID ) ): $form_set = true;

?>
										<?php echo gravity_form(1, $display_title=false, $display_description=true, $display_inactive=false, $field_values=null, $ajax=true); ?>
<?php endif; ?>
									</div>
								</li>
<?php endforeach; ?>

							</ul>
<? /*
							<div class="btn-holder">
								<input type="submit" class="btn" value="SAVE CHANGES">
								<a class="btn" href="#">SUGGEST A RACE</a>
							</div>
*/ ?>
						</fieldset>
					</form>
<?php endif; ?>
