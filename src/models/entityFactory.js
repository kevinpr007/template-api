module.exports = (entity) => {
	//TODO: check if null value
	return {
		MyField: entity.MyField,
		MyDescription: entity.MyDescription,
		MyNumberField: entity.MyNumberField,
	}
}
