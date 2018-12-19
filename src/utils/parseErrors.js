const _ = require('lodash')

module.exports = function(errors) {
	const result = {}
	_.forEach(errors, (val, key) => {
		result[key] = val.message
	})

	if (errors instanceof Error) {
		result.message = errors.message
	}

	return result
}
