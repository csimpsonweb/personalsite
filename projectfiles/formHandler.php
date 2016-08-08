<link rel="stylesheet" href="css/style.css">
<?php
	// Catches the information from the form and process it accordingly
	$firstName = $_POST["firstName"];
	$lastName = $_POST["lastName"];
	$contactInfo = $_POST["contactInfo"];
	$rcontactInfo = $_POST["rcontactInfo"];
	$comments = $_POST["comments"];

	$eventType = $_POST["eventType"];

	echo "firstName : ".$firstName."<br />";
	echo "lastName : ".$lastName."<br />";
	//radio buttons are selected then the type of contactInfo can be determined
	echo "rcontactInfo : ".$rcontactInfo."<br />";
	echo "contactInfo : ".$contactInfo."<br />";

	echo "eventType : ".$eventType."<br />";
	echo "comments : <span class='comments'>".$comments."</span><br />";


?>