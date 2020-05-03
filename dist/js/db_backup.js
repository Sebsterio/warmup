/*! warmup v0.0.1 | (c) 2020 Sebastian Rosloniec | ISC License | git+https://github.com/Sebsterio/warmup.git */
const mediaBackup = [
	// {
	// 	type: "video/mp4",
	// 	link: "vid.mp4",
	// },
	{
		id: 0,
		type: "YT embed",
		name: "People of Warm Up",
		ratio: 1.5,
		link: "https://www.youtube.com/embed/EzRfZok4tsE",
		priority: true,
		pinned: true,
	},
	{
		id: 1,
		name: "Jenia",
		type: "image",
		link:
			"https://scontent-waw1-1.xx.fbcdn.net/v/t31.0-8/23550092_1971103892916091_695435221354448941_o.jpg?_nc_cat=107&_nc_sid=e007fa&_nc_ohc=8_Y-L0RzQroAX8ztTd5&_nc_ht=scontent-waw1-1.xx&oh=c01992c1bf6b6a2bd754d7b7a8d05643&oe=5ECEE7DD",
	},
	{
		id: 2,
		name: "Tripti",
		type: "image",
		link:
			"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/69544153_10162214718125427_8455980407488249856_o.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=Qi900SGMpWAAX_lkEK5&_nc_ht=scontent-waw1-1.xx&oh=ffd4127eecfd613d605c9ad4a5b8b867&oe=5ECE95E2",
	},
	{
		id: 3,
		name: "Ian",
		type: "image",
		link:
			"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/69438817_10162214722245427_7931942570005889024_o.jpg?_nc_cat=102&_nc_sid=07e735&_nc_ohc=KPGsb4w7J78AX_SbIQ9&_nc_ht=scontent-waw1-1.xx&oh=2b69f796d7a96452bacc36bbdaa28d7f&oe=5ECEDF75",
	},
	{
		id: 4,
		name: "Irina",
		type: "image",
		link:
			"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/79154495_10162692675225427_8138277467535179776_o.jpg?_nc_cat=100&_nc_sid=07e735&_nc_ohc=d2UqdBF5hEcAX8hZ8RX&_nc_ht=scontent-waw1-1.xx&oh=dc8385338e2867fc6e554dc05fbef07a&oe=5ECF428B",
	},
	{
		id: 5,
		name: "Liz",
		type: "image",
		link:
			"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/82058203_10162817031710427_5948886509368115200_o.jpg?_nc_cat=104&_nc_sid=07e735&_nc_ohc=TjqMgjp0AqIAX_5DVOe&_nc_ht=scontent-waw1-1.xx&oh=3831ce0b670a5f7dc0107b32e67f7648&oe=5ECE008E",
	},
	{
		id: 6,
		name: "Marialena",
		type: "image",
		link:
			"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/82195566_10162817032670427_7062253267849314304_o.jpg?_nc_cat=111&_nc_sid=07e735&_nc_ohc=0KWP-b_4YlwAX9aTenP&_nc_ht=scontent-waw1-1.xx&oh=291e1db99142ed28045395a0f4cf6273&oe=5ECFD587",
	},
	{
		id: 7,
		name: "Sophie",
		type: "image",
		link:
			"https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-0/p640x640/69887776_10162214723660427_869712215807098880_o.jpg?_nc_cat=103&_nc_sid=07e735&_nc_ohc=D2lz8GnnvMUAX_ePdaU&_nc_ht=scontent-waw1-1.xx&_nc_tp=6&oh=d9918817a88e2dcf6462649cab79fb7f&oe=5ED0368C",
	},
	{
		id: 8,
		name: "Alina",
		type: "image",
		link:
			"https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-0/c0.69.206.206a/p206x206/72258190_10156537554797611_5198962756807557120_o.jpg?_nc_cat=108&_nc_sid=da31f3&_nc_ohc=WX7jfI30MJsAX-4zinJ&_nc_ht=scontent-lht6-1.xx&oh=6d72533fe8a97fa6a84c17b73d9a6a94&oe=5ED2D8EA",
	},
];

houseApp.firestore.update(mediaBackup, () => {
	alert("Love shared succesfullly");
});
