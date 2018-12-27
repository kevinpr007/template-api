const _ = require('lodash')

module.exports = function(errors) {
	const result = {}
	_.forEach(errors, (val, key) => {
		let resultValue
		if (val) {
			resultValue = val.message
		} else {
			resultValue = val
		}
		result[key] = resultValue
	})

	if (errors instanceof Error) {
		result.message = errors.message
	}

	return result
}
