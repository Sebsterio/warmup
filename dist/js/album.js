/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
(function () {
	const { profile } = window.houseConfig;
	const { allMedia } = window.houseState;
	const {
		createYTEmbed,
		createVideo,
		createImage,
		authenticateUser,
	} = window.houseApp;

	const panel = document.querySelector(".house__panel--edit");
	const album = panel.querySelector(".house__album");
	const backupButtons = panel.querySelectorAll(".house__button");

	// -------------------- Interactions ----------------------

	// Make and restore manual backup
	function handleBackupButton(e) {
		e.preventDefault();
		const action = e.target.dataset.action;

		if (action === "set") {
			localStorage.setItem("manual-backup", JSON.stringify(allMedia));
		} else if (action === "get") {
			const newMedia = JSON.parse(localStorage.getItem("manual-backup"));
			window.houseApp.loadNewMedia(newMedia); // repopulate the house
			buildAlbum(); // repopulate this panel
			houseApp.firestore.update(profile, newMedia); // sync changes
		}

		// UI feedback
		const stash = e.target.value;
		e.target.value = "Done!";
		setTimeout(() => {
			e.target.value = stash;
		}, 1000);
	}

	// Delete an allMedia item
	function deleteItem(itemToDelete) {
		const newMedia = allMedia.filter((item) => item !== itemToDelete);
		allMedia.length = 0;
		allMedia.push(...newMedia);
	}

	// Update prop of allMedia item
	function updateItemProp(e, mediaItem) {
		const property = e.target.name;
		const value = e.target.checked;
		mediaItem[property] = value;
	}

	// List item interactions
	function handleItemClick(e) {
		// Show URL button
		if (e.target.classList.contains("house__media-info--show-url")) {
			this.classList.toggle("house--url-expanded");
			return;
		}

		const mediaItem = allMedia.find((item) => item.id + "" === this.dataset.id);

		// Delete button
		if (e.target.classList.contains("house__media-info--delete")) {
			this.parentElement.removeChild(this); // remove element from the panel list
			deleteItem(mediaItem);
			houseApp.firestore.update(profile, allMedia);
		}

		// Checkboxes
		else if (e.target.classList.contains("house__input")) {
			updateItemProp(e, mediaItem);
			houseApp.firestore.update(profile, allMedia);
		}
	}

	// -------------------- HTML builders ----------------------

	const getMediaItemHTML = ({ type, link, ratio }) => {
		switch (type) {
			case "image":
				return createImage(link);
			case "video":
				return createVideo(link);
			case "YT embed":
				return createYTEmbed(link, ratio, { offsetHeight: 200 }); // fake container
			default:
				return "";
		}
	};

	const getThumbnailHTML = (item) => `
	<div class="house__media-thumbnail">${getMediaItemHTML(item)}</div>
`;

	const getLabelHTML = (label, value) =>
		`<p class="house__media-info-row house__label">${
			label ? label + ": " : ""
		}${value}</p>`;

	const getCheckboxHTML = (keyword, label, checked, id) =>
		`<div class="house__media-info-row house__checkbox-container">
			<input ${checked ? "checked" : ""} id="house__input--${
			id + keyword
		}" class="house__input" type="checkbox" name="${keyword}"
				value="${keyword}">
			<label for="house__input--${id + keyword}" class="house__label">${label}</label>
		</div>`;

	const getButtonsHTML = () => `
	<div class="house__media-info-row house__media-info-buttons house__label">
		<span class="house__media-info-button house__media-info--show-url">URL</span>
		<span class="house__media-info-button house__media-info--delete">DELETE</span>
	</div>`;

	getInfoHTML = ({ id, type, description, ratio, priority, pinned }) => {
		const descriptionHTML = description ? getLabelHTML(null, description) : "";
		const typeHTML = getLabelHTML(null, type);
		const ratioHTML = ratio ? getLabelHTML("ratio", ratio) : "";
		const checkboxesHTML =
			getCheckboxHTML("priority", "Priority", priority, id) +
			getCheckboxHTML("pinned", "Pinned", pinned, id);
		const buttons = getButtonsHTML();

		return (
			'<div class="house__media-info">' +
			descriptionHTML +
			typeHTML +
			ratioHTML +
			checkboxesHTML +
			buttons +
			"</div>"
		);
	};

	getUrlHTML = ({ link }) => `
		<div class="house__media-url-container">
			<div class="house__media-url">${link}</div>
		</div>
	`;

	// -------------------- Build Album ----------------------

	function buildItem(item, i) {
		const mediaItem = document.createElement("div");
		mediaItem.classList.add("house__media-item");
		mediaItem.dataset.id = item.id;
		mediaItem.style["--index"] = i;
		mediaItem.innerHTML =
			getThumbnailHTML(item) + getInfoHTML(item) + getUrlHTML(item);
		return mediaItem;
	}

	function buildAlbum() {
		album.innerHTML = "";
		const items = houseState.allMedia.map((item, i) => buildItem(item, i));
		items.forEach((item) => {
			album.appendChild(item);
			item.addEventListener("click", handleItemClick);
		});
	}

	// ------------------------ Init --------------------------

	//  Backup section
	backupButtons.forEach((button) =>
		button.addEventListener("click", handleBackupButton)
	);

	// -------------------- Module exports ----------------------

	window.houseApp.buildAlbum = buildAlbum;
})();
