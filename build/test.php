<?php
/*********************
$LastChangedDate: 2016-06-01 18:02:08 +0530 (Wed, 01 Jun 2016) $
$Rev: 0 $
$Author: ventuno $
********************/
$product = "CARD- asdf";

$pid = preg_replace('/[^A-z]/', '', $product);
$pid = strtolower($pid);

print_r($pid);


echo "\n";