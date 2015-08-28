<?php

if (isset($_SERVER['HTTP_REFERER'])) {
	header('location:' . $_SERVER['HTTP_REFERER']);
}
else {
	header('location:' . WP_SITEURL);
}
exit();