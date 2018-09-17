var mainApp = {};

(function() {
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

		// Login functionality
		const loginBtn = document.getElementById('login');
		loginBtn.addEventListener('click', (e) => {
			window.location.replace('auth.html');
		});

		//  Logout functinoality
		const logoutBtn = document.getElementById('logout');
		logoutBtn.addEventListener('click', (e) => {
			firebase.auth().signOut();
		});

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
