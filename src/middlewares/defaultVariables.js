module.exports = (req, res, next) => {
	req.query.page = parseInt(req.query.page || 1)
	req.query.limit = parseInt(process.env.REST_Limit_Page)

	if (req.query.page === undefined || isNaN(req.query.page)) {
		let message = new Error('You must provide a valid page number')
		next(message)
	}
	// if (req.query.pageSize === undefined || isNaN(req.query.pageSize)) {
	// let message = 'You must provide a valid Page size number'
	// // return util.generateError(message, HttpStatus.BAD_REQUEST)
	// }
	next()
}
