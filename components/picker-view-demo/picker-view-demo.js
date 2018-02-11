const brands = require('./data/brand.js')
const models = require('./data/model.js')

Component({
	properties: {
		brand: {
			type: Number,
			value: 0,
			observer: 'handleBrandChange'
		}
	},

	data: {
		brands,
	},

	attached() {
		this.getCurrentModels(this.data.brand)
		this.getSelected(this.data.brand, this.data.model)
	},

	methods: {
		bindChange: function (e) {
			let val = e.detail.value
			this.setData({
				brand: val[0],
				model: val[1],
			})
			this.getSelected(...val)
		},
		handleBrandChange(newIndex) {
			this.getCurrentModels(newIndex)
		},
		getCurrentModels(brandIndex) {
			let currentModels = []
			models.forEach(item => {
				brands[brandIndex].id === item.brand && currentModels.push(item)
			})
			this.setData({
				models: currentModels, model: 0
			})
		},
		getSelected(b, m) {
			let selected = {
				brand: this.data.brands[b],
				model: this.data.models[m]
			}
			this.selected = selected
		}
	}
})
