const setDataFactory = (key, data, object = null) => {
	let response = object || {}
	response[key] = data
	return response
}

module.exports = setDataFactory
