<?php
require_once 'config.php';

$homeSlidesDir = __BASE_PATH . DS . "images" . DS . "homeslides";

$homeSlides = scandir($homeSlidesDir);

$i=0;
foreach ($homeSlides as $homeSlide)
{
	if(substr($homeSlide, 0,1)=='.') continue;
	if(substr($homeSlide, 0,strlen('hmbanner_'))=='hmbanner_') continue;
	
	$info = pathinfo($homeSlide);
	
	$name  = sprintf("hmbanner_%03d.%s",$i++,strtolower($info['extension']));
// 	copy($homeSlidesDir . DS . $homeSlide, $homeSlidesDir . DS . $name);
// 	unlink($homeSlidesDir . DS . $homeSlide);
}


echo "\n\n";