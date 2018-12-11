module.exports = (message = '', newObject = null) => {
	let object = { errors: { global: message } }
	if (newObject !== null) Object.assign(object.errors, newObject)
	return object
}
