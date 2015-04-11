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
	<?php /* wp_head(); */ ?>
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
								<li class="contact">
									<a href="#" tabindex="4">LOGIN</a>
									<form action="<?php echo esc_url( get_template_directory_uri() ); ?>/wp-login.php" class="login-form">
										<fieldset>
											<legend class="hidden">login form</legend>
											<div class="col">
												<div class="row">
													<label for="name03">USERNAME <span>*</span></label>
													<input type="text" id="name03" name="username">
												</div>
												<div class="row">
													<label for="password03">PASSWORD <span>*</span></label>
													<input type="password" id="password03" name="username">
												</div>
											</div>
											<input class="button" type="submit" value="LOGIN">
										</fieldset>
									</form>
								</li>
								<li><a href="#" tabindex="5">CONTACT</a></li>
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

//$menu_items = get_btc_parent_menu_items( get_btc_main_menu() );
$menu_items = get_pages('parent=0');

foreach ( $menu_items as $page ) :
?>
									<li<?= $page->ID == get_the_ID() ? ' class="active"' : '' ?>><a href="<?= get_page_link( $page->ID ) ?>" tabindex="<?= $tabindex ?>"><?= $page->post_title ?></a></li>
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

