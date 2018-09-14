var mainApp = {};

(function() {
<<<<<<< HEAD
  var uid = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid;
      email = user.email;
      name = user.displayName;
      writeUserData(name, uid, email);
      $("#login").hide();
      $("#logout").show();
      console.log("Sign in confirmed");
      // toastNotif(name);
    } else {
      $(".tasks").hide();
      uid = null;
      // Redirect to login page
      //   window.location.replace("auth.html");
      $("#logout").hide();
      $("#login").show();
      console.log("no user logged in");
    }
  });
  // Login functionality
  const loginBtn = document.getElementById("login");
  loginBtn.addEventListener("click", e => {
    window.location.replace("auth.html");
  });
=======
	var uid = null;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			uid = user.uid;
			email = user.email;
			name = user.displayName;
			writeUserData(name, uid, email);
			$('#login').hide();
			$('#logout').show();
			console.log('Sign in confirmed');
			// toastNotif(name);
		} else {
			$('.tasks').hide();
			uid = null;
			// Redirect to login page
			//   window.location.replace("auth.html");
			$('#logout').hide();
			$('#login').show();
			console.log('no user logged in');
		}
>>>>>>> impCloudFirestore

		// Login functionality
		const loginBtn = document.getElementById('login');
		loginBtn.addEventListener('click', (e) => {
			window.location.replace('auth.html');
		});

<<<<<<< HEAD
  // Toast Notifications
  function toastNotif(name) {
    M.toast({
      classes: "idToast",
      html: "Welcome, " + name,
      completeCallback: hideNotif()
    });
  }

  // Hide Notification after displayed
  function hideNotif() {
    $(".idToast");
  }

  //  Realtime Database
  function writeUserData(name, uid, email) {
    var database = firebase.database();
    var usersRef = database.ref("users");
    var user = usersRef.child(uid);
=======
		//  Logout functinoality
		const logoutBtn = document.getElementById('logout');
		logoutBtn.addEventListener('click', (e) => {
			firebase.auth().signOut();
		});
>>>>>>> impCloudFirestore

		// Toast Notifications
		function toastNotif(name) {
			M.toast({
				classes: 'idToast',
				html: 'Welcome, ' + name,
				completeCallback: hideNotif()
			});
		}

		// Hide Notification after displayed
		function hideNotif() {
			$('.idToast');
		}

		//  Cloud firestore writing user data

		function writeUserData(name, uid, email) {
			const database = firebase.firestore();
			const settings = {
				timestampsInSnapshots: true
			};
			database.settings(settings);
			userData = database.collection('users').doc(uid).set({
				name: name,
				uid: uid,
				email: email
			});
		}
	});
})();
