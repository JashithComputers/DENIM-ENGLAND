JCL_firebase.setup({
	DB_DOMAIN:"denimengland-com"
});

$(document).ready(function(){
	client_setupHeader();
});

function client_setupHeader()
{
	if(JCL_firebase.is_auth())
	{
		var welcomemsg = "Welcome "+JCL_firebase.getName();
		$("#jcHeader #topstrip #headerwelcomemsg").html(welcomemsg);
	}
}

function googleLogin(){
	var nextURL = document.referrer || "/";
	
	$(document).ready(function(){
		JCL_firebase.googleLogin(function(user){
			console.log(user);
			window.top.location = nextURL;
		},function(error){
			console.log(error);
		});
	});
}

function facebookLogin(){
	var nextURL = document.referrer || "/";
	
	$(document).ready(function(){
		JCL_firebase.facebookLogin(function(user){
			console.log(user);
			window.top.location = nextURL;
		},function(error){
			console.log(error);
		});
	});
}