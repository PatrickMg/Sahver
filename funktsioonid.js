//PARSE START
Parse.initialize("mnBuZ0BSyojKsyUNKxUAbJqy2gsVAtucOFJ6By7e", "nVC9gfLVC0mz9FdlEJ6O8aDMFpcILnQUqeYNuFqb");

//REGISTREERIMISE NUPP
$(document).on("click", "#registerBtn", function(){
	$(".login").fadeOut();
	$(".register").fadeIn();
});

//SISSELOGIMISE NUPP
$(document).on("click", "#loginBtn", function(){
	var username = $(".login #username").val();
	var password = $(".login #password").val();
	Parse.User.logIn(username, password, {
		success: function(user){
			window.location.href = "http://www.tlu.ee/~loginz/Sahver/user.html";
		},
		error: function(user, error){
			alert("Sisselogimine ebaõnnestus");
			console.log(error);
		}
	});
});

//REGISTREERIMINE
$(document).on("click", "#register", function(){
	var username = $(".register #username").val();
	var password = $(".register #password").val();
	var passwordAgain = $(".register #passwordAgain").val();
	var email = $(".register #email").val();
	if (password == passwordAgain){
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);
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


//PAROOLI TAASTAMINE
$(document).on("click", "#forgotpwBtn", function(){
	var email = $(".forgotpw #email").val();
	Parse.User.requestPasswordReset(email, {
		success: function(){
			alert("Mine kontrolli oma eposti, uus parool on seal");
		},
		error: function(){
			alert("Sellist emaili ei pruugi olla andmebaasis");
		}
	});
});

//KONTROLLIB SISSELOGIMIST
$(document).ready(function(){
	var user = Parse.User.current();
	var username = user.get("username");
	console.log(user);

	if (!user){
		window.location.href = "http://www.tlu.ee/~loginz/Sahver/index.html";
	}else{

	}

//VÄLJALOGIMINE
	$(document).on("click", "#logout", function(){
		Parse.User.logOut();
		window.location.href = "http://www.tlu.ee/~loginz/Sahver/index.html";
	});

//AVALEHE KUVA
	$(".avaleht").html("Tere tulemast, "+username+"!");
});

//HOIDISE LISAMINE
$(document).on("click", "#lisaHoidis", function(){
	var user = Parse.User.current();
	var username = user.get("username");
	var name = $(".add #name").val();
	var content = $(".add #content").val();
	var location = $(".add #location").val();
	var makeDate = $(".add #makeDate").val();

		var Hoidised = Parse.Object.extend("Hoidised");
		var hoidis = new Hoidised();
		hoidis.set("username", username);
		hoidis.set("name", name);
		hoidis.set("content", content);
		hoidis.set("location", location);
		hoidis.set("makeDate", makeDate);
		hoidis.save(null,{
			success: function(user){
				alert("Hoidise lisamine õnnestus!");
			},
			error: function(user,error){
				alert("Hoidise lisamine ei õnnestunud!" );
				console.log(error);
			}
		});
});

//LISAMISE NUPP
$(document).on("click", "#addBtn", function(){
	$(".lisaHoidis").fadeIn();
});

//MUUDA PAROOLI
$(document).on("click", "#changePw", function(){
	var password = $(".changePw #password").val();
	var passwordAgain = $(".changePw #passwordAgain").val();
	if (password == passwordAgain){
		var user =  Parse.User.current();
		user.set("password", password);
		user.save(null,{
			success: function(user){
				alert("Parooli muutmine õnnestus!");
			},
			error: function(user,error){
				alert("Error: "+error.code + " " +error.message );
			}
		});
	}
});

//HOIDISTE KUVAMINE
$(document).ready(".info",function(){
	var user = Parse.User.current();
	var username = user.get("username");
	var username1 = Parse.Hoidised.get("username");
	if(username == username1){
		var hoidis = Parse.Hoidised.get("name");

	} else {

	}
});

//HUHUUUU
// sellega peaks küsima andmeid Parse andmebaasis, see listItem on äkki andmetabeli nimi
var query = new Parse.Query("Hoidised");
// siin siis reastame kuupäeva järgi kahanevas järjekorras
query.descending("createdAt");
// siin nüüd võtame ainult 10 viimast
query.limit(10);
// siin siis vist käsk fetchimiseks, et võtab andmed andmebaasist ja määrame ära kaks funktsiooni. kui on success ja kui on error.
query.find({
	success: function(data) {
		// siin peaks kätte saama andmed andmebaasist ja siis saab edasi tegeleda nende kuvamisega
		console.log("QUERY SUCCESS", data);
		var t = "<table>" ;
        data.forEach(function(d){
            console.log(d.attributes) ;
            t += "<tr>";
            t += "<td>" + d.attributes.name + "</td>";
            t += "<td>" + d.attributes.location + "</td>"; // ja nii edasi, oleneb mida sul vaja on andmebaasist
            t += "</tr>";
        }) ;
        t += "</table>";
        document.getElementById({}).innerHTML = t;
	},
	error: function(data){
		// see on selleks, kui tekib error andmete kättesaamisega
		console.log("QUERY FAILED",data);
	}
});

$(document).on("click", ".loend", function(){

});
