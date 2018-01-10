const provinces = require('./provinces')
const cities = require('./cities')
const areas = require('./areas')

const getCities = () => {
	let newCities = []
	for (let province of provinces) {
		var temp = []
		for (let city of cities) {
			if (city.province_id === province.province_id) {
				temp.push(city)
			}
		}
		newCities.push(temp)
	}
	return newCities
}

const getAreas = () => {
	let newAreas = []
	for (let province of provinces) {
		var temp = []
		for (let city of cities) {
			if (city.province_id === province.province_id) {
				var temp_2 = []
				for (let area of areas) {
					if (area.city_id === city.city_id) {
						temp_2.push(area)
					}
				}
				temp.push(temp_2)
			}
		}
		newAreas.push(temp)
	}
	return newAreas
}

module.exports = {
	provinces,
	cities: getCities,
	areas: getAreas
}