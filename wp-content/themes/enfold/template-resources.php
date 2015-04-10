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

                            <?php the_content(); ?>

                        </div>

<?php
//display the actual post content

if (get_the_ID() == 47) {
    $premium = get_posts( array( 'category' => 2, 'orderby' => 'post_date', 'order' => 'DESC' ) );
    if( count( $premium ) > 1 ):
?>

                            <div class="info-area">
                                <h2>PREMIER LEVEL SPONSORS</h2>
                                <div class="holder">
<?php
    foreach ( $premium as $post ): setup_postdata( $post );
        $feat_image = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );
        $content = get_fields( $post->ID );

?>
                                    <div class="row">
                                        <div class="img-holder">
                                            <a href="#"><img src="<?= $feat_image ?>" alt="<?= esc_html( $post->post_title ) ?>" title="<?= esc_html( $post->post_title ) ?>"></a>
                                        </div>
                                        <div class="text">
                                            <div class="col">
                                                <h3>WHAT:</h3>
                                                <?= esc_html( $content['what'] ) ?>
                                            </div>
                                            <div class="col">
                                                <h3>BTC DISCOUNT:</h3>
                                                <?= esc_html( $content['discounts'] ) ?>
                                            </div>
                                        </div>
                                    </div>
<?php
    foreach;
    wp_reset_postdata();
?>

                                </div><!-- .holder -->

                            </div><!-- .info-area -->
<?
endif;

$sponsors = get_posts( array( 'category' => 3, 'orderby' => 'post_date', 'order' => 'DESC' ) );
if( count( $sponsors ) > 1 ):
?>
                            <div class="info-area">
                                <h2>SPONSORS</h2>
                                <div class="holder">
<?php
    foreach ( $sponsors as $post ): setup_postdata( $post );
        $feat_image = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );
        $content = get_fields( $post->ID );

?>
                                    <div class="row">
                                        <div class="img-holder">
                                            <a href="#"><img src="<?= $feat_image ?>" alt="<?= esc_html( $post->post_title ) ?>" title="<?= esc_html( $post->post_title ) ?>"></a>
                                        </div>
                                        <div class="text">
                                            <div class="col">
                                                <h3>WHAT:</h3>
                                                <?= esc_html( $content['what'] ) ?>
                                            </div>
                                            <div class="col">
                                                <h3>BTC DISCOUNT:</h3>
                                                <?= esc_html( $content['discounts'] ) ?>
                                            </div>
                                        </div>
                                    </div>
<?php
    foreach;
    wp_reset_postdata();
?>
                                </div>
                            </div>
<? endif; ?>

<?php
                    }
                    else {
                        the_post();

                    }

                    ?>


                    </div>

                    <?
                        // in functions-custom.php
                        btc_leftnav($post);
                        btc_get_sponsor_logos();

                    ?>

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