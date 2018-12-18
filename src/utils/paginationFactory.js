module.exports = (page, count, limit) => {
	return {
		currentPage: page,
		pages: Math.ceil(count / limit),
		count: count,
	}
}
