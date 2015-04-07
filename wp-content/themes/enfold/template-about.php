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

                        <h3><?php the_title(); ?></h3>

                        <p><?php the_content(); ?></p>

                    <?php

                    //display the actual post content
                    the_post();

                    ?>


                    </div>

                    <aside id="sidebar">
                        <a href="#" class="opener"><span>Menu</span></a>
                        <nav class="aside-nav">
                            <div class="drop">
                                <a class="btn-link" href="#">ABOUT BTC</a>
                                <ul>
<?php
$parent = get_post( $post->post_parent );

$section_pages = get_pages(array(
    'parent' => $parent->ID,
    'sort_column' => 'post_date',
    'child_of' => $parent->ID,
    'sort_order' => 'ASC',
));
?>

                                <?php foreach ( $section_pages as $sub_section ): ?>
                                    <li><a href="<?php echo esc_url( get_permalink( $sub_section['ID'] ) ) ?>"><?php echo $sub_section['page_title'] ?></a></li>
                                <?php endforeach; ?>
                                    <li class="active"><a href="#">BTC BOARD</a></li>
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