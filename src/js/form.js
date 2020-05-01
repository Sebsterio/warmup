(function () {
	const form = document.querySelector(".house__panel--new-link form");
	const typeInput = form.querySelector("#house__input--type");
	const ratioInput = form.querySelector("#house__input--ratio");
	const ratioLabel = form.querySelector("[for=house__input--ratio]");
	const urlInput = form.querySelector("#house__input--url");
	const preview = form.querySelector(".house__preview--media");
	const submit = form.querySelector(".house__input--submit");

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

	// Show ratio input only if video type is selected
	function updateRatioInput() {
		if (form.type.value === "YT embed") toggleRatioInput(true);
		else toggleRatioInput(false);
	}

	// Download hq image and run callback when done
	function preloadImage(url, imageLoadedCallback) {
		var img = new Image();
		img.src = url;
		img.onload = imageLoadedCallback;
	}

	// Preload media file and, if valid, display it and enable submit button
	function previewMedia(e) {
		const url = e.target.value;

		if (form.type.value === "image") {
			preloadImage(url, () => {
				preview.innerHTML = `<img src="${url}" alt="preview">`;
				submit.removeAttribute("disabled");
			});
			return;
		}
		if (form.type.value === "video") return;
		if (form.type.value === "YT embed") return;
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

		window.houseState.currentMedia = [
			newItem,
			...window.houseState.currentMedia,
		];

		window.houseFirestore.update(window.houseState.currentMedia, () => {
			alert("Love shared succesfullly");
		});

		form.reset();
		preview.innerHTML = "";
	}

	// ----------------------- Init ---------------------------

	typeInput.addEventListener("input", updateRatioInput);
	urlInput.addEventListener("input", previewMedia);
	submit.addEventListener("click", handleSubmit);

	updateRatioInput();
})();
