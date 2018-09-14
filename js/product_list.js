var __GET = getUrlVars();
var pid = __GET['pid'] || 'wallet';
setActiveMenu(pid);

console.log(pid);

var productURL = "https://static.denimengland.com/product/build/ppid_"+pid+".json";

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
	
	var siteName = $('#productbreadcrumb').attr("data-title");
	if(!siteName) siteName = "Denim England";
	
	var breadcrumb = "";
	breadcrumb += "<a href='/'>"+siteName+"</a>";
	breadcrumb += " / "
	breadcrumb += "<a class='active' href='#'>"+productName+"</a>";
	
	$("#productbreadcrumb").html(breadcrumb);
	$('html title').html(productName);
	
	
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
		
		var imgURL = "https://static.denimengland.com/product/"+productName+"/"+code+"/build/images_200/"+img;
		
		newProduct.find('img').attr('src',imgURL);
		newProduct.find('span').html(title).attr('title',title);
		
		var detailPageURL = "/p/product-item.html?pid="+pid+"&";
		newProduct.find('a').attr('href',detailPageURL);
		
		$("#productlistpage").append(newProduct);	
	}
	
	
	
	
}
