const paginationFactory = (page, count, limit) => {
	return {
		currentPage: page,
		pages: Math.ceil(count / limit),
		count: count,
	}
}

module.exports = paginationFactory
