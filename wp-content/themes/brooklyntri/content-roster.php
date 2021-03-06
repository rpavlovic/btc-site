<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

// pagination vars
$record_start = 1;
$record_count = 10; // no. of records per page
$record_begin = 1;  // start at record no.

$record_start = (isset($_GET['start'])) ? (int) $_GET['start'] : $record_start;
$record_start = ($record_start > 0) ? $record_start : $record_begin;

// store user info
global $current_user;
get_currentuserinfo();
$current_person = is_user_logged_in() ? $current_user->user_firstname . ' ' . $current_user->user_lastname : '';
$current_nickname = is_user_logged_in() ? $current_user->nickname  . ' ' . $current_user->user_lastname : '';

// cache all events per page
$cacher = new Cacher();
$get_posts = $cacher->get_cache('tribe_get_events_roster_' . $record_start . '_' . $record_count);
if ( $get_posts == false ) {
	$get_posts = tribe_get_events(
		array(
			'posts_per_page' => $record_count,
			'eventDisplay' => 'future',
			'offset' => ($record_start-1),
	        'tax_query' => array(
	            array(
	                'taxonomy' => 'tribe_events_cat',
	                'field' => 'slug',
	                'terms' => 'race'
	            )
	        )
		)
	);
	$cacher->set_cache($get_posts, 'tribe_get_events_roster');
}

// TODO: just use this thing
$total_posts = $cacher->get_cache('tribe_get_events_roster_total');
if ( $total_posts == false ) {
	$total_posts = tribe_get_events(
		array(
			'posts_per_page' => -1,
			'eventDisplay' => 'future',
		)
	);
	$cacher->set_cache($total_posts, 'tribe_get_events_roster_total');
}

// total records on current page
$page_total = (($record_count + ($record_start-1)) > count($total_posts)) ? count($total_posts) : ($record_count + ($record_start-1));

?>

					<header class="rosta">
						<?php the_title('<h2>','</h2>'); ?>
						<?php the_content(); ?>
					</header>
<?php if (!$total_posts): ?>
					<p>
						Stay tuned for upcoming races.
					</p>
<?php else: ?>
					<p>
						Viewing events <?= $record_start ?> to <?= $page_total ?> of <?= count($total_posts) ?>
					</p>

					<div class="bar">
						<p><i class="icon-star"></i> DENOTES CLUB RACE</p>
					</div>

					<fieldset class="info-form">
						<legend class="hidden">roster form</legend>
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
										<span id="total_<?= $post->ID ?>"><?= $btcers ?></span> <span>BTCER<?= ( $btcers !=1 ) ? 'S' : '' ?></span>
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
												<li id="racer_<?= $post->ID ?>_<?= $key ?>">
													<?= $racer ?>
										<?php if ( $racer == $current_person || $racer == $current_nickname ) : ?>
													<a href="javascript:void(0)" onclick="remove_racer( this )" id="registrant_<?= $post->ID ?>_<?= $key ?>" data-key="<?= $key ?>" data-post="<?= $post->ID ?>" title="Remove me from this event" class="close-thik"></a>
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
<script type="text/javascript">

	function remove_racer ( el ) {
		if (confirm("Are you sure you want to remove yourself from this event?")) {
			var eventID = el.dataset.post;
			var entryID = el.dataset.key;
			jQuery(function($) {
				$( "#registrant_" + eventID + '_' + entryID ).fadeOut( "slow", function() {
					$.ajax({
				        url: '<?= admin_url('admin-ajax.php'); ?>',    
				        type: "POST",
				        cache: false,
				        data: 'key=' + entryID + '&action=remove_racer'
					}).done(function(out) {
						if (out.indexOf('error') != -1) {
							alert("There was an error deleting your entry: "+out);
							$( "#registrant_" + eventID + '_' + entryID ).show();
						} else {
							$( "#racer_" + eventID + '_' + entryID ).fadeOut( "slow" );
							var totes = $( "#total_" + eventID ).html();
							totes = Number(totes) - 1;
							$( "#total_" + eventID ).html(totes);
						}
					});
				});
			});
	
		}
		return false;
	}

</script>
<?php
echo get_pagination(count($total_posts), $record_count, $record_begin, $record_start);
?>
<?php endif; /* if has events */ ?>
