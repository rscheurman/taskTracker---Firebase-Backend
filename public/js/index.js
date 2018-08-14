var mainApp = {};

(function() {
  var uid = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;
      email = user.email;
      name = user.displayName;
      writeUserData(name, uid, email);
      document.getElementById("login").style.display = "none";
      console.log("Sign in confirmed");
    } else {
      uid = null;
      // Redirect to login page
      //   window.location.replace("auth.html");
      document.getElementById("login").style.display = "show";
      console.log("no user logged in");
    }
  });
  // Login functionality
  const loginBtn = document.getElementById("login");
  loginBtn.addEventListener("click", e => {
    window.location.replace("auth.html");
  });

  //  Logout functinoality
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", e => {
    firebase.auth().signOut();
  });

  //   Realtime Database
  function writeUserData(name, uid, email) {
    var database = firebase.database();
    var usersRef = database.ref("users");
    var user = usersRef.child(uid);

    var userData = {
      name: name,
      uid: uid,
      email: email
    };
    user.update(userData);
  }
})();
