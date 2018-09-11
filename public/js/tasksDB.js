(function() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in
			var uid = user.uid;
			outputTasks(uid);
			writeTasks(uid);
		} else {
			// No user is signed in
		}

		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true
		};
		db.settings(settings);

		const taskTable = document.querySelector('#task_table');
		const newTaskForm = document.querySelector('#new_task_form');

		// render tasks in table
		function renderTask(doc) {
			let tr = document.createElement('tr');
			let task = document.createElement('td');

			tr.setAttribute('data-id', doc.id);
			task.textContent = doc.data().task;

			tr.appendChild(task);

			taskTable.appendChild(tr);
		}

		// Null or empty functin
		function isEmptyOrSpaces(str) {
			return str === null || str.match(/^ *$/) !== null;
		}

		// Validate task entry
		function validateTask(data) {
			if (isEmptyOrSpaces(data)) {
				alert('Please submit a valid task?!');
				return false;
			} else {
				return true;
			}
		}

		// Getting data
		function outputTasks(uid) {
			const db = firebase.firestore();
			const settings = {
				timestampsInSnapshots: true
			};
			db.settings(settings);
			db.collection('users').doc(uid).collection('tasks').onSnapshot(function(querySnapshot) {
				var tasks = [];
				querySnapshot.forEach(function(doc) {
					tasks.push(doc.data().task);
					renderTask(doc);
				});
			});
		}

		function writeTasks(uid) {
			var taskTxt = document.getElementById('new_task');
			const submitBtn = document.getElementById('submitBtn');
			var database = firebase.firestore();
			// Submit by enter button
			$('#new_task').keydown(function(e) {
				if (e.keyCode == 13) {
					e.preventDefault();
					taskData = taskTxt.value;
					if (validateTask(taskData)) {
						database
							.collection('users')
							.doc(uid)
							.collection('tasks')
							.doc()
							.set({
								task: taskData
							})
							.then($('#new_task_form').trigger('reset'), console.log('Task submitted'));
					}
				}
			});
			// Submit by pressing the add button
			submitBtn.addEventListener('click', (e) => {
				taskData = taskTxt.value;
				if (validateTask(taskData)) {
					database
						.collection('users')
						.doc(uid)
						.collection('tasks')
						.doc()
						.set({
							task: taskData
						})
						.then($('#new_task_form').trigger('reset'), console.log('Task submitted'));
				}
			});
		}
	});
})();
