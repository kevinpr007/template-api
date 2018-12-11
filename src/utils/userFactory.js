//TODO: Verify fields
module.exports = (user) => {
	return {
		email: user.email,
		confirmed: user.confirmed,
		username: user.username,
	}
}
