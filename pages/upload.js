// const city = require('../components/city-picker/data/data.js')

Page({
	getImageUrls() {
		let urls = this.selectComponent('#image-upload').data.image.urls
		console.log(urls)

		// console.log(this.selectComponent('#image-upload'))
	},
	onLoad() {
		// console.log(city)
	}
})