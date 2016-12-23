function subscribeNewsletter()
{
	var email = $("newslettertext").val();
	
	if(!email) {
		alert("Please enter email");
	}
	else if(!(new JCL_lib()).validateEmail(email))
	{
		alert("Please enter valid email");
	}
	else{
		sendMail("User subscribed to newsletter: "+email, "user", email, function(){
			$("#newsletter").html("<span class='text'>" +
					"You have been subscribed to our newsletter. " +
					"Thanks for your interest.</p>");	
		});
	}
}