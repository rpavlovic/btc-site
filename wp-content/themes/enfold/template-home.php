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

                <main class='template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>>

                    <div class="entry-content-wrapper entry-content clearfix">
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
                        <section class="intro">
                            <h1>we are THE BROOKLYN TRI CLUB.</h1>
                            <p>
                                <?php echo the_content(); ?>
                            </p>
                            <footer>
                                <span>Is the Brooklyn Tri Club right for you?</span>
                                <a href="#" class="btn-join">JOIN US</a>
                            </footer>
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

            </div><!--end container-->

        </div><!-- close default .container_wrap element -->


<?php get_footer(); ?>