firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function createUser()
{
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}

// //does not work
// //doc link https://firebase.google.com/docs/auth/web/google-signin?authuser=0
// function googleSignIn(){
//   var provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithRedirect().then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });
// }

// googleSignIn=()=> {
//   var base_provider = new firebase.auth.GoogleAuthProvider()
//   firebase.auth().signInWithPopup(base_provider).then(function(result){
//   console.log(result)
//   console.log("Google Account Opened Successfully")
//   }).catch(function(err){
//   console.log(err)
//   console.log("Failed to Sign In with Google Account")
//   })
// }

function googleSignIn() {
  function newLoginHappened(user) {
    if(user) {
      // User is Signed In
      app(user);
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }

  firebase.auth().onAuthStateChanged(newLoginHappened);
}

function app(user) {
  //user.displayName
  //user.email
  //user.photoURL
  //user.uid

  document.getElementById("clientName").innerHTML = user.displayName;
}

function logout(){
  firebase.auth().signOut();
}
