const HttpStatus = require('http-status-codes')
const faker = require('faker')
const Entity1 = require('../models/entity1')
const Entity2 = require('../models/entity2')
const User = require('../models/user')

const mongooseResponse = (err, docs) => {
	console.log(docs)
}

const addSeed = async (req, res, next) => {
	try {
		let toPushEntity1 = []

		for (let i = 0; i < 100; i++) {
			let entity = new Entity1({
				MyField: faker.name.findName(),
				MyDescription: faker.lorem.sentences(),
				MyNumberField: faker.random.number(),
			})
			toPushEntity1.push(entity)
		}
		Entity1.collection.insert(toPushEntity1, mongooseResponse)

		let toPushEntity2 = []

		for (let i = 0; i < 100; i++) {
			let entity = new Entity2({
				MyString: faker.lorem.sentences(),
				MyNumber: faker.random.number(),
				MyDescription: faker.lorem.sentences(),
			})
			toPushEntity2.push(entity)
		}
		Entity2.collection.insert(toPushEntity2, mongooseResponse)

		let toPushUser = []

		for (let i = 0; i < 15; i++) {
			let entity = new User({
				email: faker.internet.email(),
				username: faker.internet.userName(),
				roles: faker.random.arrayElement(['User', 'Admin']),
				passwordHash: faker.internet.password(),
				confirmed: faker.random.boolean(),
			})
			toPushUser.push(entity)
		}
		User.collection.insert(toPushUser, mongooseResponse)
		res.status(HttpStatus.OK).json()
	} catch (err) {
		next(err)
	}
}

module.exports = {
	addSeed,
}
