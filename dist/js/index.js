/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const {
		initInteractions,
		firestore,
		addCollection,
		buildAlbum,
		initControlsUI,
		initProfileUI,
		initNewLinkUI,
		initEditAlbumUI,
	} = houseApp;

	const { controlsEnabled, profile } = houseConfig;

	const { allMedia } = houseState;

	function loadNewMedia(data) {
		allMedia.length = 0;
		allMedia.push(...data);
		addCollection(); // house walls
		if (controlsEnabled) buildAlbum(); // edit-album panel
	}

	// ------------------ Init app ----------------------

	initInteractions();
	firestore.fetch(profile, loadNewMedia);

	if (controlsEnabled) {
		initControlsUI();
		initNewLinkUI();
		initEditAlbumUI();
		initProfileUI();
	}

	// ------------------- exports ---------------------

	window.houseApp.loadNewMedia = loadNewMedia;
})();
