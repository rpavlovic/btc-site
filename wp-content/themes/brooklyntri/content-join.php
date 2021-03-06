<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

$fields = get_fields( get_the_ID() );

?>


				<section class="intro-area">
					<header>
						<?php the_title('<h2>','</h2>'); ?>
						<?php the_content(); ?>
					</header>

					<div class="divider">
						<div class="holder"></div>
					</div>
					<div class="list-holder">
						<?= $fields['logged_in_text'] ?>
					</div>
					<div class="text">
						<p>Brooklyn Tri Club membership is based on the calendar year and is valid from <time datetime="<?= date("Y") ?>-01-01">January 1st</time> to <time datetime="<?= date("Y") ?>-12-31">December 31st</time>.</p>
						<p>For more information on the club, see our <a href="<?= WP_SITEURL ?>/mission/faq/">FAQs</a>.</p>
					</div>

				</section>

				<div class="intro-holder">
					<div class="holder">
						<div class="photo">
							<img src="<?php bloginfo('wpurl'); ?>/images/img16.jpg" alt="image description">
						</div>
						<div class="text">
							<?= $fields['logged_out_text'] ?>

							<h3>Brooklyn Tri Club Membership Waiver</h3>
							<div class="scrollable-area">
								<p>I hereby acknowledge for myself, executors, heirs and administrators, and for anyone else who might sue on my behalf that it is my intent to take these actions. I acknowledge that a triathlon or biathlon/duathlon event is an extreme test of a person’s physical and mental limits and carries with it the potential for death, serious injury and property loss. I certify that I am physically fit, have trained for participation in these events, and have not been advised otherwise by a qualified medical person. I acknowledge that this AWRL form will be used by the Brooklyn Triathlon Club, Inc. (“BTC”) and the sponsors and organizers of all BTC activities (Activities being of a workout or low-key nature or a race format or just a social event). I acknowledge that my statements on this AWRL are being accepted by BTC in consideration for allowing me to become a participant in activities and are being relied upon by BTC and the various coaches, organizers, and administrators in permitting me to participate in any BTC activities. I hereby take action for myself, my executors, administrators, heirs, next of kin, successors, and assign as follows: a) WAIVE, RELEASE, DISCHARGE, and AGREE NOT TO SUE, for any and all liability for my death, disability, personal injury, property damage or loss, property theft, or action of any kind which may hereafter accrue to me as a result of participation in, or my traveling to or from a BTC activity, THE FOLLOWING PERSONS OR ENTITIES: BTC, event sponsors, race directors, event producers, event volunteers, and all cities, counties, districts and/or states in which said events may be staged or in which segments of said events may be run and its (their) officers, directors, employees, representatives and agents and volunteers; b) INDEMNIFY AND HOLD HARMLESS the persons or entities mentioned in the paragraph from any and all liabilities or claims made by individuals or entities as a result of my actions during BTC activities or events; c) I AGREE to abide by the Competitive Rules adopted by USA Triathlon, including the Medical Control Rules as they may be amended from time to time, and I acknowledge that my membership may be revoked or suspended for violation of the Competitive Rules.  I realize that most BTC activities are of a workout or social nature and no traffic control will be in place during the event or activity. I will be responsible for knowing and following all traffic laws while participating in, practicing for, or traveling to or from a BTC event or activity. I hereby consent to receive treatment in the event of my injury, accident, and/or illness during any BTC activity; d) I AGREE that prior to participating in an event I will inspect the race course, facilities, equipment and areas to be used and if I believe they are unsafe I will immediately advise the person supervising the event activity, facility, or area. I also ASSUME ANY AND ALL OTHER RISKS associated with participating in BTC events including but not limited to falls, contact and/or effects with other participants, effects of weather including heat and/or humidity, defective equipment, the condition of the roads, water hazards, contact with other swimmers or boats, and any hazard that may be posed by spectators or volunteers. I hereby authorize the Club to include my name in any marketing materials including newsletters, media kits, advertising and the website. I also grant the Club express permission to use photographs of myself in Club newsletters, Club websites and associated media, or promotional materials and for submissions to newspaper articles and to Club sponsors</p>
							</div>
							<div class="btn-holder">
								<div class="text-holder">
									<p>By clicking on the right, I affirm that I am 18 years of age or older (18), I have read the waiver, and I understand its content.</p>
								</div>

								<?php
									if ( !empty( $fields['paypal_form'] ) ) :

										echo $fields['paypal_form'];

									endif;
								?>

							</div>
						</div>
					</div>
				</div>
