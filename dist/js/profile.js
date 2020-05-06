/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const currentProfile = window.houseConfig.profile;

	const panel = document.querySelector(".house__panel--profile");
	const profileForm = panel.querySelector(".house__profile-form");
	const signInForm = panel.querySelector(".house__sign-in-form");
	const signInBtn = panel.querySelector(".house__input--enter");

	// -----------------------------------------------------------------------

	// Change window location to match selected profile & save profile in localStorage
	function changeProfile(profileName) {
		// Remove profile query from URL
		let newQuery = window.location.search.replace(/[\?&](house=)[^&]*/, "");

		// Personal profile: add profile query to URL
		if (profileName !== "") {
			const separator = window.location.search.includes("?") ? "&" : "?";
			const urlQuery = "house=" + profileName;
			newQuery += separator + urlQuery;
		}

		localStorage.setItem("house", profileName);
		window.location = newQuery;
	}

	// Show sing-in form or navigate to common profile URL
	function handleProfileInput(e) {
		if (e.target.value === "personal") signInForm.style.display = null;
		else if (e.target.value === "common") changeProfile("");
	}

	// Navigate to personal profile URL
	function handleSignIn(e) {
		e.preventDefault();
		changeProfile(signInForm.username.value);
	}

	// Toggle disabled sing-in button if userName is present
	function handleSingnInInput() {
		const name = signInForm.username.value;
		if (name) {
			// different profile: show enabled button
			if (name !== currentProfile) {
				signInBtn.removeAttribute("disabled");
				signInBtn.removeAttribute("hidden");
			}
			// current profile: hide button
			else signInBtn.setAttribute("hidden", true);
		}
		// input empty: show disabled button (suggest it must be clicked to sing in)
		else {
			signInBtn.setAttribute("disabled", true);
			signInBtn.removeAttribute("hidden");
		}
	}

	// Reflect current profile in the form state
	function setUpForms() {
		if (currentProfile) {
			profileForm.profile.value = "personal";
			signInForm.style.display = null; // show (hidden attr is buggy)
			signInForm.username.value = currentProfile;
			handleSingnInInput(); // set signInBtn appearance according to current profile
		} else {
			profileForm.profile.value = "common";
			signInForm.style.display = "none"; // hide (hidden attr is buggy)
			signInForm.username.value = ""; // reduntant but tidier
		}
	}

	// --------------------------------------------------------------------------

	profileForm.addEventListener("input", handleProfileInput);
	signInForm.addEventListener("input", handleSingnInInput);
	signInForm.addEventListener("submit", handleSignIn);

	setUpForms();
})();
