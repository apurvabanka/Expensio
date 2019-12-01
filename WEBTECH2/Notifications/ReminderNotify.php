<?php

header("Content-type:text/event-stream");
	ob_start();
	ob_flush();
	flush();



// Create connection
$conn = new mysqli('localhost', 'root', '', 'WebTech2');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$Today = date("Y-m-d");
echo $Today;
$sql = "SELECT * FROM `Reminders` WHERE ReminderDate='$Today'";

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
    	echo "<br>";
        echo "userID : ".$row["UserID"]." id: " . $row["ReminderID"]. " - Name: " . $row["ReminderName"]. "  - \nMessage : " . $row["ReminderMessage"]." Amount :  ".$row["ReminderAmount"] ."<br>";

        $Reminder->userID = $row["UserID"];
        $Reminder->ReminderID = $row["ReminderID"];
        $Reminder->ReminderName = $row["ReminderName"];
        $Reminder->ReminderMessage = $row["ReminderMessage"];
        $Reminder->ReminderAmount = $row["ReminderAmount"];
        $myJSON = json_encode($Reminder);

        echo "event:message\n";
		echo "data:$myJSON\n\n";
		ob_flush();
		flush();
		$flag=0;

    }
} else {
    echo "0 results";
}
$conn->close();


?>