// components/toast/toast.js
Component({
	properties: {
		duration: {
			type: Number,
			value: 3000
		},
	},

	data: {
		text: 'i am a toast',
		hide: true,
		toastShow: false
	},

	methods: {
		showToast(text) {
			text && this.setData({ 
				text, 
				hide: false,
				toastShow: true
			})

			this.clearToast()
		},
		clearToast() {
			clearTimeout(this.timer || null)
			this.delay(this.properties.duration).then(_ => {
				this.setData({
					toastShow: false
				})
				this.delay(201).then(_ => {
					this.setData({
						hide: true,
					})
				})
			})
		},
		delay(time) {
			return new Promise(resolve => {
				this.timer = setTimeout(_ => {
					resolve()
				}, time)
			})
		},
	}
})
