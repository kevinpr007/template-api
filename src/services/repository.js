const getAll = async (Schema) => {
	//TODO: Add pagination
	return await Schema.find()
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
		{ $set: dataToUpdate, $inc: { __v: 1 } },
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
