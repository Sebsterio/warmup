/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const config = {
		apiKey: "AIzaSyAtzwYGkfDIkBbZf-INRcZTHItg0OeFR9g",
		authDomain: "warmup-79f01.firebaseapp.com",
		databaseURL: "https://warmup-79f01.firebaseio.com",
		projectId: "warmup-79f01",
		storageBucket: "warmup-79f01.appspot.com",
		messagingSenderId: "317372064069",
		appId: "1:317372064069:web:bbcc6397bcda7c81509e2c",
		measurementId: "G-D1TQ511Z81",
	};

	// Initialize Firebase
	firebase.initializeApp(config);
	firebase.analytics();
	const db = firebase.firestore();

	// ------------------------------- post ------------------------------------

	function updateCollection(profile, data, cb) {
		if (!window.houseApp.authenticateUser()) return;
		const profileToLoad = profile ? profile : "wuitw";
		db.collection("profiles")
			.doc(profileToLoad)
			.set({ links: data }) // Note: can't update individual fields, only the whole doc
			.then((function () {
				localStorage.setItem("auto-backup", JSON.stringify(data));
				if (cb) cb();
			}))
			.catch((function (error) {
				alert(
					"Dabase Error. It's not you, it's me. " +
						"Text Seb 07415880620 on Whatsapp with a screenshot of the below: \n\n" +
						error
				);
			}));
	}

	// ----------------------- get ------------------------------

	function fetchCollection(profile, cb) {
		const profileToLoad = profile ? profile : "wuitw";
		db.collection("profiles")
			.doc(profileToLoad)
			.get()
			.then((doc) => {
				if (doc.exists) {
					const links = doc.data().links;
					cb(links);
				} else {
					alert("A new house has been built!");
				}
			})
			.catch((function (error) {
				alert(
					"Database Sync Error. Showing locally saved media. Refresh page to try again." +
						"If the problem persists, show this to Seb:\n\n" +
						error
				);
				const dataBackup = JSON.parse(localStorage.getItem(key));
				cb(dataBackup);
			}));
	}
	// -------------------------- module exports -----------------------------

	window.houseApp.firestore = {
		update: updateCollection,
		fetch: fetchCollection,
	};
})();
