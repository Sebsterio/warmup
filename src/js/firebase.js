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
		db.collection("profiles")
			.doc(profile)
			.set({ links: data }) // Note: can't update individual fields, only the whole doc
			.then(function () {
				cb();
			})
			.catch(function (error) {
				alert(
					"Dabase Error. It's not you, it's me. " +
						"Text Seb 07415880620 on Whatsapp with a screenshot of the below: \n\n" +
						error
				);
			});
	}

	// ----------------------- get ------------------------------

	function fetchCollection(profile, cb) {
		db.collection("profiles")
			.doc(profile)
			.get()
			.then((doc) => {
				if (doc.exists) {
					const links = doc.data().links;
					cb(links);
				} else {
					alert("There's no such profile!");
				}
			})
			.catch(function (error) {
				alert(
					"Database Error. " +
						"Please try again and if the problem persists, show this to Seb:\n\n" +
						error
				);
			});
		// .then((querySnapshot) => {
		// 	querySnapshot.forEach((doc) => {
		// 		const media = doc.data().collection;
		// 		cb(media);
		// 	});
		// });
	}
	// -------------------------- module exports -----------------------------

	window.houseApp.firestore = {
		update: updateCollection,
		fetch: fetchCollection,
	};
})();
