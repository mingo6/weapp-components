// components/navbar/navbar.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		navs: {
			type: Object
		},
	},
	data: {
		nav: 0
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleNavChange(e) {
			this.setData({
				nav: e.currentTarget.dataset.nav
			})
			this.triggerEvent('navChange', {
				nav: this.data.nav
			})
		}
	}
})
