var __GET = getUrlVars();
var pid = __GET['pid'] || 'dewp019';

console.log(pid);

var productURL = "http://static.denimengland.com/product/build/pid_"+pid+".json";

console.log(productURL);

$.ajax({
	url: productURL,
	beforeSend: function( xhr ) {
		console.log("getting product");
	}
})
.done(function( data ) {
	console.log("product recevied");
	buildProductDetailPage(data);
});

function buildProductDetailPage(data)
{
	console.log(data);
	
	var productObj = $('#productdetail');
	
	var item = data;
	
	var code = item.code;
	var pid = item.pid;
	var product = item.product;
	var images = item.images;
	var category = item.category;
	
	var img = images[0];
	var title = product.title || code;
	var price = product.Price;
	var productMeta = product.meta;
	
	var parentTitle = category.title;
	var parentPpid = category.ppid;
	 
	
	var imgURL = "http://static.denimengland.com/product/"+productName+"/"+code+"/build/images/"+img;
	
	$("#productdetail h2").html("Denim Englang -> "+parentTitle+" -> "+code);
	
	productObj.find('#smallimages').html('');
	for(x in images)
	{
		var smallImgURL = "http://static.denimengland.com/product/"+productName+"/"+code+"/build/images_200/"+images[x];
		
		var smallImgHTML = "<img src='"+smallImgURL+"' data-imgname='"+images[x]+"' />";
		productObj.find('#smallimages').append(smallImgHTML);
	}
	
	productObj.find('#largeimage').html("<img src='"+imgURL+"' />");
	
	productObj.find('#productinfo h3').html(title);
	
	productObj.find('#productinfo span.price').html("PRICE "+price);
	
	productObj.find('#productmeta').html('');
	for(x in productMeta)
	{
		var productMetaItemHTML = "<div><label>"+x+"</label><span>"+productMeta[x]+"</span></div>"; 
		productObj.find('#productmeta').append(productMetaItemHTML);
	}
	

}
