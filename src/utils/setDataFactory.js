module.exports = (key, data, object = null) => {
	let response = object || {}
	response[key] = data
	return response
}
