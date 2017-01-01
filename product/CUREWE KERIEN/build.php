<?php
if(!defined("DS")) define("DS", DIRECTORY_SEPARATOR);
$CUR_DIR = dirname(__FILE__);

echo $CUR_DIR;
$ckfiles = scandir($CUR_DIR);
foreach($ckfiles as $item)
{
	if(substr($item,0,1)==".") continue;
	$itemPath = $CUR_DIR . DS . $item;
	echo "\n";
	$imagesDir = $CUR_DIR . DS . $item . DS . "images";
	if(is_dir($itemPath))
	{
		if(!file_exists($imagesDir))
			mkdir($imagesDir);
		//echo "\n"; 
		//echo $cmd = "mv \"" . $itemPath . "/\"*.PNG \"" . $imagesDir . "\"";
		//exec($cmd);
		//echo "mkdir \"$itemPath\"/backup";
		//echo "mv \"$itemPath/\"*.doc* \"$itemPath/backup\"";
		echo "cp \"$itemPath/product.json\" \"$itemPath/source_product.json\"";
	}
		
}

echo "\n";
