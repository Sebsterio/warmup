(function (controlsEnabled) {
	if (!controlsEnabled) return;

	const controls = document.querySelector(".house__controls");
	const mainPanel = controls.querySelector(".house__panel--main");
	const buttons = controls.querySelectorAll(".house__btn");
	const newLink = controls.querySelector(".house__new-link");

	// Toggle the whole controls module
	function toggleControls(on) {
		if (on) controls.classList.add("house__config--show-controls");
		else controls.classList.remove("house__config--show-controls");
	}

	// Toggle a panel and corresponding button
	function toggleMenu(btn, menu, on) {
		if (on) {
			if (btn) btn.classList.add("house__btn--active");
			if (menu) menu.classList.add("house__panel--active");
		} else if (on === false) {
			if (btn) btn.classList.remove("house__btn--active");
			if (menu) menu.classList.remove("house__panel--active");
		} else {
			if (btn) btn.classList.toggle("house__btn--active");
			if (menu) menu.classList.toggle("house__panel--active");
		}
	}

	function handleButtonClick() {
		const target = this.dataset.target;

		if (target === "close") {
			toggleControls(false); // hide entire controls module
			return;
		}

		const activeBtn = mainPanel.querySelector(".house__btn--active");
		const activePanel = controls.querySelector(".house__panel--active");
		const targetPanel = controls.querySelector(".house__panel--" + target);

		// If nothing is open, open clicked elements immediately
		if (!activeBtn && !activePanel) {
			toggleMenu(this, targetPanel, true);
		}
		// If a menu is open, hide it and open new menu if different than current
		else {
			toggleMenu(activeBtn, activePanel, false);
			if (this !== activeBtn) {
				setTimeout(() => {
					toggleMenu(this, targetPanel, true);
				}, 400);
			}
		}
	}

	// ------------------- init -------------------

	toggleControls(true); // Show controls
	buttons.forEach((btn) => btn.addEventListener("click", handleButtonClick));
})(houseConfig.controlsEnabled);
