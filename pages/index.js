Page({
	data: {
		nav: 0,
		navs: [
			{ text: 'tab_1' },
			{ text: 'tab_2' },
			{ text: 'tab_3' },
		],
		content: [1, 2, 3],

		promptShow: false,
	},
	navChange(e) {
		console.log('active nav: ' + e.detail.nav)
		this.setData({
			nav: e.detail.nav
		})
	},

	showPrompt(e) {
		this.selectComponent('#prompt').showPrompt(this)
		if (e.detail.hasOwnProperty('confirm')) {
			///// prompt 确定/取消 传来到值
			console.log(e.detail)
		}
	},

	showModal(e) {
		this.selectComponent('#modal').showModal(this)
		if (e.detail.hasOwnProperty('confirm')) {
			///// prompt 确定/取消 传来到值
			console.log(e.detail.confirm)
		}
	},

	showToast(e) {
		this.setData({
			html: '<view>hello world</view>'
		})
		this.selectComponent('#toast').showToast(this, 'a toast')
	},

})