(function(){
	// URL params object
	const urlParams = window.location.search.replace('?','').split('&').reduce((obj, param) => {
		param = param.split('=')
		if (param[0]) obj[param[0]] = param[1] ? param[1] : true;
		return obj
	}, {})


	// Config interface
	window.houseConfig = {
			
		// controls.js 
		controlsEnabled_default: false,  // display controls component
		
		// interactions.js 
		ZOOM_SENSITIVITY: 0.0005,
		ZOOM_MIN: 0.01,
		ROTATE_SENSITIVITY: 0.25,
		FPS: 60,
		INITIAL_TILT: -2,
		INITIAL_PIVOT: -40,
		animationSpeed_default: -0.05,
		
		// media.js 
		disableYTEmbeds_default: true,
		disableVideo_default: false,
		disableImages_default: false,
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
		
		
		// Apply URL config options if specified
		// ----------------- docs ---------------------------
		// edit        - show controls
		// speed=N     - animation speed (default: -0.05)
		// disableYT   - skip Youtube embeds
		// disableVid  - skip video files
		// disableImg  - skip images
		// --------------------------------------------------
		get controlsEnabled(){
			return urlParams.edit ? urlParams.edit : this.controlsEnabled_default
		},
		get animationSpeed(){
			return urlParams.speed ? urlParams.speed : this.animationSpeed_default
		},
		get disableYTEmbeds(){
			return urlParams.disableYT ? urlParams.disableYT : this.disableYTEmbeds_default
		},
		get disableVideo(){
			return urlParams.disableVid ? urlParams.disableVid : this.disableVideo_default
		},
		get disableImages(){
			return urlParams.disableImg ? urlParams.disableImg : this.disableImages_default
		}
	};
	// END Config interface

	// Firestore module interface
	window.houseFirestore = {};  

	// local state
	window.houseState = {
		currentMedia: [],     // Media displayed on house walls
	};
})()