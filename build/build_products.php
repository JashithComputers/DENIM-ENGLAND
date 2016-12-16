<?php
require_once 'config.php';
require_once 'products_lib.php';

$product_dir = __BASE_PATH . DS . "product";
$products = scandir($product_dir);

foreach ($products as $product)
{
	if(substr($product, 0,1)=='.') continue;
	if(substr($product, 0,strlen('build'))=='build') continue;
	
	$productBuildDir = $product_dir . DS . "build";
	
	$curProductDir = $product_dir . DS . $product;
	
	if(is_dir($curProductDir))
	{
		$meta = array();
		$meta['title'] = $product;
		$ppid = preg_replace('/[^A-z]/', '', $product);
		$ppid = strtolower($ppid);
		$meta['ppid'] = $ppid;
		
		$productItems = array();
		
		if(!file_exists($productBuildDir))
			mkdir($productBuildDir);
		
		$subItems = scandir($curProductDir);

		foreach ($subItems as $subItem)
		{
			if(substr($subItem, 0,1)=='.') continue;
			
			$curSubItemDir = $curProductDir . DS . $subItem;
			
			if(is_dir($curSubItemDir))
			{
				$itemMeta = array();
				$itemMeta['code'] = $subItem;
				$itemMeta['category'] = $meta;
				
				$pid = preg_replace('/[^A-z0-9]/', '', $subItem);
				$pid = strtolower($pid);
				$itemMeta['pid'] = $pid;
				
				file_put_contents($curSubItemDir . DS . "meta.json", json_encode($itemMeta));
				
				$imagesDir = $curSubItemDir . DS . "images";
				
				if(!file_exists($curSubItemDir . DS . "build"))
					mkdir($curSubItemDir . DS . "build");
				
				$images_200 = $curSubItemDir . DS . "build" . DS . "images_200";
				if(!file_exists($images_200)) mkdir($images_200);
				$images_400 = $curSubItemDir . DS . "build" . DS . "images_400";
				if(!file_exists($images_400)) mkdir($images_400);
				
				$curFiles = scandir($imagesDir);
				
				$images = array();
				foreach ($curFiles as $parseFile)
				{
					if(substr($parseFile, 0,1)=='.') continue;
					if(is_dir($imagesDir . DS . $parseFile)) continue;
					
					$imageExt = substr($parseFile, -4);
					$imageExt = strtolower($imageExt);
					if(in_array($imageExt, array('.jpg','jpe','.png','.gif')))
					{
						$images[] = $parseFile;
						
						/**
						imagejpeg(resizeImage($imagesDir . DS . $parseFile, 200, 200), $images_200 . DS . $parseFile, 100);
						imagejpeg(resizeImage($imagesDir . DS . $parseFile, 400, 400), $images_400 . DS . $parseFile, 100);
						/**/
					}
				}
				
				$itemMeta['images'] = $images;
				
				$productData = file_get_contents($curSubItemDir . DS . "product.json");
				$productData = json_decode($productData,true);
				
				if(empty($productData))
				{
					$productTitle = ""; 
					$handle = @fopen($curSubItemDir . DS . "desc.html", "r" );
					if ($handle) {
						while ( ($buffer = fgets ( $handle, 4096 )) !== false ) {
							if(strlen(trim($buffer))>0)
							{
								if(stristr($buffer, 'Price') && (stristr($buffer, 'usd') || stristr($buffer, 'inr')))
								{
									$productData['Price'] = trim(str_replace('PRICE', '', strtoupper($buffer)));
								}
								else if(strstr($buffer, ':'))
								{
									$parts = explode(':', trim($buffer));
									$productData['meta'][array_shift($parts)] = trim(implode('', $parts));
								}
								else {
									if(strlen(trim($buffer))>0)
									{
										$productTitle .= utf8_encode( trim($buffer) );
									}
								}
							}
						}
						if (! feof ( $handle )) {
							echo "Error: unexpected fgets() fail\n";
						}
						fclose ( $handle );
					}
					
					$productData['title'] = $productTitle;
					
					print_r($productData);
					
					file_put_contents($curSubItemDir . DS . "product.json", json_encode($productData));
					
					echo file_get_contents($curSubItemDir . DS . "product.json");
					echo "\n\n";
					echo $curSubItemDir . DS . "product.json";
					echo "\n\n";
					var_dump(json_last_error());
					echo "\n\n";
					die;
				}
				
				$itemMeta['product'] = $productData;
				
				file_put_contents($curSubItemDir . DS . "info.json", json_encode($itemMeta));
				
				file_put_contents($productBuildDir . DS . "pid_{$pid}.json", json_encode($itemMeta));
				
				$productItems[] = $itemMeta;
			}
		}
		
		$meta['items'] = $productItems;
		file_put_contents($productBuildDir . DS . "ppid_{$ppid}.json", json_encode($meta));
	}
}

echo "\n\n";
