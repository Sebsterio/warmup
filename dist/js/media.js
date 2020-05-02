/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const house = document.querySelector(".house");
	const containers = house.querySelectorAll(".house__media");

	const {
		disableYTEmbeds,
		disableVideo,
		disableImages,
		YT_PARAMS,
		interval,
	} = houseConfig;

	let unusedMedia = []; // working copy of allMedia
	let currentMedia = []; // indices of currently displayed media
	let unusableMedia = []; // indices of media that aren't allowed

	let windowWidth = window.innerWidth;

	// ---------------------------------------------------------------------

	window.createYTEmbed = function (container, link, ratio) {
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

	// Create html from a media element
	function buildElement(type, link, ratio, container) {
		// video
		if (type === "video" && !disableVideo)
			return `<video class="video" autoplay muted loop src="${link}"></video>`;

		// image
		if (type === "image" && !disableImages)
			return `<img class="image" src="${link}" alt=":)">`;

		// iframe (desktop only due to lack of autoplay on mobile)
		if (type === "YT embed" && !disableYTEmbeds && windowWidth > 800) {
			return createYTEmbed(container, link, ratio);
		}

		return ""; // repeat loop for next media item
	}

	// Set all usable media as unused, except currently displayed ones
	function resetUnusedMedia(media) {
		unusedMedia = media.filter((item, index) => {
			if (!currentMedia.includes(index) && !unusableMedia.includes(index))
				return item;
		});

		// if there's not enough media, allow repeats
		if (!unusedMedia.length) unusedMedia = [...media];
	}

	function getIndex(element, media) {
		return media.findIndex((el) => el === element);
	}

	// interate over media elements until an allowed one is found
	function buildRandomMediaElement(media, container) {
		let html = "";
		let randomMedia;

		while (html === "") {
			// If ran out of unused elements, start over
			if (!unusedMedia.length) resetUnusedMedia(media);

			// Remove a random element from unusedMedia and use it
			const randomIndex = Math.floor(Math.random() * unusedMedia.length);
			randomMedia = unusedMedia.splice(randomIndex, 1)[0];

			// Attempt to build an element from the random media link
			const { type, link, ratio } = randomMedia;
			html = buildElement(type, link, ratio, container);

			// Take note of the index of the media used
			const mediaIndex = getIndex(randomMedia, media);
			if (html === "") unusableMedia.push(mediaIndex);
			else currentMedia.push(mediaIndex);
		}

		return html;
	}

	// Insert an element into each media container
	function insertMediaHtml(media) {
		if (!media.length) return;
		containers.forEach((container) => {
			container.innerHTML = buildRandomMediaElement(media, container);
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

	// Desynchronize videos
	function mixUpVideoTime() {
		const vids = house.querySelectorAll("video");
		vids.forEach((vid, i) => {
			vid.currentTime += i * 5;
		});
	}

	function initRandomizeMedia(media) {
		// start with a random container
		let index = Math.floor(Math.random() * containers.length);

		setInterval(() => {
			const container = containers[index];
			container.innerHTML = buildRandomMediaElement(media, container);

			index++;
			if (index >= containers.length) index = 0;
		}, interval);
	}

	function addCollection(data) {
		houseState.media = data;
		resetUnusedMedia(houseState.media);
		insertMediaHtml(houseState.media);
		mixUpVideoTime();
		initRandomizeMedia(houseState.media);
	}

	function handleResize() {
		windowWidth = window.innerWidth;
		updateIframeSizes();
	}

	// --------------------- init -----------------------------

	window.houseFirestore.fetch(addCollection);
	window.addEventListener("resize", handleResize);
})();
