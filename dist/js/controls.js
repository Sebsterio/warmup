/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function (controlsEnabled) {
	if (!controlsEnabled) return;

	const controls = document.querySelector(".house__controls");
	const panel = controls.querySelector(".house__panel");
	const btnClose = controls.querySelector(".house__btn--close");
	const btnAdd = controls.querySelector(".house__btn--add");
	const btnRemove = controls.querySelector(".house__btn--remove");
	const newLink = controls.querySelector(".house__new-link");

	btnAdd.addEventListener("click", () => {
		btnAdd.classList.toggle("house__btn--active");
		newLink.classList.toggle("house__new-link--hidden");
	});

	// Hide panel on clicking btn--close
	btnClose.addEventListener("click", () => {
		panel.classList.add("house__panel--hiding");
		btnAdd.classList.remove("house__btn--active");
		newLink.classList.add("house__new-link--hidden");

		setTimeout(() => {
			panel.classList.add("house__panel--hidden");
			panel.classList.remove("house__panel--hiding");
		}, 500);
	});

	// Show panel on mouseOver
	panel.addEventListener("mouseover", () => {
		panel.classList.remove("house__panel--hidden");
	});

	// Hide controls shortly after load
	setTimeout(() => {
		// return;
		// panel.classList.add("house__panel--hidden");
	}, 1000);
})(houseConfig.controlsEnabled);
