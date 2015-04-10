<?php
	/*
	Template Name: Homepage
	*/


    /*
     * get_header is a basic wordpress function, used to retrieve the header.php file in your theme directory.
     */


     global $avia_config, $more;
     get_header();
     echo avia_title();

     $infoboxes = get_fields( get_the_ID() );

     ?>



        <div class='container_wrap container_wrap_first main_color <?php avia_layout_class( 'main' ); ?>'>

            <div id="main" class='container'>

                <main role="main" class="template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>">

                <!-- <main class='template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>> -->
                <div class="cycle-gallery">
                    <div class="mask">
                        <div class="slideset">
                            <section class="slide right">
                                <div class="slide-holder">
                                    <img src="images/img09.jpg" alt="image description">
                                    <div class="caption">
                                        <div class="caption-holder">
                                            <div class="logo">
                                                <a href="#"><img src="images/logo02.png" alt="BTC BROOKLYN TRIATHLON CLUB ESTABLISHED 2004"></a>
                                            </div>
                                            <h1>NEED A PLACE TO SWIM?</h1>
                                            <span><a href="#">Click here to check out our list of Brooklyn pools </a></span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="slide">
                                <div class="slide-holder">
                                    <img src="images/img10.jpg" alt="image description">
                                    <div class="caption">
                                        <div class="caption-holder">
                                            <div class="logo">
                                                <a href="#"><img src="images/logo02.png" alt="BTC BROOKLYN TRIATHLON CLUB ESTABLISHED 2004"></a>
                                            </div>
                                            <h1>RACE WITH BTC</h1>
                                            <span>Members enjoy discounts and more. <a href="#">Click here to learn more.</a></span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="slide">
                                <div class="slide-holder">
                                    <img src="images/img11.jpg" alt="image description">
                                    <div class="caption">
                                        <div class="caption-holder">
                                            <div class="logo">
                                                <a href="#"><img src="images/logo02.png" alt="BTC BROOKLYN TRIATHLON CLUB ESTABLISHED 2004"></a>
                                            </div>
                                            <h1>26.2 IS BTC‘S IDEA OF FUN.</h1>
                                            <span>We like to think so. <a href="#">Click here to find out what makes BTC tick.</a></span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <a class="btn-prev" href="#"><i class="icon-left-open-big">&nbsp;</i></a>
                    <a class="btn-next" href="#"><i class="icon-right-open-big">&nbsp;</i></a>
                    <div class="pagination">
                        <!-- pagination generated here -->
                    </div>
                </div>
                    <div class="intro entry-content-wrapper entry-content clearfix">

                        <?php /* layerslider(3) */ ?>

                        <section class="intro">
                            <?php the_title('<h1>','</h1>'); ?>
                            <p>
                                <?= the_content(); ?>
                            </p>

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

                    <?php

                    //display the actual post content
                    the_post();

                    ?>


                    </div>

                <!--end content-->
                </main>

                <?php
                wp_reset_query();
                //get the sidebar
                $avia_config['currently_viewing'] = 'page';
                get_sidebar();

                ?>

            </div><!-- end container-->

        </div><!-- close default .container_wrap element -->


<?php get_footer(); ?>