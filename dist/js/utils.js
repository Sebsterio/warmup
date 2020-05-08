/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const { YT_PARAMS, profile } = houseConfig;

	// ---------------------- HTML element creators ----------------------------

	function createYTEmbed(link, ratio, container) {
		if (!container) throw new Error("YT embed error: invalid container");

		const height = Math.ceil(container.offsetHeight);
		if (!ratio) ratio = 1.8;

		const linkMain = link.split("?")[0];
		const videoId = linkMain // neded for loop to work
			.replace("https://www.youtube.com/embed/", "")
			.match(/[^\?\/]+/);
		const params = YT_PARAMS + "&playlist=" + videoId;
		const url = linkMain + params;

		return `<div class="embed"><iframe
			data-ratio="${ratio}"
			width="${height * ratio}px"
			height="${height}px"
			src="${url}"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		></iframe></div>`;
	}

	function createVideo(link) {
		return `<video class="video" autoplay muted loop src="${link}"></video>`;
	}

	function createImage(link) {
		return `<img class="image" src="${link}" alt=":)">`;
	}

	// -------------------------- Preload Media --------------------------------

	// Download image and run callback when done
	function preloadImage(url, cb) {
		var img = new Image();
		img.src = url;
		img.onload = cb;
	}

	// Download video and run callback when done
	function preloadVideo(url, cb) {
		const videoEl = document.createElement("video");
		videoEl.src = url;
		videoEl.onloadedmetadata = () => cb();
	}

	// ------------------------- Authentication --------------------------------

	// Authenticate user on base profile only (profile = "")
	function authenticateUser() {
		if (profile) return true;
		if (localStorage.getItem("isAuthenticated")) return true;

		const pw = prompt("Warm up in the ... ?").toLowerCase();
		if (pw === "woods") {
			localStorage.setItem("isAuthenticated", true);
			return true;
		}
		alert(
			"Sorry, wrong password. The changes you make won't sync. " +
				"Feel free to create your own profile. " +
				"You can copy this album using the backup buttons."
		);
		return false;
	}

	// ---------------------- exports ---------------------

	window.houseApp = {
		createYTEmbed,
		createVideo,
		createImage,
		preloadImage,
		preloadVideo,
		authenticateUser,
	};
})();
