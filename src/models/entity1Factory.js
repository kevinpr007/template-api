module.exports = (entity) => {
	//TODO: check if null value when update
	return {
		MyField: entity.MyField,
		MyDescription: entity.MyDescription,
		MyNumberField: entity.MyNumberField,
	}
}
