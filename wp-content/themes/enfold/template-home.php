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
     ?>



        <div class='container_wrap container_wrap_first main_color <?php avia_layout_class( 'main' ); ?>'>

            <div class='container'>

                <main id="main" role="main">

                <!-- <main class='template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>> -->

                    <div class="entry-content-wrapper entry-content clearfix">
[slideshow_deploy id='49']
                    <section class="intro">
                        <h1>we are THE BROOKLYN TRI CLUB.</h1>
                        <p>
                            <?php echo the_content(); ?>
                        </p>
                        <footer>
                            <span>Is the Brooklyn Tri Club right for you?</span>
                            <a href="/register" class="btn-join">JOIN US</a>
                        </footer>
                    </section>
                    <section class="box-area">
                        <div class="holder">
                            <div class="frame">
                                <div class="col">
                                    <div class="col-holder">
                                        <div class="icon-holder"><i class="icon-star">&nbsp;</i></div>
                                        <h2>our mission</h2>
                                        <p>BTC aims to make triathlon accessible and affordable for everyone. <a href="#">Learn more</a> about the club.</p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="col-holder">
                                        <div class="icon-holder picton-blue"><i class="icon-star">&nbsp;</i></div>
                                        <h2>member perks</h2>
                                        <p>We enjoy <a href="#">member discounts</a> on products, services and race entries with dozens of companies, here in Brooklyn and online.</p>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="col-holder">
                                        <div class="icon-holder mantis"><i class="icon-star">&nbsp;</i></div>
                                        <h2>faq<span class="lowercase">s</span></h2>
                                        <p>BTC aims to make triathlon accessible and affordable for everyone. <a href="#">Learn more</a> about the club.</p>
                                    </div>
                                </div>
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