<?php
/**
 * Template Name: Profile
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */


// gotta be logged in first
if( !is_user_logged_in() ) {
	auth_redirect();
}

// Get user info.
global $current_user, $wp_roles;
//get_currentuserinfo(); //deprecated since 3.1

// Load the registration file.
//require_once( ABSPATH . WPINC . '/registration.php' ); //deprecated since 3.1
$error = array();    
// If profile was saved, update profile.
if ( 'POST' == $_SERVER['REQUEST_METHOD'] && !empty( $_POST['action'] ) && $_POST['action'] == 'update' ) {

    // Update user password.
    if ( !empty($_POST['pass1'] ) && !empty( $_POST['pass2'] ) ) {
        if ( $_POST['pass1'] == $_POST['pass2'] )
            wp_update_user( array( 'ID' => $current_user->ID, 'user_pass' => esc_attr( $_POST['pass1'] ) ) );
        else
            $error[] = __('The passwords you entered do not match.  Your password was not updated.', 'profile');
    }

    // Update user information.
    if ( !empty( $_POST['url'] ) )
        wp_update_user( array( 'ID' => $current_user->ID, 'user_url' => esc_url( $_POST['url'] ) ) );
    if ( !empty( $_POST['email'] ) ){
        if (!is_email(esc_attr( $_POST['email'] )))
            $error[] = __('The Email you entered is not valid.  please try again.', 'profile');
        elseif(email_exists(esc_attr( $_POST['email'] )) != $current_user->id )
            $error[] = __('This email is already used by another user.  try a different one.', 'profile');
        else{
            wp_update_user( array ('ID' => $current_user->ID, 'user_email' => esc_attr( $_POST['email'] )));
        }
    }

    update_user_meta( $current_user->ID, 'first_name', esc_attr( $_POST['first_name'] ) );
    update_user_meta( $current_user->ID, 'last_name', esc_attr( $_POST['last_name'] ) );
    update_user_meta( $current_user->ID, 'description', esc_attr( $_POST['description'] ) );
    update_user_meta( $current_user->ID, 'url', esc_attr( $_POST['url'] ) );
    update_user_meta( $current_user->ID, 'nickname', esc_attr( $_POST['nickname'] ) );
    update_user_meta( $current_user->ID, 'display_email', esc_attr( $_POST['display_email'] ) );

	update_user_meta( $current_user->ID, 'facebook', esc_attr( $_POST['facebook'] ) );
	update_user_meta( $current_user->ID, 'twitter', esc_attr( $_POST['twitter'] ) );
	update_user_meta( $current_user->ID, 'instagram', esc_attr( $_POST['instagram'] ) );


    // Redirect so the page will show updated info.*/
	/*I am not Author of this Code- i dont know why but it worked for me after changing below line to if ( count($error) == 0 ){
    if ( count($error) == 0 ) {

        //action hook for plugins and extra fields saving
        do_action('edit_user_profile_update', $current_user->ID);
        do_action( 'personal_options_update', $current_user->ID );

		$av = new Simple_Local_Avatars;
		$av->edit_user_profile_update( $current_user->ID );

        wp_redirect( get_permalink() );
        exit;
    }
} else if ('GET' == $_SERVER['REQUEST_METHOD'] && !empty( $_GET['action'] ) && $_GET['action'] == 'remove-simple-local-avatar' && $current_user->ID == $_GET['user_id']) {
	$av = new Simple_Local_Avatars;
	$av->avatar_delete( $current_user->ID );
	wp_redirect( get_permalink() );
    exit;
}

get_header();

btc_breadcrumbs();

$current_post = $post;

?>

				<div class="contact-form-area">

		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			// Include the page content template.
			get_template_part( 'content', 'profile' ); //content-profile.php

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		// End the loop.
		endwhile;
		?>
				</div>


<?php	
	btc_get_sponsor_logos();
	get_footer();
?>
