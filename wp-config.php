<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */

if ($_SERVER['SERVER_NAME'] == 'dev.brooklyntri.org' || ($_SERVER['SERVER_NAME'] == '66.147.247.44' && strstr($_SERVER['REQUEST_URI'], '/dev'))) {
	define('DB_NAME', 'brookmq9_dev');

	/** MySQL database username */
	define('DB_USER', 'brookmq9_derfnut');

	/** MySQL database password */
	define('DB_PASSWORD', 'm~*]QzsTU9B,');

	/** MySQL hostname */
	define('DB_HOST', 'localhost');

	/** Database Charset to use in creating database tables. */
	define('DB_CHARSET', 'utf8');

	/** The Database Collate type. Don't change this if in doubt. */
	define('DB_COLLATE', '');

	if ($_SERVER['SERVER_NAME'] == '66.147.247.44') {
		define('WP_HOME','http://66.147.247.44/dev');
		define('WP_SITEURL','http://66.147.247.44/dev');
	} else {
		define('WP_HOME','http://'.$_SERVER['SERVER_NAME']);
		define('WP_SITEURL','http://'.$_SERVER['SERVER_NAME']);
	}

	define('WP_DEBUG', false);
	define('DEV', true);
}
else if ($_SERVER['SERVER_NAME'] == 'stage.brooklyntri.org') {
	define('DB_NAME', 'brookmq9_stage');

	/** MySQL database username */
	define('DB_USER', 'brookmq9_derfnut');

	/** MySQL database password */
	define('DB_PASSWORD', 'm~*]QzsTU9B,');

	/** MySQL hostname */
	define('DB_HOST', 'localhost');

	/** Database Charset to use in creating database tables. */
	define('DB_CHARSET', 'utf8');

	/** The Database Collate type. Don't change this if in doubt. */
	define('DB_COLLATE', '');

	define('WP_HOME','http://stage.brooklyntri.org');
	define('WP_SITEURL','http://stage.brooklyntri.org');
	define('WP_DEBUG', false);
	define('DEV', false);
}
else if ($_SERVER['SERVER_NAME'] == 'www.brooklyntri.org' || $_SERVER['SERVER_NAME'] == 'brooklyntri.org') {
	define('DB_NAME', 'brookmq9_prod');

	/** MySQL database username */
	define('DB_USER', 'brookmq9_derfnut');

	/** MySQL database password */
	define('DB_PASSWORD', 'm~*]QzsTU9B,');

	/** MySQL hostname */
	define('DB_HOST', 'localhost');

	/** Database Charset to use in creating database tables. */
	define('DB_CHARSET', 'utf8');

	/** The Database Collate type. Don't change this if in doubt. */
	define('DB_COLLATE', '');

	define('WP_HOME','http://' . $_SERVER['SERVER_NAME']);
	define('WP_SITEURL','http://' . $_SERVER['SERVER_NAME']);
	define('WP_DEBUG', false);
	define('DEV', false);
}

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'Pl-]_IU)>Z;@j%HCv/<*pIiM-$NW$(Jk}p{Vn/F}T@P))yrJmwG{]Tim){MqP$NGbQt%Iw^>@zhj+QVHo=nc_bOj&QEGxblC_DO@bCaC&mO[]f{GZn[$E%%XC]pZ/gJX');
define('SECURE_AUTH_KEY', 'nMRmUe{|;Tf$sTQ;lx|AwurXZf-F-_F}&GKK-d>dpHiBjU*UEicLsI?RCtHr}/dk?mM]FN%a>!uzH*TFkERZZ_xzeq?khZhDYtf$)YCwejWpZoVHrgyDIP/WtioNTXbd');
define('LOGGED_IN_KEY', 'DrM);M-gSizZki|hGn&Gp%NULD%Fd;M(%}evOPyAN?&k>XClo&)l)^uqUlsnrul[+QM&;Mp@JZNxGNrElqpRKyPub/El+]eD+>VZKDUGWM</g&pB^Jg%n@COirfr_tLo');
define('NONCE_KEY', 'nw!uqVd(<*QPMJFE)/gbIQy&hQH@<P!T[xAX+(JBSxpGz(f;ZP]U=uAxSrlzN]FHO/Nz@)ZSGkmhb[+no{qP>@T^$K;N{gLI=Faz@<WAGws)LTTP@Td|ON?!fZvPO[YV');
define('AUTH_SALT', 'U}NMg}qN&kw?KwQPxNB|HIG|h}QFJtG<QB<Rwskz(iHV=QnDH%YC<xXQka&!]]]/&dQ+-VDKu;GsrPDS*d((&NVSWr(<Tq^eMq[vox_|WdH-p*KxI;FwAZ+CZsiJkhjr');
define('SECURE_AUTH_SALT', '^jdDqL*H%wA]R^_P$c_/FE>Ck+N]*P/KoYrHjIOM*Tf+v_+emvJrtURjHbaEgE+USlJqp?;]e^P?IW+AQ)/eIb*SuMR<;vr![Mjzd(Y_aipb;TPY-ivDtlkh[lcn}g!^');
define('LOGGED_IN_SALT', '}^V-))QwdiXGA]iP;LyXhFBdRD!=qn/V?|Fis)s+lmuOfhAAZ[tiXFGK;WKX%qeW/|sxd>pWL{zW!r;z&-SQXLZ<$}nXV|djaxeG/&pa!;=dQ!siY>;ll]+g?ZgGwkuU');
define('NONCE_SALT', 'M[[Cf+MAhAdRvCuJR;GQOYw;TU?KsByZqkP>MSWG^Owi(U];((kUyZ;diU[l(]uuxlJ?Vg?Z$V!IC(HVThTSIFSPF|$RmjlyIDp@ThqlXpwFE%qLg(/kNaGVV}uFAT+b');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_ttyr_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
if(strstr($_SERVER['SERVER_NAME'], 'dev') != false) {
	define('WP_DEBUG', true);
}
else {
	define('WP_DEBUG', true);
}

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

/**
 * Include tweaks requested by hosting providers.  You can safely
 * remove either the file or comment out the lines below to get
 * to a vanilla state.
 */
if (file_exists(ABSPATH . 'hosting_provider_filters.php')) {
	include('hosting_provider_filters.php');
}

define('EVENT_FIELD_ID', 7);
define('TWITTER_URL', 'https://twitter.com/BrooklynTriClub');
define('FACEBOOK_URL', 'https://www.facebook.com/BrooklynTriClub');

