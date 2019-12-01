<?php
	header("Content-type:text/event-stream");
	ob_start();
	ob_flush();
	flush();
	$flag=1;
	if($flag==1){
		echo "event:message\n";
		echo "data:<h2>You recieved a update from server</h2>\n\n";
		ob_flush();
		flush();
		$flag=0;
	}
	
	
?>