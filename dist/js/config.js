/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
// -------- URL config ---------
//
// edit        - show controls
// speed=N     - animation speed (default: -0.05)
// disableYT   - skip Youtube embeds
// disableVid  - skip video files
// disableImg  - skip images

(function(){
	// Process URL params string into an object
	const urlParams = window.location.search.replace('?','').split('&').reduce((obj, param) => {
		console.log(param)
		if (param[0]) obj[param[0]] = param[1] ? param[1] : true;
		return obj
	}, {})

	// Config interface
	window.houseConfig = {
			
		// controls.js 
		controlsEnabled: urlParams.edit || false,  // display controls component
		
		// interactions.js 
		ZOOM_SENSITIVITY: 0.0005,
		ZOOM_MIN: 0.01,
		ROTATE_SENSITIVITY: 0.25,
		FPS: 60,
		animationSpeed: urlParams.speed || -0.05,
		
		// media.js 
		disableYTEmbeds: urlParams.disableYT || true,
		disableVideo: urlParams.disableVid || false,
		disableImages: urlParams.disableImg || false,
		YT_PARAMS:	          // Youtube iframe URL params
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
	};
	// END Config interface

	// Firestore module interface
	window.houseFirestore = {};  

	// local state
	window.houseState = {
		currentMedia: [],     // Media displayed on house walls
	};
})()