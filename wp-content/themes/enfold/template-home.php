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

                <main role="main" class="template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>">

                <!-- <main class='template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>> -->

                    <div class="entry-content-wrapper entry-content clearfix">

                        <?php /* layerslider(3) */ ?>

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

<?php

$infoboxes = get_fields( get_the_ID() );
if ( $infoboxes && count( $infoboxes ) > 1 ):
var_dump($infoboxes);
?>

                        <section class="box-area">
                            <div class="holder">
                                <div class="frame">
                                    <div class="col">
                                        <div class="col-holder">
                                            <div class="icon-holder"><i class="icon-star">&nbsp;</i></div>
                                            <h2><?php echo $infoboxes['infobox_1_heading'] ?></h2>
                                            <p><?php echo $infoboxes['infobox_1'] ?></p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="col-holder">
                                            <div class="icon-holder picton-blue"><i class="icon-star">&nbsp;</i></div>
                                            <h2><?php echo $infoboxes['infobox_2_heading'] ?></h2>
                                            <p><?php echo $infoboxes['infobox_2'] ?></p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="col-holder">
                                            <div class="icon-holder mantis"><i class="icon-star">&nbsp;</i></div>
                                            <h2><?php echo $infoboxes['infobox_3_heading'] ?></h2>
                                            <p><?php echo $infoboxes['infobox_3'] ?></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
<?php endif; ?>
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