(function(){
	// ----------------- URL params object -----------------
	const urlParams = window.location.search.replace('?','').split('&').reduce((obj, param) => {
		param = param.split('=');
		if (param[0]) obj[param[0]] = param[1] ? param[1] : true;
		return obj;
	}, {});


	// ----------------- Config defaults -----------------
		
	// controls.js 
	const CONTROLS_ENABLED = false;  // display controls component
	
	// interactions.js 
	const ANIMMATION_SPEED = -0.05;
	const ZOOM_SENSITIVITY = 0.0005;
	const ZOOM_MIN = 0.01;
	const ROTATE_SENSITIVITY = 0.25;
	const FPS = 60;
	const INITIAL_TILT = -2;
	const INITIAL_PIVOT = -40;
	
	// media.js 
	const DISABLE_YT = false;
	const DISABLE_VIDEO = false;
	const DISABLE_IMAGES = false;
	const YT_PARAMS =	          // Youtube iframe URL params
	"?mute=1" +
	"&enablejsapi=1" +          // control iframe video with JS
	"&autoplay=1" +
	"&controls=0" +             // video controls
	"&disablekb=1" +            // disable keyboard actions
	"&fs=0" +                   // full screen button
	"&loop=1" +
	"&rel=0" +                  // display related videos
	"&iv_load_policy=3" +       // annotations off
	"&origin=https://warmup.netlify.app"; // <- TODO check if can remove
		

	// ----------------- Config interface -----------------

	// Get URL value OR localStorage value OR default value
	function getSettings(param, defaultVal){
		return urlParams[param] !== undefined ?
		 urlParams[param] :
			localStorage.getItem(param) !== null ?
			 localStorage.getItem(param) :
			 defaultVal
	}

	window.houseConfig = {
		ZOOM_SENSITIVITY: ZOOM_SENSITIVITY,
		ZOOM_MIN: ZOOM_MIN,
		ROTATE_SENSITIVITY: ROTATE_SENSITIVITY,
		FPS: FPS,
		INITIAL_TILT: INITIAL_TILT,
		INITIAL_PIVOT: INITIAL_PIVOT,
		YT_PARAMS: YT_PARAMS,
		controlsEnabled: getSettings('edit', CONTROLS_ENABLED),
		animationSpeed: getSettings('speed', ANIMMATION_SPEED),
		disableYTEmbeds: getSettings('disableYT', DISABLE_YT),
		disableVideo: getSettings('disableVid', DISABLE_VIDEO),
		disableImages: getSettings('disableImg', DISABLE_IMAGES),
	};
	// END Config interface

	// ---------- Firestore module interface ----------
	window.houseFirestore = {};  

	// ---------------- Local state -----------------
	window.houseState = {
		currentMedia: [],     // Media displayed on house walls
	};
})()