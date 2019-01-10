const factory = (entity) => {
	return {
		MyField: entity.MyField,
		MyDescription: entity.MyDescription,
		MyNumberField: entity.MyNumberField,
	}
}

module.exports = {
	factory,
}
