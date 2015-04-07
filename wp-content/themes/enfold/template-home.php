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

            <div class='container'>

                <main role="main" class="template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>">

                <!-- <main class='template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>> -->

                    <div class="entry-content-wrapper entry-content clearfix">

                        <?php /* layerslider(3) */ ?>

                        <section class="intro">
                            <h1>we are THE BROOKLYN TRI CLUB.</h1>
                            <p>
                                <?php echo the_content(); ?>
                            </p>

                            <?php if ( isset( $infoboxes['join_us_text'] ) && !empty( $infoboxes['join_us_text'] ) ): ?>
                            <footer>
                                <span><?php echo $infoboxes['join_us_text'] ?></span>
                                <a href="/register" class="btn-join"><?php echo $infoboxes['join_us_button'] ?></a>
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
                                            <h2><a href="<?php echo $infoboxes['infobox_1_url'] ?>"><?php echo $infoboxes['infobox_1_heading'] ?></a></h2>
                                            <p><?php echo $infoboxes['infobox_1_copy'] ?></p>
                                        </div>
                                    </div>
                                    <?php endif; ?>

                                    <?php if ( isset( $infoboxes['infobox_2_copy'] ) && !empty( $infoboxes['infobox_2_copy'] ) ): ?>
                                    <div class="col">
                                        <div class="col-holder">
                                            <div class="icon-holder picton-blue"><i class="icon-star">&nbsp;</i></div>
                                            <h2><a href="<?php echo $infoboxes['infobox_2_url'] ?>"><?php echo $infoboxes['infobox_2_heading'] ?></a></h2>
                                            <p><?php echo $infoboxes['infobox_2_copy'] ?></p>
                                        </div>
                                    </div>
                                    <?php endif; ?>

                                    <?php if ( isset( $infoboxes['infobox_3_copy'] ) && !empty( $infoboxes['infobox_3_copy'] ) ): ?>
                                    <div class="col">
                                        <div class="col-holder">
                                            <div class="icon-holder mantis"><i class="icon-star">&nbsp;</i></div>
                                            <h2><a href="<?php echo $infoboxes['infobox_3_url'] ?>"><?php echo $infoboxes['infobox_3_heading'] ?></a></h2>
                                            <p><?php echo $infoboxes['infobox_3_copy'] ?></p>
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