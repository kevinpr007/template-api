const _ = require('lodash')

const factory = (errors) => {
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

	// if (!result && errors instanceof Error) {
	// 	result.message = errors.message
	// }

	return result
}

module.exports = {
	factory,
}
