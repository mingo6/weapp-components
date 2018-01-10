// components/toast/toast.js
Component({
	properties: {
		duration: {
			type: Number,
			value: 3000
		}
	},

	data: {
		text: 'i am a toast'
	},

	methods: {
		showToast(_this, text) {
			text && this.setData({ text })

			_this.setData({ toastShow: true })

			this.clearToast(_this)
		},
		clearToast(_this) {
			this.delay(this.properties.duration).then(_ => {
				_this.setData({ toastShow: false })
			})
		},
		delay(time) {
			return new Promise(resolve => {
				setTimeout(_ => {
					resolve()
				}, time)
			})
		},
	}
})
