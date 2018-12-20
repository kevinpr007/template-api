const Promise = require('bluebird')

const getAll = async (
	Schema,
	query,
	page,
	limit,
	sort = null,
	select = null
) => {
	let count = Schema.find(query),
		table = Schema.find(query)
			.skip(limit * page - limit) // skip the first 100 items
			.limit(limit) // limit to 10 items

	if (sort) {
		table.sort(sort) // sort ascending by firstName
	}

	if (select) {
		table.select(select) // select firstName only
	}

	return Promise.all([table.exec(), count.count()]) // execute the query
}

const insert = async (Schema, data) => {
	return await new Schema(data).save()
}

const getById = async (Schema, data) => {
	const { id } = data
	return await Schema.findById(id)
}

const updateById = async (Schema, idData, dataToUpdate) => {
	const { id } = idData

	return await Schema.findByIdAndUpdate(
		id,
		{ $set: dataToUpdate },
		{ new: true }
	)
}

const deleteById = async (Schema, data) => {
	const { id } = data
	return await Schema.findByIdAndRemove(id)
}

module.exports = {
	getAll,
	insert,
	getById,
	updateById,
	deleteById,
}
