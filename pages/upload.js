// const city = require('../components/city-picker/data/data.js')

Page({
	data: {
		mobile: '1234567890'
	},
	getImageUrls() {
		let urls = this.selectComponent('#image-upload').data.image.urls
		console.log(urls)

		// console.log(this.selectComponent('#image-upload'))
	},
	onLoad() {
		// console.log(city)
	},

	getAddress() {
		return this.selectComponent('#city-picker').getSelected()
	},

	getMobile(e) {
		this.setData({ mobile: e.detail.value })
	},
	getVerifyCode(e) {
		this.selectComponent('#verify-code').sendCode(this.data.mobile,  _ => {
			return new Promise(resolve => {
				/// 请求验证码
				wx.request({
					url: '...',
					data: { mobile: this.data.mobile },
					success: res => {
						/// 回传发送状态 : true/false
						resolve(res.data.success)
					}
				})
			})
		})
	},


	showModal(e) {
		this.selectComponent('#modal').showModal(this)
		if (e.detail.hasOwnProperty('confirm')) {
			if (e.detail.confirm) {
				// let selected = this.selectComponent('#picker-view-demo').selected
				let selected = this.selectComponent('#time-picker').data.dateTime

				console.log(selected)
			}
		}
	},
})