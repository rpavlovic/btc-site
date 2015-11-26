<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

// stuff not being used?
global $current_user;
get_currentuserinfo();
$current_person = is_user_logged_in() ? $current_user->user_firstname . ' ' . $current_user->user_lastname : '';
$current_nickname = is_user_logged_in() ? $current_user->nickname  . ' ' . $current_user->user_lastname : '';

//var_dump($current_nickname );

$get_posts = tribe_get_events(
	array(
		'posts_per_page'=>-1,
		'eventDisplay'=>'future',
        'tax_query'=> array(
            array(
                'taxonomy' => 'tribe_events_cat',
                'field' => 'slug',
                'terms' => 'race'
            )
        )
	)
);

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
						<p><i class="icon-star"></i> DENOTES CLUB RACE</p>
					</div>

					<fieldset class="info-form">
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
<?php endif; /* event link */ ?>

<?php if ( count( $registrants ) > 0): ?>
										<dt>ATHLETE LIST:</dt>
										<dd>
											<ol>
									<?php foreach ( $registrants as $key=>$racer ) : ?>
												<li id="racer_<?= $key ?>">
													<?= $racer ?>
										<?php if ( $racer == $current_person || $racer == $current_nickname ) : ?>
													<a href="javascript:void(0)" id="registrant_<?= $post->ID ?>_<?= $key ?>" data-key="<?= $key ?>" data-event="<?= $post->ID ?>" title="Remove me from this event" class="close-thik"></a>

													<script type="text/javascript">

													jQuery(function($) {
														$( "registrant_<?= $post->ID ?>_<?= $key ?>" ).click(function() {
															if ( confirm( "Are you sure you want to remove yourself from this event?")) {

																$( "registrant_<?= $post->ID ?>_<?= $key ?>" ).fadeOut( "slow", function() {
																	$.ajax({
																        url: <?= admin_url('admin-ajax.php'); ?>,    
																        type: "POST",
																        cache: false,
																        data: 'key=<?= $key ?>&action=remove_racer'
																	}).done(function(out) {
																		//$( "racer_<?= $key ?>" ).fadeOut( "slow" );
																		$( "racer_<?= $key ?>" ).html(out);
																	});
																});
															}
														});
													});

													</script>
										<?php endif; ?>
												</li>
									<?php endforeach; ?>
											</ol>
										</dd>
<?php endif; /* if has registrants */ ?>

<?php
if ( is_user_logged_in() && !current_user_registered( $post->ID ) ):

?>
										<dd><?php echo gravity_form(1, $display_title=false, $display_description=true, $display_inactive=false, $field_values=array('event_name' => $post->post_title), $ajax=true); ?></dd>
<?php endif; /* if not currently registered */ ?>

									</dl>
								</div>
							</li>
<?php endforeach; /* for each event listed */ ?>

						</ul>
<? /*
						<div class="btn-holder">
							<input type="submit" class="btn" value="SAVE CHANGES">
							<a class="btn" href="#">SUGGEST A RACE</a>
						</div>
*/ ?>
					</fieldset>


<?php endif; /* if has events */ ?>
