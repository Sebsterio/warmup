/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const house = document.querySelector(".house");
	const containers = house.querySelectorAll(".house__media");

	const {
		disableVideo,
		disableImages,
		disableYTEmbeds,
		forceYTEmbeds,
		YT_PARAMS,
		interval,
	} = houseConfig;

	const { allMedia } = houseState;

	let unusedMedia = []; // working copy of allMedia
	let unusableMedia = []; // IDs of media that aren't allowed

	const walls = [...containers] // array of container elements with info on their media
		.map((element) => ({
			element, // html element
			mediaId: null, // id of currently displayed media item (id = allMedia index)
			mediaType: null,
		}));

	// -----------------------------------------------------------------------

	// Set all usable media as unused, except currently displayed ones
	function resetUnusedMedia() {
		unusedMedia = allMedia.filter((item) => {
			const itemCurrentlyUsed = walls.find((wall) => wall.mediaId === item.id);
			const itemUnusable = unusableMedia.includes(item.id);

			if (!itemCurrentlyUsed && !itemUnusable) return item;
		});

		// if there's not enough media, allow repeats
		if (!unusedMedia.length) unusedMedia = [...allMedia];
	}

	// ---------------------- HTML element creators ----------------------------

	window.createYTEmbed = function (link, ratio, container) {
		const height = Math.ceil(container.offsetHeight);
		if (!height) throw new Error("YT embed error: invalid container");
		if (!ratio) ratio = 1.8;

		const linkMain = link.split("?");
		const videoId = linkMain[0] // neded for loop to work
			.replace("https://www.youtube.com/embed/", "")
			.match(/[^\?\/]+/);
		const params = YT_PARAMS + "&playlist=" + videoId;
		const url = linkMain[0] + params;

		return `<div class="embed"><iframe
			data-ratio="${ratio}"
			width="${height * ratio}px"
			height="${height}px"
			src="${url}"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		></iframe></div>`;
	};

	function createVideo(link) {
		return `<video class="video" autoplay muted loop src="${link}"></video>`;
	}

	function createImage(link) {
		return `<img class="image" src="${link}" alt=":)">`;
	}

	// --------------------------- Build Album ---------------------------------

	// Create html from a media element
	function buildElement({ link, type, ratio }, container) {
		switch (type) {
			case "video":
				return createVideo(link);
			case "image":
				return createImage(link);
			case "YT embed":
				return createYTEmbed(link, ratio, container);
			default:
				return "";
		}
	}

	function validateMedia(type) {
		if (type === "video" && !disableVideo) return true;
		if (type === "image" && !disableImages) return true;
		if (type === "YT embed") {
			if (forceYTEmbeds) return true;
			// disable on mobile due to lack of autoplay (bad UX)
			if (!disableYTEmbeds && window.innerWidth > 800) return true;
		}
		return false;
	}

	// TEMP - TODO: use persistent id instead
	function getIndex(element, media) {
		return media.findIndex((el) => el === element);
	}

	// Interate over unused media elements until an allowed one is found
	function buildRandomMediaElement(wall) {
		let done = false;
		while (!done) {
			// If ran out of unused elements, start over
			if (!unusedMedia.length) resetUnusedMedia();

			// Remove a random item from unusedMedia and use it
			const randomIndex = Math.floor(Math.random() * unusedMedia.length);
			const randomMedia = unusedMedia.splice(randomIndex, 1)[0];

			const { type, id } = randomMedia;

			// Attempt to build an element from the random media item
			if (validateMedia(type)) {
				const container = wall.element;
				container.innerHTML = buildElement(randomMedia, container);
				wall.mediaId = id;
				wall.mediaType = type;
				done = true; // break loop
			}
			// Mark item as unusable and loop
			else unusableMedia.push(id);
		}
	}

	// Insert an element into each wall
	function insertMediaHtml() {
		if (!allMedia.length) return;
		walls.forEach((wall) => buildRandomMediaElement(wall));
	}

	// ---------------------------- Secondary -----------------------------

	// Iterate through walls at an interval and change media to a random one
	function initCycleMedia() {
		if (Number(interval) === 0) return;

		// start with a random wall
		let index = Math.floor(Math.random() * walls.length);

		setInterval(() => {
			const wall = walls[index];
			buildRandomMediaElement(wall);
			index = index < walls.length - 1 ? index + 1 : 0; // increment and loop
		}, Number(interval));
	}

	// Desynchronize videos
	function mixUpVideoTime() {
		const vids = house.querySelectorAll("video");
		vids.forEach((vid, i) => {
			vid.currentTime += i * 5;
		});
	}

	// Resize iframe on window resize
	function updateIframeSizes() {
		walls.forEach((wall) => {
			const container = wall.element;
			const iframe = container.querySelector("iframe");
			if (!iframe) return;

			const height = Math.ceil(container.offsetHeight);
			const ratio = iframe.dataset.ratio;

			iframe.width = height * ratio;
			iframe.height = height;
		});
	}

	// ----------------------------- Init -----------------------------------

	function addCollection(data) {
		allMedia.push(...data);
		resetUnusedMedia();
		insertMediaHtml();
		initCycleMedia();
		mixUpVideoTime();
	}

	window.houseFirestore.fetch(addCollection);
	window.addEventListener("resize", updateIframeSizes);
})();
