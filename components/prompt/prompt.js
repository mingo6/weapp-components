Component({
	
	properties: {
		title: {
			type: String,
		},
		inputType: {
			type: String,
			value: 'textarea'
		},
		placeholder: {
			type: String,
			value: '',
		},
		focus: {
			type: Boolean,
			value: false
		},

		value: {
			type: String,
			value: ''
		}
	},

	data: {
		isEmpty: false,
		textareaHide: true
	},

	methods: {
		showPrompt(_this) {
			_this.setData({ promptShow: !_this.data.promptShow })
			this.textareaHidden(_this.data.promptShow)
		},
		hidePrompt(e) {
			let confirm = JSON.parse(e.currentTarget.dataset.confirm)
			if (confirm) {
				if (this.data.value.trim() !== '') {
					this.triggerEvent('showPrompt', {
						confirm: true,
						value: this.data.value
					})
					this.delay(0).then(_ => {
						this.setData({ value: '' })
					})
				} else {
					this.setData({ isEmpty: true })
					this.delay(1000).then(_ => {
						this.setData({ isEmpty: false })
					})
				}
			} else {
				this.triggerEvent('showPrompt', {
					confirm: false,
				})

			}
		},
		handleInput(e) {
			this.setData({
				value: e.detail.value
			})
		},
		delay(time) {
			return new Promise(resolve => {
				setTimeout(_ => {
					resolve()
				}, time)
			})
		},
		textareaHidden(promptShow) {
			if (promptShow) {
				this.setData({ textareaHide: false })
			} else {
				this.delay(300).then(_ => {
					this.setData({ textareaHide: true })
				})
			}
		}
	}
})
