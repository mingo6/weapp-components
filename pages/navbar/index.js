Page({
	data: {
		nav: 0,
		navs: [
			{ text: 'tab_1' },
			{ text: 'tab_2' },
			{ text: 'tab_3' },
		],
		content: [1, 2, 3]
	},
	navChange(e) {
		console.log('active nav: ' + e.detail.nav)
		this.setData({
			nav: e.detail.nav
		})
	},
})