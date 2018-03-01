Page({
	data: {
		content: '这是默认值'
	},
	formSubmit() {
		let content = this.selectComponent('#editor').data.content
		console.log(content)
	}
})