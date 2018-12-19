module.exports = (message = '', newObject = null) => {
	//TODO: Fix when multiple object
	let object = { errors: { global: message } }
	if (newObject !== null) Object.assign(object.errors, newObject)
	return object
}
