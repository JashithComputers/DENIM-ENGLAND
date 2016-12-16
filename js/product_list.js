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
	
	var productName = data.title;
	
	$("#productlistpage h2").html("Denim Englang -> "+productName);
	
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
		var title = product.title || code;
		var price = product.Price;
		 
		
		var newProduct = newProductObj.clone();
		
		var imgURL = "http://static.denimengland.com/product/"+productName+"/"+code+"/build/images_200/"+img;
		
		newProduct.find('img').attr('src',imgURL);
		newProduct.find('span').html(title).attr('title',title);
		
		var detailPageURL = "http://www.denimengland.com/p/product-item.html?pid="+pid+"&";
		newProduct.find('a').attr('href',detailPageURL);
		
		$("#productlistpage").append(newProduct);	
	}
	
	
	
	
}
