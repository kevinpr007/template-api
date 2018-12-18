module.exports = (req, res, next) => {
	req.query.page = parseInt(req.query.page) || 1
	req.query.limit = parseInt(process.env.REST_Limit_Page)
	next()
}
