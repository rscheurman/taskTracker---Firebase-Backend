(function() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in
			var uid = user.uid;

			// writeTasks(uid);
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
			let delBtn = document.createElement('button');

			tr.setAttribute('data-id', doc.id);
			task.textContent = doc.data().task;
			delBtn.setAttribute('class', 'waves-effect waves-light btn');
			delBtn.textContent = 'x';

			tr.appendChild(task);
			tr.appendChild(delBtn);

			taskTable.appendChild(tr);

			// Deleting tasks
			delBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				let id = e.target.parentElement.getAttribute('data-id');
				db.collection('users').doc(uid).collection('tasks').doc(id).delete();
				console.log('tasks deleted');
			});
		}

		// Saving data
		newTaskForm.addEventListener('submit', (e) => {
			e.preventDefault();
			inputTxt = document.getElementById('new_task').value;
			db.collection('users').doc(uid).collection('tasks').add({
				task: inputTxt
			});
			$('#new_task_form').trigger('reset');
		});

		// Query Tasks for renderTask in real time
		db.collection('users').doc(uid).collection('tasks').onSnapshot(function(snapshot) {
			snapshot.docChanges().forEach(function(change) {
				if (change.type == 'added') {
					renderTask(change.doc);
				} else if (change.type == 'removed') {
					let tr = taskTable.querySelector('[data-id=' + change.doc.id + ']');
					taskTable.removeChild(tr);
					console.log('item removed from table');
				}
			});
		});
	});
})();
