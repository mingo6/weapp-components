Page({
	data: {
		promptShow: false,
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
			if (e.detail.confirm) {
				// let selected = this.selectComponent('#picker-view-demo').selected
				let selected = this.selectComponent('#time-picker').data.dateTime

				this.selectComponent('#toast').showToast(selected)		
			}
		}
	},

	showToast(e) {
		this.selectComponent('#toast').showToast('数一下我有多少个字')
	},


	'eventMethods.handleTap'(e) {
		console.log(e)
	}
})