(function () {
	const ZOOM_SENSITIVITY = -0.0005;

	const root = document.documentElement;

	let scale = 1;

	function zoomHouse(e) {
		scale += e.deltaY * ZOOM_SENSITIVITY;
		if (scale < 0.1) scale = 0.1;
		root.style.setProperty(`--scale`, scale);
	}

	window.addEventListener("wheel", zoomHouse);

	// -------------------------------------------------------

	// let canPropUpdate = false;

	// function toggleCanPropUpdate(e) {
	// 	canPropUpdate = e.type == "mousedown" ? true : false;
	// }

	// function updatePropValue(e, inputEl) {
	// 	if (
	// 		(e && e.type == "mousemove" && canPropUpdate) ||
	// 		(e && e.type == "touchmove") ||
	// 		(e && e.type == "change") || // picker tool & keyboard
	// 		!e // setting initial values
	// 	) {
	// 		if (!inputEl) inputEl = this;
	// 		const suffix = inputEl.dataset.sizing || "";
	// 		document.documentElement.style.setProperty(
	// 			`--${inputEl.name}`,
	// 			inputEl.value + suffix
	// 		);
	// 	}
	// }

	// const inputEls = document.querySelectorAll(".controls input");
	// inputEls.forEach((inputEl) => {
	// 	updatePropValue(null, inputEl);
	// 	inputEl.addEventListener("mousedown", toggleCanPropUpdate);
	// 	inputEl.addEventListener("mouseup", toggleCanPropUpdate);
	// 	inputEl.addEventListener("mousemove", updatePropValue);
	// 	inputEl.addEventListener("touchmove", updatePropValue);
	// 	inputEl.addEventListener("change", updatePropValue);
	// });
})();
