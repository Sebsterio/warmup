/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const { profile } = window.houseConfig;
	const { firestore } = window.houseApp;

	const form = document.querySelector(".house__panel--new-link form");
	const typeInput = form.querySelector("#house__input--type");
	const ratioInput = form.querySelector("#house__input--ratio");
	const ratioLabel = form.querySelector("[for=house__input--ratio]");
	const ratioDisplay = form.querySelector(".house__ratio-display");
	const urlInput = form.querySelector("#house__input--url");
	const preview = form.querySelector(".house__preview--media");
	const submit = form.querySelector(".house__button--submit");
	const comments = form.querySelectorAll(".house__preview-comment");

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

	// Remove anything other than src string
	function cleanYTembedURL(url) {
		return url.replace(/[^]+src="/, "").replace(/"[^]+$/, "");
	}

	function toggleSubmitButton(on) {
		if (on) {
			submit.removeAttribute("disabled");
			submit.value = "Add Love";
		} else {
			submit.setAttribute("disabled", true);
			submit.value = "Link not valid";
		}
	}

	// Preload media file and, if valid, display it and enable submit button
	function previewMedia(e) {
		toggleSubmitButton(false);

		let url = e.target.value;

		if (form.type.value === "image") {
			window.houseApp.preloadImage(url, () => {
				preview.innerHTML = `<img src="${url}" alt="preview">`;
				toggleSubmitButton(true);
			});
		} else if (form.type.value === "video") {
			window.houseApp.preloadVideo(url, () => {
				preview.innerHTML = `<video class="video" autoplay muted loop src="${url}"></video>`;
				toggleSubmitButton(true);
			});
		} else if (form.type.value === "YT embed") {
			const cleanURL = cleanYTembedURL(url);
			const ratio = form.ratio.value;
			preview.innerHTML = window.createYTEmbed(cleanURL, ratio, preview);
			toggleSubmitButton(true);
		}
	}

	function createNewItem() {
		const item = {
			id: "_" + Math.random().toString(36).substr(2, 9),
			type: form.type.value,
			description: form.description.value,
			link: form.url.value,
		};
		if (form.type.value === "YT embed") {
			item.link = cleanYTembedURL(form.url.value);
			item.ratio = form.ratio.value;
		}
		return item;
	}

	// Add new item to local state and sync with DB
	function handleSubmit(e) {
		e.preventDefault();
		const { allMedia } = window.houseState;

		// Add item to local state
		const newItem = createNewItem();
		allMedia.push(newItem);

		// Save & sync
		firestore.update(profile, allMedia, () => {
			alert("Love shared succesfullly");
			form.reset();
			preview.innerHTML = "";
		});

		// Update the edit-album panel
		houseApp.buildAlbum();
	}

	// ----------------------- Init ---------------------------

	function initNewLinkUI() {
		typeInput.addEventListener("input", handleTypeInput);
		ratioInput.addEventListener("input", handleRatioInput);
		urlInput.addEventListener("input", previewMedia);
		form.addEventListener("submit", handleSubmit);

		handleTypeInput();
	}

	// ---------------------- Exports ---------------------------

	window.houseApp.initNewLinkUI = initNewLinkUI;
})();
