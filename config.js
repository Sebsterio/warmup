let houseState = {
	currentMedia: [],
};
let houseFirestore = {};

let houseConfig = {
	// interactions.js
	ZOOM_SENSITIVITY: 0.0005,
	ZOOM_MIN: 0.01,
	ROTATE_SENSITIVITY: 0.25,
	FPS: 60,
	canAnimate: false,

	// media.js
	disableYTEmbeds: true,
	disableVideo: false,
	disableImages: false,
	// Youtube iframe URL params
	YT_PARAMS:
		"?mute=1" +
		"&enablejsapi=1" +
		"&autoplay=1" +
		"&controls=0" +
		"&disablekb=1" + // disable keyboard actions
		"&fs=0" + // full screen button
		"&loop=1" +
		"&rel=0" + // display related videos
		"&iv_load_policy=3" + // annotations off
		"&origin=https://warmup.netlify.app", // <- TODO check if can remove

	// controls.js
	controlsEnabled: true,
};
