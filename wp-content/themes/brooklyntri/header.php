<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Brooklyn_Tri
 * @since Brooklyn Tri 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
	<![endif]-->
	<script>(function(){document.documentElement.className='js'})();</script>
	<?php
	/*
		TODO: output page title, or clean up wp_head()
		wp_head();
	*/
	?>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,600,700' rel='stylesheet' type='text/css'>
	<link media="all" rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/css/all.css">
</head>

<body>
	<noscript>Javascript must be enabled for the correct page display</noscript>
	<div id="wrapper">
		<div class="w1">
			<a class="accessibility" href="#main">Skip to Content</a>
			<header id="header" itemscope itemtype="http://schema.org/Organization">
				<div class="top-bar">
					<div class="holder">
						<ul class="social">
							<li><a class="icon-facebook" tabindex="1" href="#">&nbsp;</a></li>
							<li><a class="icon-twitter" tabindex="2" href="#">&nbsp;</a></li>
							<li><a class="icon-mail" tabindex="3" href="#">&nbsp;</a></li>
						</ul>
						<nav class="menu">
							<ul>
								<li><a href="<?php echo site_url( '/contact' ); ?>" tabindex="5">CONTACT</a></li>
<?php if ( !is_user_logged_in() ): ?>
								<li class="contact">
									<a href="#" tabindex="4">LOGIN</a>
									<form action="<?php echo site_url( '/wp-login.php' ); ?>" method="post" class="login-form">
										<fieldset>
											<legend class="hidden">login form</legend>
											<div class="col">
												<div class="row">
													<label for="name03">USERNAME <span>*</span></label>
													<input type="text" id="name03" name="log">
												</div>
												<div class="row">
													<label for="password03">PASSWORD <span>*</span></label>
													<input type="password" id="password03" name="pwd">
												</div>
											</div>
											<input type="hidden" name="testcookie" value="1">
											<input type="hidden" name="action" value="btc_login_jam">
											<input class="button" type="submit" value="LOGIN">
										</fieldset>
									</form>
								</li>
<?php else: ?>
									<li><a href="<?= WP_SITEURL ?>/profile" tabindex="4">MY PROFILE</a></li>
									<li><a href="<?php echo wp_logout_url( get_permalink() ); ?>" tabindex="4">LOG OUT</a></li>
<?php endif; ?>
							</ul>
						</nav>
					</div>
				</div>
				<div class="header-holder">
					<div class="holder">
						<div class="logo" itemprop="name">
							<a tabindex="6" itemprop="url" href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/logo.png" alt="est. 2004 Brooklyn Tri Club"></a>
						</div>
						<nav id="nav">
							<a href="#" class="opener"><span>Menu</span></a>
							<div class="drop">
								<ul>
<?php
$tabindex = 7;
$menu_items = get_pages( array( 'parent' => '0', 'sort_column' => 'menu_order' ) );
foreach ( $menu_items as $page ) :
	$link_text = get_link_text( $page );
?>
									<li<?= $page->ID == get_the_ID() ? ' class="active"' : '' ?>><a href="<?= get_page_link( $page->ID ) ?>" tabindex="<?= $tabindex ?>"><?= $link_text ?></a></li>
<?php
	$tabindex++;
	endforeach;
?>
								</ul>
							</div>
						</nav>
					</div>
				</div>
			</header>
			<main id="main" role="main">

