(function () {
	const house = document.querySelector(".house");
	const containers = house.querySelectorAll(".house__media");

	const {
		disableVideo,
		disableImages,
		disableYTEmbeds,
		forceYTEmbeds,
		interval,
		ignorePriority,
		ignorePinned,
	} = houseConfig;

	const {
		createYTEmbed,
		createVideo,
		createImage,
		preloadImage,
		preloadVideo,
	} = houseApp;

	const { allMedia } = houseState;

	let unusedMedia = []; // working copy of allMedia
	let unusableMedia = []; // IDs of media that aren't allowed

	// array of container elements and their current media
	const walls = [...containers].map((element) => ({
		element,
		media: undefined,
	}));

	// -----------------------------------------------------------------------

	// Set all usable media as unused, except currently displayed ones
	function resetUnusedMedia() {
		unusedMedia = allMedia.filter((item) => {
			const itemCurrentlyUsed = walls.find((wall) =>
				wall.media ? wall.media.id === item.id : false
			);
			const itemUnusable = unusableMedia.includes(item.id);

			if (!itemCurrentlyUsed && !itemUnusable) return item;
		});

		// if there's not enough media, allow repeats
		if (!unusedMedia.length) unusedMedia = [...allMedia];
	}

	function resetUnusableMedia() {
		unusableMedia = [];
	}

	// --------------------------- Build Album ---------------------------------

	function isMediaValid(item, filters) {
		// Check props against filters
		for (let key in filters) {
			if (filters[key] !== item[key]) return false;
		}
		// Check type against user preferences
		const { type } = item;
		if (type === "video" && !disableVideo) return true;
		if (type === "image" && !disableImages) return true;
		if (type === "YT embed") {
			if (forceYTEmbeds) return true;
			if (!disableYTEmbeds && window.innerWidth > 800) return true;
			// disabled on mobile due to lack of autoplay (bad UX)
		}
		return false;
	}

	// Interate over unused media elements until an allowed one is found
	function getNextMediaElement(filters) {
		while (unusableMedia.length < allMedia.length) {
			// If ran out of unused elements, start over
			if (!unusedMedia.length) resetUnusedMedia();

			// Remove a random item from unusedMedia and use it
			const randomIndex = Math.floor(Math.random() * unusedMedia.length);
			const randomMedia = unusedMedia.splice(randomIndex, 1)[0];

			// Break loop when a suitable element is found
			if (isMediaValid(randomMedia, filters)) return randomMedia;
			unusableMedia.push(randomMedia.id);
		}
	}

	// Create html element from a media item once file downloaded
	function buildElementAsync({ link, type, ratio }, container) {
		if (type === "image")
			preloadImage(link, () => {
				container.innerHTML = createImage(link);
			});
		if (type === "video")
			preloadVideo(link, () => {
				container.innerHTML = createVideo(link);
			});
		if (type === "YT embed")
			container.innerHTML = createYTEmbed(link, ratio, container);
	}

	// Insert a suitable element into a wall
	function insertMedia(wall, filters) {
		wall.media = getNextMediaElement(filters);
		if (wall.media) buildElementAsync(wall.media, wall.element);
	}

	// Insert an element into each wall
	function populateHouse() {
		if (!allMedia.length) return;

		// Add priority media first
		if (!ignorePriority) {
			// Arbitrary number of filters can be added here
			walls.forEach((wall) => insertMedia(wall, { priority: true }));
			resetUnusableMedia(); // no longer relevant as validation method changed
			resetUnusedMedia(); // currently used media aren't included (unless ran out)
		}

		// Add remaining media to remaining walls
		walls.forEach((wall) => {
			if (wall.media) return;
			insertMedia(wall);
		});
	}

	// ---------------------------- Secondary -----------------------------

	// Iterate through walls at an interval and change non-pinned media to a random one
	function initMediaCycling() {
		if (Number(interval) === 0) return; // user preferences exception
		let index = Math.floor(Math.random() * walls.length); // start with a random wall

		setInterval(() => {
			const wall = walls[index];
			if (ignorePinned || (wall.media && !wall.media.pinned)) insertMedia(wall);

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

	// ---------------------------- init ------------------------------------

	// Update view with new media
	function addCollection() {
		resetUnusedMedia();
		populateHouse();
		initMediaCycling();
		mixUpVideoTime();
	}

	window.addEventListener("resize", updateIframeSizes);

	// -------------------------- exports --------------------------------------

	window.houseApp.addCollection = addCollection;
})();
