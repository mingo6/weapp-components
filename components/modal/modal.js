Component({	
	properties: {
		title: {
			type: String,
		},
	},

	data: {
		
	},

	methods: {
		showModal(_this) {
			_this.setData({ modalShow: !_this.data.modalShow })
		},
		hideModal(e) {
			let confirm = JSON.parse(e.currentTarget.dataset.confirm)
			this.triggerEvent('showModal', {
				confirm
			})
		},
	}
})
