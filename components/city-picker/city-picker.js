const datas = require('./data/data.js')

Component({

	properties: {
		level: {
			type: Number,
			value: 3
		},
	},

	//// 默认3级
	data: {
		datas: [
			datas.provinces, datas.cities()[0], datas.areas()[0][0]
		],
		cities: datas.cities(),
		areas: datas.areas(),
		index: [0, 0, 0]
	},

	attached() {
		console.log(datas.provinces)
		console.log(datas.cities())
		console.log(datas.areas())
		if (this.properties.level === 2) {
			this.setData({
				datas: [
					datas.provinces, datas.cities()[0]
				],
				cities: datas.cities(),
				index: [0, 0]
			})
		} else if (this.properties.level === 1) {
			this.setData({
				datas: datas.provinces,
				index: 0
			})
		} else if (this.properties.level === 3) {
			this.currentAreas = this.data.areas[this.data.index[0]]
		} else {
			throw 'level invalid'
		}
	},

	methods: {
		getSelected() {
			let index = this.data.index, datas = this.data.datas
			let selected
			if (this.properties.level > 1) {
				selected = datas[0][index[0]].name
				if (this.data.datas[1][index[1]]) {
					selected += ' ' + datas[1][index[1]].name
				}
				if (this.data.datas[2][index[2]]) {
					selected += ' ' + datas[2][index[2]].name
				}
			} else {
				selected = datas[index].name
			}
			return selected
		},
		///////// 点击确定
		handlePickerChange(e) {
			////// 选中的下标
			this.setData({ index: e.detail.value })

			////// 选中的项
			console.log(this.getSelected())
		},
		///// 滑动列
		handlePickerColumnChange(e) {
			const data = {
				datas: this.data.datas,
				index: this.data.index
			}
			data.index[e.detail.column] = e.detail.value

			///// province changed
			if (e.detail.column === 0 && data.index.length > 1) {
				for (let i = 0; i < data.datas[0].length; i++) {
					switch (data.index[0]) {
						case i:
							///// cities
							data.datas[1] = this.data.cities[i]
							data.index[1] = 0
							if (data.index.length === 3) {
								//// areas
								data.datas[2] = this.data.areas[i][0]
								data.index[2] = 0
								///// 存储当前city下的 areas
								this.currentAreas = this.data.areas[i]
							}
							break;
					}
				}
			}
			///// city changed
			if (e.detail.column === 1 && data.index.length > 2) {
				for (let i = 0; i < data.datas[1].length; i++) {
					switch (data.index[1]) {
						case i:
							data.datas[2] = this.currentAreas[i]
							data.index[2] = 0
							break;
					}
				}
			}

			this.setData(data);
		},
	}
})
