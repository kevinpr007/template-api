const HttpStatus = require('http-status-codes')
const faker = require('faker')
const Entity1 = require('../models/entity1')

const addSeed = async (req, res, next) => {
	try {
		for (let i = 0; i < 100; i++) {
			let entity = new Entity1({
				MyField: faker.name.findName(),
				MyDescription: faker.lorem.sentences(),
				MyNumberField: faker.random.number(),
			})
			await entity.save()
		}
		res.status(HttpStatus.OK).json()
	} catch (err) {
		next(err)
	}
}

module.exports = {
	addSeed,
}
