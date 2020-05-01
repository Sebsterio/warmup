/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function (controlsEnabled) {
	if (!controlsEnabled) return;

	const controls = document.querySelector(".house__controls");
	const panel = controls.querySelector(".house__panel");
	const btnClose = controls.querySelector(".house__btn--close");
	const btnAdd = controls.querySelector(".house__btn--add");
	// const btnRemove = controls.querySelector(".house__btn--remove");
	const newLink = controls.querySelector(".house__new-link");

	function toggleControls(on) {
		if (on) controls.classList.add("house__config--show-controls");
		else controls.classList.remove("house__config--show-controls");
	}

	function toggleMenu(on, btn, menu) {
		if (on) {
			btn.classList.add("house__btn--active");
			menu.classList.remove("house__new-link--hidden");
		} else if (on === false) {
			btn.classList.remove("house__btn--active");
			menu.classList.add("house__new-link--hidden");
		} else {
			btn.classList.toggle("house__btn--active");
			menu.classList.toggle("house__new-link--hidden");
		}
	}

	function hideCurrentPanel() {
		panel
			.querySelector(".house__btn--active")
			.classList.remove(".house__btn--active");
	}

	// ------------------- init -------------------

	btnAdd.addEventListener("click", () => {
		toggleMenu(null, btnAdd, newLink);
	});
	btnClose.addEventListener("click", () => {
		toggleControls(false); // Hide controls on clicking btn--close
	});

	toggleControls(true); // Show controls
})(houseConfig.controlsEnabled);
