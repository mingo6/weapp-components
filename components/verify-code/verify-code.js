Component({
	data: {
		interval: 60,
		sent: false,
		text: '获取',
	},

	methods: {
		/**
		 * 发送验证码
		 * @params
		 *  mobile 验证手机合法
		 *  cb  发送验证码请求方法回调，务必写成promise并把发送状态回传
		 */
		sendCode(mobile, cb) {
			if (!(/^1[34578]\d{9}$/.test(mobile))) {
				this.warnTips('手机格式有误')
				return false
			}
			if (!this.data.sent) {
				this.setData({
					text: '发送中',
					sent: true
				})

				typeof cb === 'function' && cb().then(sendStatus => {
					if (sendStatus) {
						wx.showToast({ title: '发送成功' })
						this.getCountDown()
					} else {
						this.warnTips('发送失败')
						this.rollback()
					}
				})
			} else {
				this.warnTips('请稍后再试')
			}
		},

		///// 获取倒计时
		getCountDown() {
			const timer = setInterval(() => {
				if (this.data.interval > 0) {
					this.setData({
						interval: this.data.interval -= 1,
					})
				} else {
					this.rollback()
					clearInterval(timer)
				}
			}, 1000)
		},

		rollback() {
			this.setData({
				sent: false,
				interval: 60,
				text: '重新获取'
			})
		},

		warnTips(text) {
			wx.showToast({
				title: text,
				image: '/assets/images/warn.png',
				mask: true
			})
		}
	}
})
