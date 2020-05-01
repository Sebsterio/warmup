(function (controlsEnabled) {
	if (!controlsEnabled) return;

	const controls = document.querySelector(".house__controls");
	const mainPanel = controls.querySelector(".house__panel--main");
	const buttons = controls.querySelectorAll(".house__btn");

	// Toggle the whole controls module
	function toggleControls(on) {
		if (on) controls.classList.add("house__config--show-controls");
		else controls.classList.remove("house__config--show-controls");
	}

	function toggleElement(element, on, activeClass) {
		if (!element) return;
		if (on) element.classList.add(activeClass);
		else if (on === false) element.classList.remove(activeClass);
		else element.classList.toggle(activeClass);
	}

	function toggleMenu(menu, on) {
		toggleElement(menu, on, "house__panel--active");
	}

	function toggleButton(btn, on) {
		toggleElement(btn, on, "house__btn--active");
	}

	function handleButtonClick() {
		const target = this.dataset.target;

		if (target === "close") {
			toggleControls(false);
			return;
		}

		const activeBtn = mainPanel.querySelector(".house__btn--active");
		const activePanel = controls.querySelector(".house__panel--active");
		const targetPanel = controls.querySelector(".house__panel--" + target);

		// If anything's not open, open clicked elements immediately
		if (!activeBtn || !activePanel) {
			toggleButton(this, true);
			toggleMenu(targetPanel, true);
		}
		// If a menu is open, hide it and open new menu if different than current
		else {
			toggleButton(this, false);
			toggleMenu(targetPanel, false);
			if (this !== activeBtn) {
				toggleButton(this, true);
				setTimeout(() => {
					toggleMenu(targetPanel, true);
				}, 400);
			}
		}
	}

	// ------------------- init -------------------

	toggleControls(true); // Show controls
	buttons.forEach((btn) => btn.addEventListener("click", handleButtonClick));
})(houseConfig.controlsEnabled);
