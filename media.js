// type: 'image' | 'video/mp4' | 'video/ogg'
const media = [
	{
		type: "image",
		link: "pic.jpg",
	},
	{
		type: "image",
		link: "pic.jpg",
	},
	{
		type: "image",
		link: "pic.jpg",
	},
	{
		type: "image",
		link: "pic.jpg",
	},
	{
		type: "image",
		link: "pic.jpg",
	},
	{
		type: "image",
		link: "pic.jpg",
	},
	{
		type: "image",
		link: "pic.jpg",
	},

	// {
	// 	type: "video/mp4",
	// 	link: "vid.mp4",
	// },
];

const containers = document.querySelectorAll(".media__container");

// Insert media into each container
containers.forEach((container, i) => {
	if (!media[i]) return;

	const { type, link } = media[i];
	let innerHtml = "";

	if (type.includes("video")) {
		innerHtml = `
		<video class="video" autoplay muted loop>
			<source class="video__media" src="${link}" type="${type}">
			:)
		</video>
		`;
	}

	if (type.includes("image")) {
		innerHtml = `
		<img class="image" src="${link}" alt=":)">
		`;
	}

	innerHtml += `<div class="media__filter" style="--index: ${i}"></div>`;

	container.innerHTML = innerHtml;
});
