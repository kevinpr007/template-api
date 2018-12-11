const globalError = require('../utils/globalError')
const parseErrors = require('../utils/parseErrors')
//TODO: TEST this
module.exports = (err, req, res, next) => {
	res
		.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
		.json(globalError('Global error', parseErrors(err)))
}
