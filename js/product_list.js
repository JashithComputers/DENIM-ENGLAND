//Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

var __GET = getUrlVars();
var pid = __GET['pid'] || 'wallet';

console.log(pid);


var productURL = "http://static.denimengland.com/product/build/ppid_"+pid+".json";

console.log(productURL);

$.ajax({
	url: productURL,
	beforeSend: function( xhr ) {
		console.log("getting products");
	}
})
.done(function( data ) {
	console.log("products recevied");
	buildProductListPage(data);
});

function buildProductListPage(data)
{
	console.log(data);
	
	var title = data.title;
	
	$("#productlistpage h2").html(title);
	
	var newProductObj = $('#productlistpage .prodItem').clone();
	$('#productlistpage .prodItem').remove();
	for(x in data.items)
	{
		var item = data.items[x];
		
		var code = item.code;
		var pid = item.pid;
		var product = item.product;
		var images = item.images;
		
		var img = images[0];
		var title = product.title;
		var price = product.Price;
		 
		
		var newProduct = newProductObj.clone();
		
		var imgURL = "http://static.denimengland.com/product/"+title+"/"+code+"/build/images_200/"+img;
		
		newProduct.find('img').attr('src',imgURL);
		newProduct.find('span').html(title);
		
		$("#productlistpage").append(newProduct);	
	}
	
	
	
	
}
