/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
let houseState = {
	currentMedia: [],       // Media displayed on house walls
};

let houseFirestore = {};  // Firestore interface

let houseConfig = {

	// ---------- interactions.js ---------- 

	ZOOM_SENSITIVITY: 0.0005,
	ZOOM_MIN: 0.01,
	ROTATE_SENSITIVITY: 0.25,
	FPS: 60,
	animationSpeed: 0, //-0.05,

	// ----------  media.js ---------- 

	disableYTEmbeds: true,
	disableVideo: false,
	disableImages: false,
	YT_PARAMS:	            // Youtube iframe URL params
		"?mute=1" +
		"&enablejsapi=1" +    // control iframe video with JS
		"&autoplay=1" +
		"&controls=0" +       // video controls
		"&disablekb=1" +      // disable keyboard actions
		"&fs=0" +             // full screen button
		"&loop=1" +
		"&rel=0" +            // display related videos
		"&iv_load_policy=3" + // annotations off
		"&origin=https://warmup.netlify.app", // <- TODO check if can remove

	// ----------  controls.js ---------- 

	controlsEnabled: true,  // display controls component
};
