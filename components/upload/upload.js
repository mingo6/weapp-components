const upload = require('./oss/upload.js')

Component({
	properties: {
		multiple: {
			type: Number,
			value: 1,
		}
	},

	data: {
		image: {
			temp: [],
			urls: [],
			progress: [],
			complete: []
		}
	},

	attached() {
		this.setData({
			'image.progress': Array(this.properties.multiple).fill(0),
			'image.complete': Array(this.properties.multiple).fill(false)
		})
	},

	methods: {

		imageSelect(e) {
			wx.chooseImage({
				count: this.properties.multiple,
				success: res => {
					let image = this.data.image
					/// 保存临时文件
					image.temp = image.temp.concat(res.tempFilePaths)
					this.setData({
						image: image,
						'image.overflow': image.temp.length >= this.properties.multiple
					})

					//// 开始上传
					this.imageUpload(image.temp)
				},
			})
		},

		imageUpload(temp) {
			temp.forEach((value, i) => {
				let progress = this.data.image.progress,
					complete = this.data.image.complete;

				if (!complete[i] && progress[i] === 0) {
					upload({
						/***
							dir: 'image/' // 指定oss bucket 目录, 默认根目录;
							size: 10, // 上传图片最大限制(MB) 默认 5MB
						*/
						filePath: value, // 临时文件路径
						uploading: res => {
							progress[i] = res.progress
							this.setData({
								'image.progress': progress
							})
						},
						success: res => {
							let urls = this.data.image.urls
							urls[i] = res
							complete[i] = true
							setTimeout(_ => {
								this.setData({
									'image.complete': complete
								})
							}, 1000)
						},
						fail: err => {
							console.log(err)
							wx.showToast({
								title: '上传失败',
							})
							setTimeout(_ => {
								this.imageDelete(i, false)
							}, 1000)
						}
					})
				}
			})
		},


		imagePreview(e) {
			wx.previewImage({
				current: e.currentTarget.dataset.src,
				urls: this.data.image.temp
			})
		},

		imageDelete(e, state) {
			let temp = this.data.image.temp
			let urls = this.data.image.urls

			let i = typeof e === 'object' ? parseInt(e.currentTarget.dataset.index) : e
			if (temp.length > 0 && urls.length > 0) {
				let progress = this.data.image.progress
				let complete = this.data.image.complete
				temp.splice(i, 1)
				urls.splice(i, 1)
				progress[i] = 0
				complete[i] = false

				this.setData({
					'image.temp': temp,
					'image.urls': urls,
					'image.progress': progress,
					'image.complete': complete,
					'image.overflow': temp.length >= this.properties.multiple
				})
			} else if (temp.length > 0 && !state) {
				let progress = this.data.image.progress
				temp.splice(i, 1)
				progress[i] = 0
				this.setData({
					'image.temp': temp,
					'image.progress': progress,
					'image.overflow': false
				})
			}
 		},

	}
})
