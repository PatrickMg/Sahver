
// CACHE
// during a request
var user = cache.getUser(sessionToken);

// during login/signup
cache.setUser(sessionToken, userObject);

// during logout
cache.clearUser(sessionToken);

//PARSE START
Parse.initialize("mnBuZ0BSyojKsyUNKxUAbJqy2gsVAtucOFJ6By7e", "yw2Q6Z66rWaMbefRUl2RiGhJWIh5M2zLlmtBy4WS");

// SISSELOGIMINE
$(document).on("click", "#registerBtn", function(){
	$(".login").fadeOut();
	$(".register").fadeIn();
});

$(document).on("click", "#loginBtn", function(){
	// $(".login").fadeOut();
	// $(".register").fadeIn();
	var username = $(".login #username").val();
	var password = $(".login #password").val();
	Parse.User.logIn(username, password, {
		success: function(user){
			window.location.href = "http://www.tlu.ee/~loginz/Korralik/Veebiraamistikud/parse/members.html";
		},
		error: function(user, error){
			alert("Sisselogimine ebaõnnestus");
		}
	});
});

$(document).on("click", "#cancel", function(){
	$(".login").fadeIn();
	$(".register").fadeOut();
});

$(document).on("click", "#ifpw", function(){
	$(".login").fadeOut();
	$(".register").fadeOut();
	$(".forgotpw").fadeIn();
});


$(document).on("click", "#register", function(){
	var username = $(".register #username").val();
	var password = $(".register #password").val();
	var passwordAgain = $(".register #passwordAgain").val();
	var email = $(".register #email").val();
	var sex = $(".register #sex").val();
	if (password == passwordAgain){
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);
		user.set("sex", sex);
		user.signUp(null,{
			success: function(user){
				alert("Kasutaja loomine õnnestus");
			},
			error: function(user,error){
				alert("Error: "+error.code + " " +error.message );
			}
		});
	}
});

$(document).on("click", "#forgotpwBack", function(){
	$(".login").fadeIn();
	$(".register").fadeOut();
	$(".forgotpw").fadeOut();
});

$(document).on("click", "#forgotpwBtn", function(){
	var email = $(".forgotpw #email").val();
	Parse.User.requestPasswordReset(email, {
		success: function(){
			alert("Mine kontrolli oma eposti, uus parool on seal");
			$("#forgotpwBack").click();
		},
		error: function(){
			alert("Sellist emaili ei pruugi olla andmebaasis");
		}
	});
});
