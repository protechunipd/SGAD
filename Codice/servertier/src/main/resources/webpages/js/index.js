function checkform(){
	ripristinaerrori();
	var ok=true;
	var inputuser=document.getElementById('register_username');
	var inputemail=document.getElementById('register_email');
	var inputpass1=document.getElementById('register_password');
	var inputpass2=document.getElementById('register_reppassword');
	var user = inputuser.value;
	var email= inputemail.value;
	var pass1= inputpass1.value;
	var pass2= inputpass2.value;
	var regexppass = /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/;
	var regexpemail = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
	if(!user.match(/^\w{4,14}$/)){
		ok=false;
		document.getElementById('user_vuoto').style.display="block";
		inputuser.className+=" error";
	}
	if(!pass1.match(regexppass)){
		ok=false;
		document.getElementById('errore_password').style.display="block";
		inputpass1.className+=" error";
	}
	if(pass1!=pass2 || pass2.length==0){
		ok=false;
		document.getElementById('errore_password2').style.display="block";
		inputpass2.className+=" error";
	}
	if(!email.match(regexpemail) || email.length > 100){
		ok=false;
		document.getElementById('errore_email').style.display="block";
		inputemail.className+=" error";
	}
	return ok;
}
function checkLogin(){
	document.getElementById('login_errato').style.display="none";
    var inputpassword = document.getElementById('log_password').value;
	var inputuser=document.getElementById('log_username').value;
	if(!inputuser.match(/^\w{4,14}$/) || !inputpassword.match(/^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/)){
	    document.getElementById('login_errato').style.display="block";
	    return false;
	}
}
function ripristinaerrori(){
		document.getElementById('user_vuoto').style.display="none";
		document.getElementById('user_usato').style.display="none";
		document.getElementById('email_usata').style.display="none";
		document.getElementById('errore_password').style.display="none";
		document.getElementById('errore_password2').style.display="none";
		document.getElementById('errore_email').style.display="none";;
		document.getElementById('register_username').className =
   document.getElementById('register_username').className.replace
      ( /(?:^|\s)error(?!\S)/g , '' )
		document.getElementById('register_email').className =
   document.getElementById('register_email').className.replace
      ( /(?:^|\s)error(?!\S)/g , '' )
		document.getElementById('register_password').className =
   document.getElementById('register_password').className.replace
      ( /(?:^|\s)error(?!\S)/g , '' )
		document.getElementById('register_reppassword').className =
   document.getElementById('register_reppassword').className.replace
      ( /(?:^|\s)error(?!\S)/g , '' )
}