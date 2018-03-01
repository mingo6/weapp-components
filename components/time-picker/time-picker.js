// components/time-picker/time-picker.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		date: {
			type: Number,
			value: 15,
		},
		time: {
			type: Object,
			value: {
				start: 10,
				end: 22,
				slot: 30
			}
		},
		__date: {
			type: Number,
			value: 0,
			observer: 'watchDateChange'
		},
		__time: {
			type: Number,
			value: 0,
			observer: 'watchTimeChange'
		}
	},

	data: {
		__dates: [],
		__times: []
	},

	attached() {
		this.getDates()
		this.getTimes()
	},
	ready() {
		this.initSelect()
		this.getSelected(0, 0)
	},

	methods: {
		handleChange(e) {
			let val = e.detail.value
			this.setData({
				__date: val[0], __time: val[1]
			})
			this.getSelected(...val)
		},
		watchDateChange(newVal, oldVal) {
			const { __date, __time, __dates, __times } = this.data

			let isToday = __dates.indexOf(__dates[newVal]) === 0
			let nowIndex = this.getNowTimeIndex()

			if (isToday && nowIndex >= 0) {
				this.setData({
					__time: nowIndex
				})
			} else {
				nowIndex !== 0 && this.setData({
					__time: 0
				})
			}
		},
		watchTimeChange(newVal, oldVal) {

		},

		getSelected(d, t) {
			let { __dates, __times } = this.data
			this.setData({
				dateTime: __dates[d] + ' ' + __times[t]
			})
		},

		initSelect() {
			const { __times } = this.data
			// 大于 22:00 了
			const { start, end } = this.data.time
			const date = new Date()
			const currentHour = date.getHours()
			const currentMinute = date.getMinutes()

			if (currentHour >= end) {
				// 默认选中第二天 10:00
				this.setData({
					__date: 1,
					__time: 0,
				})
			} else if (currentHour > start && currentHour < end) {
				// 10:00 - 22:00 之间
				this.setData({
					__time: this.getNowTimeIndex(date)
				})
			}
		},

		getNowTimeIndex(date) {
			const { __times, time } = this.data
			date = date || new Date()
			const currentHour = date.getHours()
			const currentMinute = date.getMinutes()

			for (let i = 0; i < __times.length; i ++) {
				let [hour, minute] = __times[i].split(':')

				let slotStart = Number(hour) * 60 + Number(minute)
				let current = currentHour * 60 + currentMinute

				let lastHour = __times[i + 1] ? __times[i + 1].split(':')[0] : time.start
				let lastMinute = __times[i + 1] ? __times[i + 1].split(':')[1] : 0
				let slotEnd = Number(lastHour) * 60 + Number(lastMinute)
				

				if (Number(hour) === currentHour && currentMinute >= Number(minute) && currentMinute < Number(lastMinute)) {
					return i
					break;
				}
			}
			return 0
		},

		getDates() {
			const date = new Date()
			const oneDay = 24 * 60 * 60 * 1000
			const dur = date.getTime() + this.data.date * oneDay
			const __dates = []
			for (let d = date.getTime(); d < dur; d += oneDay) {
				__dates.push(this.dateFormat(d))
			}
			
			this.setData({
				__dates
			})
		},

		getTimes() {
			const { start, end, slot } = this.data.time
			const slotStamp = slot * 60 * 1000
			const dur = ((end - start + 2) * 60 / slot) * slotStamp
			const _start = new Date('1970/01/01 ' + start + ':00:00').getTime()
			
			const __times = []
			for (let t = _start; t <= dur; t += slotStamp) {
				__times.push(this.timeFormat(t))
			}
			this.setData({
				__times
			})
		},

		dateFormat(t) {
			const date = new Date(t)
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			month = month > 9 ? month : '0' + month.toString()
			day = day > 9 ? day : '0' + day.toString()
			return year + '-' + month + '-' + day
		},

		timeFormat(t) {
			const date = new Date(t)
			let hour = date.getHours()
			let minute = date.getMinutes()
			hour = hour > 9 ? hour : '0' + hour.toString()
			minute = minute > 9 ? minute : '0' + minute.toString()
			return hour + ':' + minute
		}
	}
})
