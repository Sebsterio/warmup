/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const form = document.querySelector(".house__panel--new-link form");
	const typeInput = form.querySelector("#house__input--type");
	const ratioInput = form.querySelector("#house__input--ratio");
	const ratioLabel = form.querySelector("[for=house__input--ratio]");
	const ratioDisplay = form.querySelector(".house__ratio-display");
	const urlInput = form.querySelector("#house__input--url");
	const preview = form.querySelector(".house__preview--media");
	const submit = form.querySelector(".house__input--submit");
	comments = form.querySelectorAll(".house__preview-comment");

	// -----------------------------------------------------

	function toggleRatioInput(on) {
		if (on) {
			ratioInput.removeAttribute("hidden");
			ratioLabel.removeAttribute("hidden");
		} else {
			ratioInput.setAttribute("hidden", true);
			ratioLabel.setAttribute("hidden", true);
		}
	}

	function switchComment(commentName) {
		comments.forEach((span) => {
			if (span.classList.contains("house__preview-comment--" + commentName))
				span.removeAttribute("hidden");
			else span.setAttribute("hidden", true);
		});
	}

	// Show ratio input only if video type is selected
	function handleTypeInput() {
		if (form.type.value === "YT embed") {
			toggleRatioInput(true);
			switchComment("embed");
		} else {
			toggleRatioInput(false);
			switchComment("source");
		}
	}

	function handleRatioInput(e) {
		ratioDisplay.innerText = e.target.value;
	}

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
		videoEl.onloadedmetadata = (e) => cb();
	}

	// Remove anything other than src string
	function cleanYTembedURL(url) {
		return url.replace(/[^]+src="/, "").replace(/"[^]+$/, "");
	}

	// Preload media file and, if valid, display it and enable submit button
	function previewMedia(e) {
		submit.setAttribute("disabled", true);

		let url = e.target.value;

		if (form.type.value === "image") {
			preloadImage(url, () => {
				preview.innerHTML = `<img src="${url}" alt="preview">`;
				submit.removeAttribute("disabled");
			});
			return;
		}
		if (form.type.value === "video") {
			preloadVideo(url, () => {
				preview.innerHTML = `<video class="video" autoplay muted loop src="${url}"></video>`;
				submit.removeAttribute("disabled");
			});
			return;
		}
		if (form.type.value === "YT embed") {
			const cleanURL = cleanYTembedURL(url);
			preview.innerHTML = window.createYTEmbed(preview, cleanURL);
			submit.removeAttribute("disabled");
			return;
		}
	}

	// Add new image to localState and push localState to DB
	function handleSubmit(e) {
		e.preventDefault();

		const newItem = {
			type: form.type.value,
			name: form.name.value,
			link: form.url.value,
			ratio: form.ratio.value,
		};
		if (form.type.value === "YT embed") {
			newItem.link = cleanYTembedURL(form.url.value);
		}
		// window.houseState.allMedia = [
		// 	newItem,
		// 	...window.houseState.allMedia,
		// ];
		window.houseState.allMedia.push(newItem);
		window.houseFirestore.update(window.houseState.allMedia, () => {
			alert("Love shared succesfullly");
		});

		form.reset();
		preview.innerHTML = "";
	}

	// ----------------------- Init ---------------------------

	typeInput.addEventListener("input", handleTypeInput);
	ratioInput.addEventListener("input", handleRatioInput);
	urlInput.addEventListener("input", previewMedia);
	submit.addEventListener("click", handleSubmit);

	handleTypeInput();
})();
