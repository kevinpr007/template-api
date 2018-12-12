const HttpStatus = require('http-status-codes')
const globalErrorFactory = require('../utils/globalErrorFactory')
const parseErrors = require('../utils/parseErrors')

module.exports = (err, req, res, next) => {
	res
		.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
		//TODO: Check Error when not is an object
		.json(globalErrorFactory('Global error', parseErrors(err)))
}
