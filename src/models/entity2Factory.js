module.exports = (entity) => {
	//TODO: check if null value when update
	return {
		MyString: entity.MyString,
		MyNumber: entity.MyNumber,
		MyDescription: entity.MyDescription,
		Entity1_Id: entity.Entity1_Id,
	}
}
