/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const house = document.querySelector(".house");
	const containers = house.querySelectorAll(".house__media");

	const {
		disableVideo,
		disableImages,
		forceYTEmbeds,
		YT_PARAMS,
		interval,
	} = houseConfig;

	let { disableYTEmbeds } = houseConfig;

	const { allMedia } = houseState;

	let unusedMedia = []; // working copy of allMedia
	let currentMedia = []; // indices of currently displayed media; reflects containers array
	let unusableMedia = []; // indices of media that aren't allowed

	// -----------------------------------------------------------------------

	// Set all usable media as unused, except currently displayed ones
	function resetUnusedMedia() {
		unusedMedia = allMedia.filter((item, index) => {
			if (!currentMedia.includes(index) && !unusableMedia.includes(index))
				return item;
		});

		// if there's not enough media, allow repeats
		if (!unusedMedia.length) unusedMedia = [...allMedia];
	}

	// ---------------------- HTML element creators ----------------------------

	window.createYTEmbed = function (link, ratio, container) {
		const height = Math.ceil(container.offsetHeight);
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
	function buildElement(type, link, ratio, container) {
		if (type === "video" && !disableVideo) return createVideo(link);
		if (type === "image" && !disableImages) return createImage(link);
		if (type === "YT embed" && !disableYTEmbeds) {
			return createYTEmbed(link, ratio, container);
		}

		return ""; // repeat loop for next media item
	}

	function getIndex(element, media) {
		return media.findIndex((el) => el === element);
	}

	// Interate over media elements until an allowed one is found
	function buildRandomMediaElement(container, containerIndex) {
		let html = "";
		let randomMedia;

		while (html === "") {
			// If ran out of unused elements, start over
			if (!unusedMedia.length) resetUnusedMedia();

			// Remove a random element from unusedMedia and use it
			const randomIndex = Math.floor(Math.random() * unusedMedia.length);
			randomMedia = unusedMedia.splice(randomIndex, 1)[0];

			// Attempt to build an element from the random media link
			const { type, link, ratio } = randomMedia;
			html = buildElement(type, link, ratio, container);

			// Take note of the index of the media used
			const mediaIndex = getIndex(randomMedia, allMedia);
			if (html === "") unusableMedia.push(mediaIndex);
			else currentMedia[containerIndex] = mediaIndex;
		}

		return html;
	}

	// Insert an element into each media container
	function insertMediaHtml() {
		if (!allMedia.length) return;
		containers.forEach((container, containerIndex) => {
			container.innerHTML = buildRandomMediaElement(container, containerIndex);
		});
	}

	// ---------------------------- Secondary -----------------------------

	// Iterate through containers at an interval and change media to a random one
	function initCycleMedia() {
		if (Number(interval) === 0) return;

		// start with a random container
		let containerIndex = Math.floor(Math.random() * containers.length);

		setInterval(() => {
			const container = containers[containerIndex];
			container.innerHTML = buildRandomMediaElement(container, containerIndex);
			containerIndex++;
			if (containerIndex >= containers.length) containerIndex = 0;
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
		containers.forEach((container) => {
			const iframe = container.querySelector("iframe");
			if (!iframe) return;

			const height = Math.ceil(container.offsetHeight);
			const ratio = iframe.dataset.ratio;

			iframe.width = height * ratio;
			iframe.height = height;
		});
	}

	// Disable YT embeds on mobile due to lack of autoplay (bad UX)
	function toggleYTEmbeds() {
		if (forceYTEmbeds) disableYTEmbeds = false;
		else if (window.innerWidth > 800)
			disableYTEmbeds = houseConfig.disableYTEmbeds;
		else disableYTEmbeds = true;
	}

	// ----------------------------- Init -----------------------------------

	function addCollection(data) {
		allMedia.push(...data);
		currentMedia.length = containers.length;

		resetUnusedMedia();
		insertMediaHtml();
		initCycleMedia();
		mixUpVideoTime();
		toggleYTEmbeds();
	}

	function handleResize() {
		updateIframeSizes();
		toggleYTEmbeds();
	}

	window.houseFirestore.fetch(addCollection);
	window.addEventListener("resize", handleResize);
})();
