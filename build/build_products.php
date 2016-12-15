<?php
define("DS", DIRECTORY_SEPARATOR);
$BASE_DIR = dirname(dirname(__FILE__));
define("__BASE_PATH", $BASE_DIR);

$product_dir = __BASE_PATH . DS . "product";
$products = scandir($product_dir);

foreach ($products as $product)
{
	if(substr($product, 0,1)=='.') continue;
	
	$curProductDir = $product_dir . DS . $product;
	
	if(is_dir($curProductDir))
	{
		$meta = array();
		$meta['title'] = $product;
		file_put_contents($curProductDir . DS . "meta.json", json_encode($meta));
		
		$subItems = scandir($curProductDir);

		foreach ($subItems as $subItem)
		{
			if(substr($subItem, 0,1)=='.') continue;
			
			$curSubItemDir = $curProductDir . DS . $subItem;
			
			if(is_dir($curSubItemDir))
			{
				$itemMeta = array();
				$itemMeta['code'] = $subItem;
				file_put_contents($curSubItemDir . DS . "meta.json", json_encode($itemMeta));
				
				$curFiles = scandir($curSubItemDir . DS . "images");
				
				$images = array();
				foreach ($curFiles as $parseFile)
				{
					if(substr($parseFile, 0,1)=='.') continue;
					
					$imageExt = substr($parseFile, -4);
					$imageExt = strtolower($imageExt);
					if(in_array($imageExt, array('.jpg','jpe','.png','.gif')))
					{
						$images[] = $parseFile;
					}
				}
				
				$itemMeta['images'] = $images;
				file_put_contents($curSubItemDir . DS . "info.json", json_encode($itemMeta));
			}
		}
	}
}

echo "\n\n";
