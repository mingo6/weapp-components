Component({
	properties: {
		content: {
			type: String,
			value: '',
		},
		focus: {
			type: Boolean,
			value: false
		}
	},
	data: {
		cursor: 0,
	},
	methods: {
		handleContentInput(e) {
			this.setData({ content: e.detail.value })
		},
		makeHead() {
			let mark = '#', cursor = this.data.content.length + 1
			// if (this.data.content.trim().length > 0) {
			// 	mark = '\n# '
			// 	cursor += 2
			// }
			let lastChar = this.data.content.replace(this.data.content.length - 1, '')
			this.setData({
				content : this.data.content + mark,
				cursor: this.data.content.length + cursor,
				focus: true,
			})
		},
		makeBold() {
			this.setData({
				content : this.data.content + '****',
				cursor: this.data.content.length + 2,
				focus: true,
			})
		},
		makeItalic() {
			this.setData({
				content : this.data.content + '**',
				cursor: this.data.content.length + 1,
				focus: true,
			})
		},
		makeQuote() {
			let mark = '> ', cursor = this.data.content.length + 2
			if (this.data.content.trim().length > 0) {
				mark = '\n> '
				cursor += 2
			}
			this.setData({
				content : this.data.content + mark,
				cursor: cursor,
				focus: true,
			})
		},
		makeUl() {
			let mark = '* \n* \n* ', cursor = this.data.content.length + 2
			if (this.data.content.trim().length > 0) {
				mark = '\n* \n* \n* '
				cursor += 1
			}
			this.setData({
				content : this.data.content + mark,
				cursor: cursor,
				focus: true,
			})
		},
		makeOl() {
			let mark = '1. \n2. \n3. ', cursor = this.data.content.length + 3
			if (this.data.content.trim().length > 0) {
				mark = '\n1. \n2. \n3. '
				cursor += 1
			}
			this.setData({
				content : this.data.content + mark,
				cursor: cursor,
				focus: true,
			})
		},
		makeLink() {
			this.setData({
				content : this.data.content + '![](https://)',
				focus: true,
				cursor: this.data.content.length + 2,
			})
		}
	}

})