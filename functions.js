
//SISSELOGIMINE
Parse.User.logIn("myname", "mypass", {
  success: function(user) {
    // Do stuff after successful login.
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
  }
});

//PAROOLI TAASTAMINE
Parse.User.requestPasswordReset("email@example.com", {
  success: function() {
  // Password reset request was sent successfully
  },
  error: function(error) {
    // Show the error message somewhere
    alert("Error: " + error.code + " " + error.message);
  }
});

//ADMINNI MÄÄRAMINE
var roleACL = new Parse.ACL();
roleACL.setPublicReadAccess(true);
var role = new Parse.Role("Administrator", roleACL);
role.save();

//OBJEKTIDE SALVESTAMINE
var jobApplication = new Parse.Object("JobApplication");
jobApplication.set("applicantName", "Joe Smith");
jobApplication.set("applicantResumeFile", parseFile);
jobApplication.save();


//OBJEKTIDE SALVESTAMINE
var GameScore = Parse.Object.extend("GameScore");
var gameScore = new GameScore();

gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");
gameScore.set("cheatMode", false);

gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + gameScore.id);
  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
  }
});

//HOIDISTE KUVAMINE
// set up our query for a User object
var userQuery = new Parse.Query(Parse.User);

// configure any constraints on your query...
// for example, you may want users who are also playing with or against you

// tell the query to fetch all of the Weapon objects along with the user
// get the "many" at the same time that you're getting the "one"
userQuery.include("weaponsList");

// execute the query
userQuery.find({
  success: function(results){
    // results contains all of the User objects, and their associated Weapon objects, too
  }
});

//ASJADE LISAMINE
var game = new Parse.Object("Game");
game.set("createdBy", Parse.User.current());

//HOIDISTE KÄTTESAAMINE
var weapons = Parse.User.current().get("weaponsList");

//KASUTAJATE LEIDMINE
// set up our query for a User object
var userQuery = new Parse.Query(Parse.User);

// configure any constraints on your query...
// for example, you may want users who are also playing with or against you

// tell the query to fetch all of the Weapon objects along with the user
// get the "many" at the same time that you're getting the "one"
userQuery.include("weaponsList");

// execute the query
userQuery.find({
  success: function(results){
    // results contains all of the User objects, and their associated Weapon objects, too
  }
});

//KASUTAJATE LEIDMINE 2
var query = new Parse.Query(Parse.User);
query.equalTo("gender", "female");  // find all the women
query.find({
  success: function(women) {
    // Do stuff
  }
});

// SÕPRADE SALVESTAMINE
var otherUser = new Parse.Query("Follow");

// create an entry in the Follow table
var follow = new Parse.Object("Follow");
follow.set("from", Parse.User.current());
follow.set("to", otherUser);
follow.set("date", Date());
follow.save();

//
var query = new Parse.Query("Follow");
query.equalTo("from", Parse.User.current());
query.find({
  success: function(users){

}});

//HOIDISTE FILTREERIMINE
// set up our query for the Book object
var bookQuery = new Parse.Query("Book");

// configure any constraints on your query...
// tell the query to fetch all of the Author objects along with the Book
bookQuery.include("authors");

// execute the query
bookQuery.find({
  success: function(books){
    var authorList = book.get("authors");
  }});

//KASUTAJATE ARVU KUVAMINE
// set up our query for the Book object
var bookQuery = new Parse.Query("Book");

// configure any constraints on your query...
bookQuery.equalTo("authors", author);

// tell the query to fetch all of the Author objects along with the Book
bookQuery.include("authors");

// execute the query
bookQuery.find({
  success: function(books){
    //Mida tuleks teha kui see õnnestub
  }
});

//HOIDISE LISAMINE JA KUVAMINE
var user = Parse.User.current();

// Make a new post
var Post = Parse.Object.extend("Post");
var post = new Post();
post.set("title", "My New Post");
post.set("body", "This is some great content.");
post.set("user", user);
post.save(null, {
  success: function(post) {
    // Find all posts by the current user
    var query = new Parse.Query(Post);
    query.equalTo("user", user);
    query.find({
      success: function(usersPosts) {
        // userPosts contains all of the posts by the current user.
      }
    });
  }
});
