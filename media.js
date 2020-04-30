// (<iframe
// 	width="560"
// 	height="315"
// 	src="https://www.youtube.com/embed/EzRfZok4tsE?controls=0"
// 	frameborder="0"
// 	allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
// 	allowfullscreen
// ></iframe>)

(function () {
	// type: 'image' | 'video'
	const media = [
		// {
		// 	// People of Warm Up
		// 	type: "YT embed",
		// 	ratio: 1.5,
		// 	link: "https://www.youtube.com/embed/EzRfZok4tsE",
		// },
		{
			// Jenia
			type: "image",
			link:
				"https://scontent-waw1-1.xx.fbcdn.net/v/t31.0-8/23550092_1971103892916091_695435221354448941_o.jpg?_nc_cat=107&_nc_sid=e007fa&_nc_ohc=8_Y-L0RzQroAX8ztTd5&_nc_ht=scontent-waw1-1.xx&oh=c01992c1bf6b6a2bd754d7b7a8d05643&oe=5ECEE7DD",
		},
		{
			// Sophie
			type: "image",
			link:
				"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-0/p640x640/69887776_10162214723660427_869712215807098880_o.jpg?_nc_cat=103&_nc_sid=07e735&_nc_ohc=D2lz8GnnvMUAX_ePdaU&_nc_ht=scontent-waw1-1.xx&_nc_tp=6&oh=d9918817a88e2dcf6462649cab79fb7f&oe=5ED0368C",
		},
		{
			// Tripti
			type: "image",
			link:
				"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/69544153_10162214718125427_8455980407488249856_o.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=Qi900SGMpWAAX_lkEK5&_nc_ht=scontent-waw1-1.xx&oh=ffd4127eecfd613d605c9ad4a5b8b867&oe=5ECE95E2",
		},
		{
			// Ian
			type: "image",
			link:
				"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/69438817_10162214722245427_7931942570005889024_o.jpg?_nc_cat=102&_nc_sid=07e735&_nc_ohc=KPGsb4w7J78AX_SbIQ9&_nc_ht=scontent-waw1-1.xx&oh=2b69f796d7a96452bacc36bbdaa28d7f&oe=5ECEDF75",
		},
		{
			// Irina
			type: "image",
			link:
				"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/79154495_10162692675225427_8138277467535179776_o.jpg?_nc_cat=100&_nc_sid=07e735&_nc_ohc=d2UqdBF5hEcAX8hZ8RX&_nc_ht=scontent-waw1-1.xx&oh=dc8385338e2867fc6e554dc05fbef07a&oe=5ECF428B",
		},
		{
			// Liz
			type: "image",
			link:
				"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/82058203_10162817031710427_5948886509368115200_o.jpg?_nc_cat=104&_nc_sid=07e735&_nc_ohc=TjqMgjp0AqIAX_5DVOe&_nc_ht=scontent-waw1-1.xx&oh=3831ce0b670a5f7dc0107b32e67f7648&oe=5ECE008E",
		},
		{
			// Marialena
			type: "image",
			link:
				"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/82195566_10162817032670427_7062253267849314304_o.jpg?_nc_cat=111&_nc_sid=07e735&_nc_ohc=0KWP-b_4YlwAX9aTenP&_nc_ht=scontent-waw1-1.xx&oh=291e1db99142ed28045395a0f4cf6273&oe=5ECFD587",
		},

		// {
		// 	type: "video/mp4",
		// 	link: "vid.mp4",
		// },
	];

	// -----------------------------------------------------------------

	const house = document.querySelector(".house");
	const containers = house.querySelectorAll(".media__container");

	// Insert media into each media container
	function insertMediaHtml() {
		containers.forEach((container, i) => {
			if (!media[i]) return;

			const { type, link, ratio } = media[i];
			let innerHtml = "";

			// video
			if (type === "video") {
				innerHtml = `<video class="video" autoplay muted loop src="${link}"></video>`;
			}

			// image
			if (type === "image") {
				innerHtml = `<img class="image" src="${link}" alt=":)">`;
			}

			// iframe
			if (type === "YT embed") {
				const height = container.getBoundingClientRect().height;
				if (!ratio) ratio = 1.5;

				const splitLink = link.split("?");
				const params =
					"?mute=1" +
					"&autoplay=1" +
					"&controls=0" +
					"&disablekb=1" +
					"&fs=0" +
					"&loop=1" +
					"&rel=0" +
					"&origin=https://warmup.netlify.app";
				const url = splitLink[0] + params;

				innerHtml = `<div class="embed"><iframe
				data-ratio="${ratio}"
				width="${height * ratio}px"
				height="${height}px"
					src="${url}"
					frameborder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				></iframe></div>
				`;
			}

			// overlay
			innerHtml += `<div class="media__filter" style="--index: ${i}"></div>`;

			container.innerHTML = innerHtml;
		});
	}

	function updateIframeSizes() {
		containers.forEach((container) => {
			const iframe = container.querySelector("iframe");
			if (!iframe) return;

			const height = container.getBoundingClientRect().height;
			const ratio = iframe.dataset.ratio;

			iframe.width = height * ratio;
			iframe.height = height;
		});
	}

	// desynchronize videos
	function mixUpVideoTime() {
		const vids = house.querySelectorAll("video");

		vids.forEach((vid, i) => {
			vid.currentTime += i * 10;
		});
	}

	// --------------------------------------------------

	insertMediaHtml();
	mixUpVideoTime();
	window.addEventListener("resize", updateIframeSizes);
})();
