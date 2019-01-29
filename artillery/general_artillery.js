'use strict'

let i = 0

function setInformation(context, events, done) {
	context.vars.test = 11
	return done()
}

function signUpGenerateData(context, events, done) {
	i = i + 1
	context.vars.email = `artillery${i}@test.com`
	context.vars.password = `artillery${i}@test.com`
	context.vars.username = `artillery${i}@test.com`
	return done()
}

module.exports = {
	setInformation,
	signUpGenerateData,
}
