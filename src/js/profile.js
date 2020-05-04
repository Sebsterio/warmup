(function () {
	const currentProfile = window.houseConfig.profile;

	const panel = document.querySelector(".house__panel--profile");
	const profileForm = panel.querySelector(".house__profile-form");
	const signInForm = panel.querySelector(".house__sign-in-form");
	const signInBtn = panel.querySelector(".house__input--sign-in");

	// Change window location to match selected profile
	function changeProfile(profileName) {
		// Remove profile query from URL
		let newQuery = window.location.search.replace(/[\?&](house=)[^&]*/, "");

		// Personal profile: add profile query to URL
		if (profileName !== "") {
			const separator = window.location.search.includes("?") ? "&" : "?";
			const urlQuery = "house=" + profileName;
			newQuery += separator + urlQuery;
		}

		window.location = newQuery;
	}

	// Show sing-in form or navigate to common profile URL
	function handleProfileInput(e) {
		if (e.target.value === "personal") signInForm.style.display = null;
		else if (e.target.value === "common") changeProfile("");
	}

	// Enable disabled sing-in button if userName is present
	function handleSingnInInput(e) {
		if (e.target.value) signInBtn.removeAttribute("disabled");
		else signInBtn.setAttribute("disabled", true);
	}

	// Navigate to personal profile URL
	function handleSignIn(e) {
		e.preventDefault();
		changeProfile(signInForm.username.value);
	}

	// Reflect current profile in the form state
	function setUpForms() {
		if (currentProfile) {
			profileForm.profile.value = "personal";
			signInForm.style.display = null; // show (hidden attr buggy)
			signInForm.username.value = currentProfile;
		} else {
			signInForm.style.display = "none"; // hide (hidden attr buggy)
			profileForm.profile.value = "common";
		}
	}

	profileForm.addEventListener("input", handleProfileInput);
	signInForm.addEventListener("input", handleSingnInInput);
	signInForm.addEventListener("submit", handleSignIn);

	setUpForms();
})();
