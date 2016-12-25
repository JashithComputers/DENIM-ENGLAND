var __GET = getUrlVars();
var pid = __GET['pid'] || 'dewp019';

console.log(pid);

var productURL = "http://static.denimengland.com/product/build/pid_" + pid + ".json";

console.log(productURL);

$.ajax({
        url: productURL,
        beforeSend: function(xhr) {
            console.log("getting product");
        }
    })
    .done(function(data) {
        console.log("product recevied");
        buildProductDetailPage(data);
    });

function buildProductDetailPage(data) {
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

    setActiveMenu(parentPpid);

    var imgURL = "http://static.denimengland.com/product/" + parentTitle + "/" + code + "/images/" + img;

    var breadcrumb = "";
    breadcrumb += "<a href='/'>Denim England</a>";
    breadcrumb += " / "
    breadcrumb += "<a href='/p/product-page.html?pid=" + parentPpid + "&ts'>" + parentTitle + "</a>";
    breadcrumb += " / "
    breadcrumb += "<a class='active' href='#'>" + code + "</a>";

    $("#productbreadcrumb").html(breadcrumb);
    $('html title').html(title);


    productObj.find('#smallimages').html('');
    for (x in images) {
        var smallImgURL = "http://static.denimengland.com/product/" + parentTitle + "/" + code + "/build/images_200/" + images[x];

        var smallImgHTML = "<img src='" + smallImgURL + "' data-imgname='" + images[x] + "' />";
        productObj.find('#smallimages').append(smallImgHTML);
    }

    productObj.find('#largeimage').html("<img src='" + imgURL + "' />");

    productObj.find('#productinfo h3').html(title);

    productObj.find('#productinfo span.price').html("PRICE " + price);

    productObj.find('#productmeta').html('');
    for (x in productMeta) {
        var productMetaItemHTML = "<div><label>" + x + "</label><span>" + productMeta[x] + "</span></div>";
        productObj.find('#productmeta').append(productMetaItemHTML);
    }

    //setup events

    var productObj = $('#productdetail');
    productObj.find('#smallimages img').click(function() {
        var imgname = $(this).attr("data-imgname");
        console.log(imgname);

        productObj.find('#largeimage img').attr("src", "http://static.denimengland.com/images/loading.gif");
        var imgURL = "http://static.denimengland.com/product/" + parentTitle + "/" + code + "/images/" + imgname;
        productObj.find('#largeimage img').attr("src", imgURL);
    });

    productObj.find(".quantityhld input").change(function() {
        if (isNaN($(this).val()) || $(this).val() < 1)
            $(this).val(1);
    });
    productObj.find(".quantityhld em").unbind("click");
    productObj.find(".quantityhld em").bind("click", function() {
        var obj = productObj.find(".quantityhld input");
        var val = obj.val();
        if (isNaN(val)) val = 1;

        if ($(this).hasClass('decre')) {
            if (val > 1) {
                obj.val(parseInt(val) - 1);
            }
        } else {
            obj.val(parseInt(val) + 1);
        }

    });

}
