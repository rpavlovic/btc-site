<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

$infoboxes = get_fields( get_the_ID() );

?>
				<section class="intro">
					<?php the_title('<h1>','</h1>'); ?>

					<?= the_content(); ?>

                    <?php if ( isset( $infoboxes['join_us_text'] ) && !empty( $infoboxes['join_us_text'] ) ): ?>
                    <footer>
                        <span><?= $infoboxes['join_us_text'] ?></span>
                        <a href="<?= WP_SITEURL . '/join' ?>" class="btn-join"><?= $infoboxes['join_us_button'] ?></a>
                    </footer>
                    <?php endif; ?>
				</section>

                <section class="box-area">
                    <div class="holder">
                        <div class="frame">

                            <?php if ( isset( $infoboxes['infobox_1_copy'] ) && !empty( $infoboxes['infobox_1_copy'] ) ): ?>
                            <div class="col">
                                <div class="col-holder">
                                    <div class="icon-holder"><i class="icon-star">&nbsp;</i></div>
                                    <h2><a href="<?= WP_SITEURL . '/' . $infoboxes['infobox_1_url'] ?>"><?= $infoboxes['infobox_1_heading'] ?></a></h2>
                                    <p><?= btc_relative_links ( $infoboxes['infobox_1_copy'] ) ?></p>
                                </div>
                            </div>
                            <?php endif; ?>

                            <?php if ( isset( $infoboxes['infobox_2_copy'] ) && !empty( $infoboxes['infobox_2_copy'] ) ): ?>
                            <div class="col">
                                <div class="col-holder">
                                    <div class="icon-holder picton-blue"><i class="icon-star">&nbsp;</i></div>
                                    <h2><a href="<?= WP_SITEURL . '/' . $infoboxes['infobox_2_url'] ?>"><?= $infoboxes['infobox_2_heading'] ?></a></h2>
                                    <p><?= btc_relative_links ( $infoboxes['infobox_2_copy'] ) ?></p>
                                </div>
                            </div>
                            <?php endif; ?>

                            <?php if ( isset( $infoboxes['infobox_3_copy'] ) && !empty( $infoboxes['infobox_3_copy'] ) ): ?>
                            <div class="col">
                                <div class="col-holder">
                                    <div class="icon-holder mantis"><i class="icon-star">&nbsp;</i></div>
                                    <h2><a href="<?= WP_SITEURL . '/' . $infoboxes['infobox_3_url'] ?>"><?= $infoboxes['infobox_3_heading'] ?></a></h2>
                                    <p><?= btc_relative_links ( $infoboxes['infobox_3_copy'] ) ?></p>
                                </div>
                            </div>
                            <?php endif; ?>

                        </div>
                    </div>
                </section>
				<div class="info-text">
					<div class="text-holder">
						<h2>BTC FORUM</h2>
						<div class="holder">
							<div class="photo">
								<img src="<?php bloginfo('wpurl'); ?>/images/img02.jpg" alt="image description">
							</div>
							<div class="text">
								<h2>THE BTC FORUM</h2>
								<p>The BTC forum is the best place to find up-to-the-minute BTC training-event info, along with heads-ups about new discounts, races, and other official news. It's also the best place for our members to talk to each other: Ask advice, share tips, post race reports, find training partners and more.</p>
<?php if ( !is_user_logged_in() ): ?>
								<form action="<?php echo site_url( '/login.php' ); ?>" method="post" class="login-form">
									<fieldset>
										<legend class="hidden">login form</legend>
										<p>This is a members <em>only</em> section. Please login to access the forum.</p>
										<div class="row">
											<div class="col">
												<label for="name">USERNAME <span>*</span></label>
												<input type="text" id="name" name="user">
											</div>
											<div class="col">
												<label for="password">PASSWORD <span>*</span></label>
												<input type="password" id="password" name="pass">
											</div>
										</div>
										<input type="hidden" name="testcookie" value="1">
										<input type="hidden" name="action" value="btc_login_jam">
										<input class="button" type="submit" value="LOGIN">
									</fieldset>
								</form>
<?php endif; ?>
							</div>
						</div>
					</div>
					<div class="text-holder add">
						<h2>BTC FORUM</h2>
						<div class="holder">
							<div class="photo">
								<img src="<?php bloginfo('wpurl'); ?>/images/img02.jpg" alt="image description">
							</div>
							<div class="text">
								<div class="desc-holder">
									<h3>TRAINING &amp; RACING</h3>
									<dl>
										<dt>Topics:</dt>
										<dd>1227</dd>
										<dt>Posts:</dt>
										<dd>6134</dd>
										<dt>Latest Post:</dt>
										<dd><a href="#"><span>Friday Night Strength</span> (Gabe Dorosz)</a></dd>
									</dl>
									<h3>EVENTS &amp; WORKSHOPS</h3>
									<dl>
										<dt>Topics:</dt>
										<dd>39</dd>
										<dt>Posts:</dt>
										<dd>150</dd>
										<dt>Latest Post:</dt>
										<dd><a href="#"><span>Beginner’s Triathlon Seminar</span>  (Scott Bartos)</a></dd>
									</dl>
								</div>
								<div class="desc-holder">
									<h3>RACE REPORTS</h3>
									<dl>
										<dt>Topics:</dt>
										<dd>82</dd>
										<dt>Posts:</dt>
										<dd>307</dd>
										<dt>Latest Post:</dt>
										<dd><a href="#"><span>Watchung Winter Train Race</span> (Cuneyt Eviner)</a></dd>
									</dl>
									<h3>BTC MARKETPLACE</h3>
									<dl>
										<dt>Topics:</dt>
										<dd>263</dd>
										<dt>Posts:</dt>
										<dd>644</dd>
										<dt>Latest Post:</dt>
										<dd><a href="#"><span>Used Trainer and Bike Stand for sale</span> (Len Lopate)</a></dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
					<aside class="aside">
						<h2>UPCOMING EVENTS</h2>
						<ul>
<?php
$races = tribe_get_events(array('posts_per_page'=>5, 'eventDisplay'=>'future') );
foreach($races as $post): setup_postdata($post);
?>

							<li><a href="<?= is_user_logged_in() ? get_permalink( $post->ID ) : 'javascript:void(0)' ?>"><?= esc_html( $post->post_title ) ?></a></li>

<?php endforeach; ?>
						</ul>
<?php if ( count($races) < 3 ): ?>
						<p>
							Stay tuned for upcoming races.
						</p>
<?php endif; ?>
					</aside>
				</div>

                <?php btc_get_sponsor_logos(); ?>
