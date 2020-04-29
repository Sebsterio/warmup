(function () {
	// config
	let canAnimate = true;
	const ZOOM_SENSITIVITY = 0.0005;
	const ZOOM_MIN = 0.01;
	const ROTATE_SENSITIVITY = 0.25;
	const FPS = 60;

	// elements
	const root = document.documentElement;
	const container = root.querySelector(".house__container");

	// CSS transform vars
	let rotateX = -2;
	let rotateY = -40;
	let scale = 1;

	// aux
	let newRotateX;
	let newRotateY;

	// input vars
	let refX, refY, curX, curY, deltaX, deltaY;
	let canRotate = false;

	// -------------------- VIEW --------------------------

	// Update view
	function rotateHouse(x, y) {
		if (x !== null) root.style.setProperty("--x", x); // unit added in css
		if (y !== null) root.style.setProperty("--y", y); // unit added in css
	}

	function zoomHouse(scale) {
		root.style.setProperty("--scale", scale);
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
			if (canAnimate && !canRotate) {
				rotateY -= 0.05;
				rotateHouse(null, rotateY);
			}
		}, 1000 / FPS);
	}

	// ----------------- CONTROLLER ----------------------

	container.addEventListener("mousedown", handleMouseDown);
	container.addEventListener("touchstart", handleMouseDown);
	container.addEventListener("mouseup", handleMouseUp);
	container.addEventListener("mouseleave", handleMouseUp);
	container.addEventListener("touchend", handleMouseUp);
	container.addEventListener("touchcancel", handleMouseUp);
	container.addEventListener("mousemove", handleMove);
	container.addEventListener("touchmove", handleMove);
	container.addEventListener("wheel", handleWheel);

	zoomHouse(1);
	rotateHouse(rotateX, rotateY);
	initAnimation();
})();
