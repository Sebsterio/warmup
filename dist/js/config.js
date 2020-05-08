/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function(){
	// URL params object
	const urlParams = window.location.search
		.replace('?','').split('&')
		.reduce((obj, param) => {
			param = param.split('=');
			if (param[0]==='edit') param[0] = 'ui'; // TEMP
			if (param[0]) obj[param[0]] = param[1] ? param[1] : true;
			return obj;
		}, {});
		
	// Get URL value OR localStorage value OR default value
	function getPreference(param, defaultVal){
		return urlParams[param] !== undefined ?
		urlParams[param] :
		localStorage.getItem(param) !== null ?
		localStorage.getItem(param) :
		defaultVal;
	}

	// Youtube iframe URL params
	const YT_PARAMS =	            
		"?mute=1" +                   // mute
		"&enablejsapi=1" +            // control iframe video with JS
		"&autoplay=1" +               // autoplay
		"&controls=0" +               // video controls
		"&disablekb=1" +              // disable keyboard actions
		"&fs=0" +                     // full screen button
		"&loop=1" +                   // loop
		"&rel=0" +                    // display related videos
		"&iv_load_policy=3" +         // annotations off
		"&origin=https://warmup.netlify.app"; // <- TODO check if can remove
		
	// ----------------- Config interface -----------------
	
	window.houseConfig = {
		// controls.js 
		controlsEnabled: getPreference('ui', false),
			
		// interactions.js 
		ZOOM_SENSITIVITY:   0.0005,
		ZOOM_MIN:           0.01,
		ROTATE_SENSITIVITY: 0.25,
		FPS:                60,
		INITIAL_TILT:       -2,
		INITIAL_PIVOT:      -40,
		YT_PARAMS:          YT_PARAMS,
		animationSpeed:     getPreference('speed', -0.05),

		// media.js 
		disableYTEmbeds:getPreference('disableYT', false), // disable YT embeds on PC (on mobile disabled by default)
		forceYTEmbeds:  getPreference('forceYT', false), // enable YT embeds regardless of screen size (priority)
		disableVideo:   getPreference('disableVid', false),
		disableImages:  getPreference('disableImg', false),
		interval:       getPreference('interval', 1000),
		ignorePriority: getPreference('ignorePriority', false),
		ignorePinned:   getPreference('ignorePinned', false),

		// profile.js
		profile:         getPreference('house', ''),
	};

	// ---------------------- State ------------------------
	window.houseState = {
		allMedia: [],           // Local copy of database
	};
})();


