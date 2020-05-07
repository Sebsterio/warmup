/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const { addCollection, buildAlbum } = houseApp;
	const { profile } = houseConfig;
	const { allMedia } = houseState;

	function loadNewMedia(data) {
		allMedia.length = 0;
		allMedia.push(...data);
		addCollection(); // house walls
		buildAlbum(); // edit-album panel
	}

	// -------------------- init -------------------------

	// Load profile media from DB
	window.houseApp.firestore.fetch(profile, loadNewMedia);

	// ------------------- exports ---------------------

	window.houseApp.loadNewMedia = loadNewMedia;
})();
