Page({
	getMobile(e) {
		this.setData({ mobile: e.detail.value })
	},
	getVerifyCode(e) {
		this.selectComponent('#verify-code').sendCode(this.data.mobile, _ => {
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

})