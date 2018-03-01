Page({
	getImageUrls() {
		let urls = this.selectComponent('#image-upload').data.image.urls
		console.log(urls)
	}
})