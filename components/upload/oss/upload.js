const env = require('./env.js');

const Base64 = require('./Base64.js');

require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');


const getRandomString = function () {
	let randomStr = '', strArr = 'qwertyuiopasdfghjklzxcvbnm1234567890'.split('');
	for (let i = 0; i < 10; i++) {
		let j = Math.ceil(Math.random() * (strArr.length - 1))
		randomStr += strArr[j]
	}
	return new Date().getTime() + '_' + randomStr
}

const uploadFile = function (params) {
	if (!params.filePath || params.filePath.length < 9) {
		wx.showModal({
			title: '图片错误',
			content: '请重试',
			showCancel: false,
		})
		return;
	}
	let dir = typeof params.dir === "undefined" ? '' : params.dir
	let filePath = params.filePath
	/// 文件名
	let fileName = getRandomString()
	let aliyunFileKey = dir + fileName + '.' + filePath.split('.').pop();

	const aliyunServerURL = env.uploadImageUrl;
	const accessid = env.OSSAccessKeyId;
	const policyBase64 = getPolicyBase64(params.size);
	const signature = getSignature(policyBase64);

	wx.uploadFile({
		url: aliyunServerURL,
		filePath: params.filePath,
		name: 'file',
		formData: {
			'key': aliyunFileKey,
			'policy': policyBase64,
			'OSSAccessKeyId': accessid,
			'signature': signature,
			'success_action_status': '200',
		},
		success: function (res) {
			if (res.statusCode != 200) {
				if (params.fail) {
					params.fail(res)
				}
				return;
			}
			if (params.success) {
				params.success(aliyunServerURL + '/' + aliyunFileKey);
			}
		},
		fail: function (err) {
			err.wxaddinfo = aliyunServerURL;
			if (params.fail) {
				params.fail(err)
			}
		},
	}).onProgressUpdate(res => {
		typeof params.uploading === "function" && params.uploading(res)
	})
}

const getPolicyBase64 = function (size) {
	size = typeof size === 'number' ? size : 5
	let date = new Date();
	date.setHours(date.getHours() + env.timeout);
	let srcT = date.toISOString();
	const policyText = {
		"expiration": srcT, //设置该Policy的失效时间
		"conditions": [
			["content-length-range", 0, size * 1024 * 1024] // 设置上传文件的大小限制,5mb
		]
	};

	const policyBase64 = Base64.encode(JSON.stringify(policyText));
	return policyBase64;
}

const getSignature = function (policyBase64) {
	const accesskey = env.AccessKeySecret;

	const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
		asBytes: true
	});
	const signature = Crypto.util.bytesToBase64(bytes);

	return signature;
}

module.exports = uploadFile;