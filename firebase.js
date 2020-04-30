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

	// -------------------------------------------------------------------

	function updateCollection(collection) {
		db.collection("links")
			.doc("links")
			.set({ collection })
			.then(function () {
				// TODO: update state
			})
			.catch(function (error) {
				alert(
					"Dabase Error. It's not you, it's me. " +
						"Text Seb 07415880620 on Whatsapp with a screenshot of the below: \n\n" +
						error
				);
			});
	}

	function fetchCollection(cb) {
		db.collection("links")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const media = doc.data().collection;
					cb(media);
				});
			});
	}

	window.houseFirestore = {
		update: updateCollection,
		fetch: fetchCollection,
	};
})();
