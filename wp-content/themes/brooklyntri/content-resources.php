<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

?>

                        <div class="intro-text">

                            <?php the_title('<h2>','</h2>'); ?>

                            <?php the_content(); ?>

                        </div>

<?php
//display the actual post content

if (get_the_ID() == 47):

    $premium = get_posts( array( 'category' => 2, 'orderby' => 'post_date', 'order' => 'DESC' ) );
    if( count( $premium ) > 1 ):
?>

                            <div class="info-area">
                                <h2>PREMIER LEVEL SPONSORS</h2>
                                <div class="holder">
<?php
    foreach ( $premium as $sponsor ): setup_postdata( $sponsor );
        $feat_image = wp_get_attachment_url( get_post_thumbnail_id( $sponsor->ID ) );
        $content = get_fields( $sponsor->ID );

?>
                                    <div class="row">
                                        <div class="img-holder">
                                            <a href="#"><img src="<?= $feat_image ?>" alt="<?= esc_html( $sponsor->post_title ) ?>" title="<?= esc_html( $sponsor->post_title ) ?>"></a>
                                        </div>
                                        <div class="text">
                                            <div class="col">
                                                <h3>WHAT:</h3>
                                                <?= esc_html( $content['what'] ) ?>
                                            </div>
                                            <div class="col">
                                                <h3>BTC DISCOUNT:</h3>
                                                <?= $content['discounts'] ?>
                                            </div>
                                        </div>
                                    </div>
<?php
    endforeach;
    wp_reset_postdata();
?>

                                </div><!-- .holder -->

                            </div><!-- .info-area -->
<?
endif; // if premium sponsors

$sponsors = get_posts( array( 'category' => 3, 'orderby' => 'post_date', 'order' => 'DESC' ) );
if( count( $sponsors ) > 1 ):
?>
                            <div class="info-area">
                                <h2>SPONSORS</h2>
                                <div class="holder">
<?php
    foreach ( $sponsors as $sponsor ): setup_postdata( $sponsor );
        $feat_image = wp_get_attachment_url( get_post_thumbnail_id( $sponsor->ID ) );
        $content = get_fields( $sponsor->ID );

?>
                                    <div class="row">
                                        <div class="img-holder">
                                            <a href="#"><img src="<?= $feat_image ?>" alt="<?= esc_html( $sponsor->post_title ) ?>" title="<?= esc_html( $sponsor->post_title ) ?>"></a>
                                        </div>
                                        <div class="text">
                                            <div class="col">
                                                <h3>WHAT:</h3>
                                                <?= esc_html( $content['what'] ) ?>
                                            </div>
                                            <div class="col">
                                                <h3>BTC DISCOUNT:</h3>
                                                <?= $content['discounts'] ?>
                                            </div>
                                        </div>
                                    </div>
<?php
    endforeach;
    wp_reset_postdata();
?>
                                </div>
                            </div>
<? endif; // if sponsors ?>

<?php
                    else:

                        the_post();

                    endif;

                    ?>

