(function () {
	// props
	const {
		ZOOM_SENSITIVITY,
		ZOOM_MIN,
		ROTATE_SENSITIVITY,
		FPS,
		INITIAL_TILT,
		INITIAL_PIVOT,
		animationSpeed,
	} = houseConfig;

	// CSS transform vars
	let rotateX = INITIAL_TILT;
	let rotateY = INITIAL_PIVOT;
	let scale = 1;

	// aux
	let newRotateX;
	let newRotateY;

	// input vars
	let refX, refY, curX, curY, deltaX, deltaY;
	let canRotate = false;

	// elements
	const app = document.documentElement.querySelector(".house__app");

	// -------------------- VIEW --------------------------

	// Update view
	function rotateHouse(x, y) {
		if (x !== null) app.style.setProperty("--x", x); // unit added in css
		if (y !== null) app.style.setProperty("--y", y); // unit added in css
	}

	function zoomHouse(scale) {
		app.style.setProperty("--scale", scale);
	}

	// ---------------------- MODEL -------------------------

	// Get mouse/touch coords relative to doc
	function getCoords(e) {
		return [
			e.pageX || (e.touches ? Math.floor(e.changedTouches[0].pageX) : 0),
			e.pageY || (e.touches ? Math.floor(e.changedTouches[0].pageY) : 0),
		];
	}

	function handleMouseDown(e) {
		if (e.target.closest(".house__controls")) return; // ignore if clicked on controls
		e.preventDefault();

		canRotate = true; // Enable input
		[refX, refY] = getCoords(e); // Set mouse reference point
	}

	function handleMouseUp(e) {
		if (!canRotate) return;
		canRotate = false; // Disable input

		// Set new angle as current
		rotateX = newRotateX;
		rotateY = newRotateY;
	}

	// Rotate on mouseMove
	function handleMove(e) {
		if (
			(e && e.type == "mousemove" && canRotate) ||
			(e && e.type == "touchmove")
		) {
			// mouse / touch coords
			[curX, curY] = getCoords(e);
			[deltaX, deltaY] = [curX - refX, curY - refY];

			// CSS rotate vars
			newRotateX = rotateX - deltaY * ROTATE_SENSITIVITY;
			newRotateY = rotateY + deltaX * ROTATE_SENSITIVITY;

			rotateHouse(newRotateX, newRotateY);
		}
	}

	// Zoom on scroll
	function handleWheel(e) {
		scale = scale + e.deltaY * -1 * ZOOM_SENSITIVITY;
		if (scale < ZOOM_MIN) scale = ZOOM_MIN; // minimum

		zoomHouse(scale);
	}

	function initAnimation() {
		setInterval(() => {
			if (animationSpeed !== 0 && !canRotate) {
				rotateY += Number(animationSpeed);
				rotateHouse(null, rotateY);
			}
		}, 1000 / FPS);
	}

	// ----------------- CONTROLLER ----------------------

	app.addEventListener("mousedown", handleMouseDown);
	app.addEventListener("touchstart", handleMouseDown);
	app.addEventListener("mouseup", handleMouseUp);
	app.addEventListener("mouseleave", handleMouseUp);
	app.addEventListener("touchend", handleMouseUp);
	app.addEventListener("touchcancel", handleMouseUp);
	app.addEventListener("mousemove", handleMove);
	app.addEventListener("touchmove", handleMove);
	app.addEventListener("wheel", handleWheel);

	zoomHouse(1);
	rotateHouse(rotateX, rotateY);
	initAnimation();
})();
