<?php
require_once 'config.php';
require_once 'products_lib.php';

$product_dir = __BASE_PATH . DS . "product";
$products = scandir($product_dir);

foreach ($products as $product)
{
	if(substr($product, 0,1)=='.') continue;

	$curProductDir = $product_dir . DS . $product;

	if(is_dir($curProductDir))
	{
		echo "\n\n";
		echo '<div class="sl-feature-product">';
		echo "\n\n";
		$subItems = scandir($curProductDir);
		
		foreach ($subItems as $subItem)
		{
			if(substr($subItem, 0,1)=='.') continue;
				
			$curSubItemDir = $curProductDir . DS . $subItem;
				
			if(file_exists($curSubItemDir . DS . "info.json"))
			{
				$info = file_get_contents($curSubItemDir . DS . "info.json");
				$info = json_decode($info);
					
				echo "\n";
				$imgSrc = "http://static.denimengland.com/product/{$product}/{$subItem}/build/images_200/".array_shift($info->images);
				
				echo '<img src="'.$imgSrc.'" />';
			}
		}
		echo "\n\n";
		echo "</div>";
		echo "\n\n";
	}
}

echo "\n";
