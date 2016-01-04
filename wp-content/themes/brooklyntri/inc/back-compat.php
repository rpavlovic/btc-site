<?php
/**
 * Brooklyn Tri back compat functionality
 *
 * Prevents Brooklyn Tri from running on WordPress versions prior to 4.1,
 * since this theme is not meant to be backward compatible beyond that and
 * relies on many newer functions and markup changes introduced in 4.1.
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */

/**
 * Prevent switching to Brooklyn Tri on old versions of WordPress.
 *
 * Switches to the default theme.
 *
 * @since Brooklyn Tri 1.0
 */
function brooklyntri_switch_theme() {
	switch_theme( WP_DEFAULT_THEME, WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', 'brooklyntri_upgrade_notice' );
}
add_action( 'after_switch_theme', 'brooklyntri_switch_theme' );

/**
 * Add message for unsuccessful theme switch.
 *
 * Prints an update nag after an unsuccessful attempt to switch to
 * Brooklyn Tri on WordPress versions prior to 4.1.
 *
 * @since Brooklyn Tri 1.0
 */
function brooklyntri_upgrade_notice() {
	$message = sprintf( __( 'Brooklyn Tri requires at least WordPress version 4.1. You are running version %s. Please upgrade and try again.', 'brooklyntri' ), $GLOBALS['wp_version'] );
	printf( '<div class="error"><p>%s</p></div>', $message );
}

/**
 * Prevent the Customizer from being loaded on WordPress versions prior to 4.1.
 *
 * @since Brooklyn Tri 1.0
 */
function brooklyntri_customize() {
	wp_die( sprintf( __( 'Brooklyn Tri requires at least WordPress version 4.1. You are running version %s. Please upgrade and try again.', 'brooklyntri' ), $GLOBALS['wp_version'] ), '', array(
		'back_link' => true,
	) );
}
add_action( 'load-customize.php', 'brooklyntri_customize' );

/**
 * Prevent the Theme Preview from being loaded on WordPress versions prior to 4.1.
 *
 * @since Brooklyn Tri 1.0
 */
function brooklyntri_preview() {
	if ( isset( $_GET['preview'] ) ) {
		wp_die( sprintf( __( 'Brooklyn Tri requires at least WordPress version 4.1. You are running version %s. Please upgrade and try again.', 'brooklyntri' ), $GLOBALS['wp_version'] ) );
	}
}
add_action( 'template_redirect', 'brooklyntri_preview' );
