<?php

if (isset($_SERVER['HTTP_REFERER'])) {
	header('location:' . $_SERVER['HTTP_REFERER']);
}
else if(defined('WP_SITEURL')) {
	header('location:' . WP_SITEURL);
}
else if(file_exists('index.php')) {
	header('location:index.php');
}
exit();