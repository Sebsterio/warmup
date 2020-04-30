// Youtube iframe URL params
const YT_PARAMS =
	"?mute=1" +
	"&enablejsapi=1" +
	"&autoplay=1" +
	"&controls=0" +
	"&disablekb=1" + // disable keyboard actions
	"&fs=0" + // full screen button
	"&loop=1" +
	"&rel=0" + // display related videos
	"&iv_load_policy=3" + // annotations off
	"&origin=https://warmup.netlify.app"; // <- TODO check if can remove

// Initialize local state
let currentMedia;

// updateCollection(currentMedia);

(function () {
	const house = document.querySelector(".house");
	const containers = house.querySelectorAll(".media__container");

	// Create html from a media element
	function buildElement(type, link, ratio, container, windowWidth) {
		// video
		if (type === "video")
			return `<video class="video" autoplay muted loop src="${link}"></video>`;

		// image
		if (type === "image") return `<img class="image" src="${link}" alt=":)">`;

		// temp <<<<<<<<<<<<<
		// return "";

		// iframe (desktop only due to lack of autoplay on mobile)
		if (type === "YT embed" && windowWidth > 800) {
			const height = container.getBoundingClientRect().height;
			if (!ratio) ratio = 1.5;

			// https://www.youtube.com/embed/EzRfZok4tsE // current vid

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
		}

		return ""; // repeat loop for next media item
	}

	// Insert elements into each media container
	function insertMediaHtml(media) {
		const windowWidth = window.innerWidth;

		// iterate over containers separately from media items
		let item = 0;
		containers.forEach((container, i) => {
			if (!media[item]) return; // stop if ran out of media items

			// interate over media elements until an allowed one is found
			let innerHtml = "";
			while (innerHtml === "") {
				if (!media[item]) return;
				const { type, link, ratio } = media[item];
				innerHtml = buildElement(type, link, ratio, container, windowWidth);
				item++;
			}

			// add overlay
			innerHtml += `<div class="media__filter" style="--index: ${i}"></div>`;

			container.innerHTML = innerHtml;
		});
	}

	// Resize iframe on window resize
	function updateIframeSizes() {
		containers.forEach((container) => {
			const iframe = container.querySelector("iframe");
			if (!iframe) return;

			const height = container.getBoundingClientRect().height;
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

	function addCollection(data) {
		currentMedia = data;
		insertMediaHtml(data);
		mixUpVideoTime();
	}

	// --------------------- init -----------------------------

	getCollection(addCollection);
	window.addEventListener("resize", updateIframeSizes);
})();
