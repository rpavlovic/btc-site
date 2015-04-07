<?php
	/*
	Template Name: About Page
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

				<main id="main" role="main" class='template-archives content <?php avia_layout_class( 'content' ); ?> units' <?php avia_markup_helper(array('context' => 'content'));?>>

                    <div class="entry-content-wrapper entry-content clearfix">

                        <h3><?php echo get_the_title( get_the_ID() ); ?></h3>

                        <p>content <?php the_content(); ?></p>

                    <?php

                    echo 'post';
                    //display the actual post content
                    the_post();
                    

                    ?>


                    </div>
                    <section class="clients-area">
                        <div class="holder">
                        <h1>our sponsors</h1>
                            <ul class="clients-logo">
                                <li><a href="#"><img src="images/img03.jpg" alt="jack rabbit"></a></li>
                                <li><a href="#"><img src="images/img04.png" alt="a c m e bicycle co brooklyn ny"></a></li>
                                <li><a href="#"><img src="images/img05.jpg" alt="priority fitness"></a></li>
                                <li><a href="#"><img src="images/img06.jpg" alt="ride brooklyn"></a></li>
                                <li><a href="#"><img src="images/img07.png" alt="race day professional triathlon coaching"></a></li>
                            </ul>
                        </div>
                    </section>

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