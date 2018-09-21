<?php

// get data
$ref_data = false;
if (strlen($current_path) > 0) {
	$ref_data = api_fetch("url=". $current_path);
	$data = api_fetch("table=". $ref_data["table"] . "&id=" . $ref_data["ref_id"]);
} else { //homepage, just get all the projects
	$data = api_fetch("view=overview");
	$page_profile_photo = 332;
	// 701
}
if ($ref_data && valExists("view", $ref_data)) {
	$current_view = $ref_data["view"];
}
if ($ref_data) {
	if (valExists("category", $ref_data)) {
		$current_category = $ref_data["category"];
	}
	if (valExists("subcategory", $ref_data)) {
		$current_subcategory = $ref_data["subcategory"];
	}
}
if (valExists("title", $data)) {
	$page_title = $data["title"];
}
if (valExists("description", $data)) {
	$page_description = $data["description"];
	if (substr($page_description, 0, 1) === "[") {
		$page_description = json_decode($page_description, true);
	}
} else {
	if ($current_view !== "overview") {
		$page_description = "";
	}
}
if (valExists("links", $data)) {
	$page_links = $data["links"];
	if (substr($page_links, 0, 1) === "[") {
		$page_links = json_decode($page_links, true);
	}
}

if (valExists("profile_img", $data)) {
	$page_profile_photo = $data["profile_img"];
}

if (valExists("cover_img", $data)) {
	$page_hero_img = $data["cover_img"];
}

//echo "<pre>Refs<br/>";

//print_r($ref_data);
//echo "<br/>Data<br/>";
//print_r($data);
//echo "<br/><br/><b>".$current_view."</b></pre>";

require_once("./src/components/Sidebar.php");
switch ($current_view) {
	case "overview":
		include_once($php_root . "src/views/Overview.php");
		break;
	case "subcategory":
		include_once($php_root . "src/views/Subcategory.php");
		break;
	case "project":
		include_once($php_root . "src/views/Project.php");
		break;
	case "details":
		include_once($php_root . "src/views/Details.php");
		break;
}
