(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid;
    } else {
      // No user is signed in.
    }
		
		

		
  });
})();
