<?php
/**
 * Front to the WordPress application. This file doesn't do anything, but loads
 * wp-blog-header.php which does and tells WordPress to load the theme.
 *
 * @package WordPress
 */

/**
 * Tells WordPress to load the WordPress theme and output it.
 *
 * @var bool
 */
define('WP_USE_THEMES', true);

/** Loads the WordPress Environment and Template */
require( dirname( __FILE__ ) . '/wp-blog-header.php' );


//get_header();
die(1);
function btc_login() {

    // not the login request?
    if( !isset( $_POST['action'] ) || $_POST['action'] !== 'btc_login_jam') {
        die(2);
        return;
    }

    if( isset( $_POST['action'] ) && $_POST['action'] === 'btc_login_jam') {
die(3);
        global $wpdb;

        //We shall SQL escape all inputs
        $username = $wpdb->escape( $_POST['user'] );
        $password = $wpdb->escape( $_POST['pass'] );
        //$remember = $wpdb->escape($_POST['rememberme']);

        //if($remember) $remember = "true";
        //else $remember = "false";

        $login_data = array();
        $login_data['user_login'] = $username;
        $login_data['user_password'] = $password;
        $login_data['remember'] = false; //$remember;

        $user_verify = wp_signon( $login_data, false ); 

        if ( is_wp_error( $user_verifyv) )  {
            // error message
            die(4);
            echo $user_verify->get_error_message();
        }
        // redirect back to the requested page if login was successful
        //echo $_SERVER['REQUEST_URI']; die;
        die(5);
        header('Location: ' . $_SERVER['REQUEST_URI']);
        exit;
    }
    else {
        die(6);
        // No login details entered - you should probably add some more user feedback here, but this does the bare minimum
        echo "Invalid login details";
    }
}
add_action( 'after_setup_theme', 'btc_login' );

//get_footer();
