<?php
	/*
	Template Name: Calendar
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

                    <div class="calendar-area entry-content-wrapper entry-content clearfix">

                        <?php the_title('<h1>','</h1>'); ?>

                        <p><?php the_content(); ?></p>

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