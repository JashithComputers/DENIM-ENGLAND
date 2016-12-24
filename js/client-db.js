	JCL_firebase.setup({
		DB_DOMAIN:"denimengland-com"
	});
	
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
	
	function client_setupHeader()
	{
		if(JCL_firebase.is_auth())
		{
			var welcomemsg = "Welcome "+JCL_firebase.getName();
		}
	}
	
	function registerAuthCallback(callback)
	{
		window._JCL_firebase_onAuthStateChanged = window. _JCL_firebase_onAuthStateChanged || [];
		window._JCL_firebase_onAuthStateChanged.push(callback);
		
		var obj = callback;
		var key = Object.keys(obj)[0];
		if(typeof(callback[key])=="function")
			callback[key]();
	}
	
	function fireAuthCallbacks()
	{
		window._JCL_firebase_onAuthStateChanged = window. _JCL_firebase_onAuthStateChanged || [];
		
		var authFiredKeys = []; 
		for (x in window._JCL_firebase_onAuthStateChanged)
		{
			var obj = window._JCL_firebase_onAuthStateChanged[x];
			var key = Object.keys(obj)[0];
			if(typeof(authFiredKeys[key])=="undefined"){
				authFiredKeys[key] = key;
				console.log(key);
				if(typeof(obj[key])=="function")
					obj[key]();
			}
			else{
				consolr.log("already fired");
			}
		}
	}
	
	
	$(document).ready(function(){
		
		registerAuthCallback({client_setupHeader:client_setupHeader});
		
		JCL_firebase.onAuthStateChanged(function(user){
			fireAuthCallbacks();
		});
	});
	
