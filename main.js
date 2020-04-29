(function () {
	const ZOOM_SENSITIVITY = 0.0005;
	const ZOOM_MIN = 0.01;
	const ROTATE_SENSITIVITY = 0.25;

	const root = document.documentElement;
	const container = root.querySelector(".house__container");

	// CSS transform vars
	let rotateX = -2;
	let rotateY = -40;
	let scale = 1;

	// aux
	let oldRotateX;
	let oldRotateY;

	// mouseMove vars
	let canRotate = false;
	let refX, refY, curX, curY, deltaX, deltaY, vector;

	// -------------------- VIEW --------------------------

	// Update view
	function rotateHouse(x, y) {
		root.style.setProperty("--x", x + "deg");
		root.style.setProperty("--y", y + "deg");
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

		// Save angle values before rotation
		oldRotateX = rotateX;
		oldRotateY = rotateY;
	}

	function handleMouseUp(e) {
		canRotate = false; // Disable input
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
			rotateX = oldRotateX - deltaY * ROTATE_SENSITIVITY;
			rotateY = oldRotateY + deltaX * ROTATE_SENSITIVITY;

			rotateHouse(rotateX, rotateY);
		}
	}

	// Zoom on scroll
	function handleWheel(e) {
		scale = scale + e.deltaY * -1 * ZOOM_SENSITIVITY;
		if (scale < ZOOM_MIN) scale = ZOOM_MIN; // minimum

		zoomHouse(scale);
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
})();

// setTimeout(()=>{
// 	if (!canRotate)	animateHouse()
// }, 10)
