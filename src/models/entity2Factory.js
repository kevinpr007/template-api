const factory = (entity) => {
	return {
		MyString: entity.MyString,
		MyNumber: entity.MyNumber,
		MyDescription: entity.MyDescription,
		Entity1_Id: entity.Entity1_Id,
	}
}

module.exports = {
	factory,
}
