<?php
require_once("./src/components/Header.php");
require_once("./src/components/Menu.php");
// functions
require_once("./src/functions/get_current_url.php");
require_once("./src/functions/api_fetch.php");
require_once("./src/functions/uc_smart.php");
require_once("./src/functions/val_exists.php");
echo "<main id='app'>";
		require_once("./src/functions/img_element.php");
		require_once("./src/components/Router.php");
		require_once("./src/components/Sidebar.php");
		include_once("./src/components/Footer.php");
echo "</main>";
?>
<link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono:400i" rel="stylesheet" media="none" onload="if(media!='all')media='all'" rel="stylesheet">
<link href="<?php echo $htp_root; ?>src/css/App.css" rel="stylesheet" media="none" onload="if(media!='all')media='all'" rel="stylesheet">
