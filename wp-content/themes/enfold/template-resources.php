<?php
	/*
	Template Name: Resources
	*/


    /*
     * get_header is a basic wordpress function, used to retrieve the header.php file in your theme directory.
     */


     global $avia_config, $more;
     get_header();
     echo avia_title();
     ?>



        <div class='container_wrap container_wrap_first main_color <?php avia_layout_class( 'main' ); ?>'>

            <div class='container'>

                <main id="two-columns" class='template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>>

                    <div id="content" class="content-holder entry-content-wrapper entry-content clearfix">

                        <div class="intro-text">

                            <?php the_title('<h2>','</h2>'); ?>

                            <p><?php the_content(); ?></p>

                        </div>

                    <?php
                    //display the actual post content

                    if (get_the_ID() == 47) {
?>
                            <div class="info-area">
                                <h2>PREMIER LEVEL SPONSORS</h2>
                                <div class="holder">
                                    <div class="row">
                                        <div class="img-holder">
                                            <a href="#"><img src="images/img17.jpg" alt="jack rabbit"></a>
                                        </div>
                                        <div class="text">
                                            <div class="col">
                                                <h3>WHAT:</h3>
                                                <p>A Brooklyn-born triathlon and running specialty shop that sells running and triathlon gear, as well as legendary shoe fitting service. Longtime club sponsor and host to many BTC events. One location in Brooklyn and three in Manhattan.</p>
                                            </div>
                                            <div class="col">
                                                <h3>BTC DISCOUNT:</h3>
                                                <p>Double points on BTC Shopping nights (dates and times will be posted on the Forum) and special events throughout the year.</p>
                                                <a href="#">www.jackrabbitsports.com</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="img-holder">
                                            <a href="#"><img src="images/img18.png" alt="a c m e bicycle co brooklyn ny"></a>
                                        </div>
                                        <div class="text">
                                            <div class="col">
                                                <h3>WHAT:</h3>
                                                <p>Expert Bicycle Fitting, Bicycle Evaluation and Bicycle Consultation. Owned and operated by founding BTC member Jon Blyer, Acme's goal is to help you reach yours, whether just getting back in shape or setting a land speed record. A professional bike fitting will not only get you more comfortable in the saddle, but reduce injury risk and likely make you faster in the process.</p>
                                            </div>
                                            <div class="col">
                                                <h3>BTC DISCOUNT:</h3>
                                                <p>Acme Bicycle Co. regularly holds special events for the BTC community.</p>
                                                <a href="#">http://acmebicycleco.com</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="img-holder">
                                            <a href="#"><img src="images/img19.jpg" alt="priority fitness"></a>
                                        </div>
                                        <div class="text">
                                            <div class="col">
                                                <h3>WHAT:</h3>
                                                <p>Priority Fitness is a lot more than the average personal training studio. Owned and operated by club member Ben Kessel, Priority Fitness consists of a team of qualified and fully certified professionals ready to address all your fitness related needs. They offer a wide range of services and with you as their priority, tailoring a program designed to help you reach your goals with personalized weekly fitness plans. Priority Fitness is ready for you to make a change, but there is still one question remaining: what’s your priority?</p>
                                            </div>
                                            <div class="col">
                                                <h3>BTC DISCOUNT:</h3>
                                                <p>Year-round 10% discount on all training, nutrition and massage therapy sessions</p>
                                                <a href="#">www.priorityfitnesstraining.com/</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="info-area">
                                <h2>SPONSORS</h2>
                                <div class="holder">
                                    <div class="row">
                                        <div class="img-holder">
                                            <a href="#"><img src="images/img20.jpg" alt="ride brooklyn"></a>
                                        </div>
                                        <div class="text">
                                            <div class="col">
                                                <h3>WHAT:</h3>
                                                <p>Our favorite local bike shop and longtime club sponsor, Ride Brooklyn sells a variety of road, triathlon and commuter bikes, hosts computrainer classes and has a wide selection of components, apparel and bike fitting services. With locations in Park Slope and Williamsburg</p>
                                            </div>
                                            <div class="col">
                                                <h3>BTC DISCOUNT:</h3>
                                                <p>Double points on BTC Shopping nights (dates and times will be posted on the Forum) and special events throughout the year.</p>
                                                <a href="#">www.ridebrooklynny.com</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="img-holder">
                                            <a href="#"><img src="images/img21.png" alt="race day professional triathlon coaching"></a>
                                        </div>
                                        <div class="text">
                                            <div class="col">
                                                <h3>WHAT:</h3>
                                                <p>Race Day Coaching is a professional triathlon coaching organization led by USAT Level II Certified Triathlon Coach John Stewart. In addition to coaching our Thursday am bricks, John is Head Swimming Coach of Jack Rabbit Sports, Head Masters Swim coach at Berkeley Carrol School, and a Team In Training Triathlon Coach since 2003. John coaches beginners to elites and everything in between.</p>
                                            </div>
                                            <div class="col">
                                                <h3>BTC DISCOUNT:</h3>
                                                <p>Race Day Coaching offers BTC members year-round 10% discount on private coaching</p>
                                                <a href="#">www.racedaycoaching.com</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
<?php
                    }
                    else {
                        the_post();
                        the_content();

                    }

                    ?>


                    </div>
<?php
$parent = get_post( $post->post_parent );

$section_pages = get_pages(array(
    'parent' => $parent->ID,
    'sort_column' => 'post_date',
    'child_of' => $parent->ID,
    'sort_order' => 'ASC',
));

//var_dump($section_pages);
?>
                    <aside id="sidebar">
                        <a href="#" class="opener"><span>Menu</span></a>
                        <nav class="aside-nav">
                            <div class="drop">
                                <a class="btn-link" href="<?= esc_url( get_permalink( $parent->ID ) ); ?>"><?= $parent->post_title; ?></a>
                                <ul>
                                <?php foreach ( $section_pages as $sub_section ): ?>
                                    <li<?= $sub_section->ID == get_the_ID() ? ' class="active"' : '' ?>><a href="<?= esc_url( get_permalink( $sub_section->ID ) ); ?>"><?= $sub_section->post_title; ?></a></li>
                                <?php endforeach; ?>
                                </ul>
                            </div>
                        </nav>
                    </aside>

                <!--end content-->
                </main>

                <?php
                wp_reset_query();
                //get the sidebar
                $avia_config['currently_viewing'] = 'page';
                get_sidebar();

                ?>

            </div><!--end container-->

        </div><!-- close default .container_wrap element -->


<?php get_footer(); ?>