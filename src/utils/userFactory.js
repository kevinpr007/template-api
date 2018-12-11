module.exports = (user) => {
	return {
		email: user.email,
		username: user.username,
		confirmed: user.confirmed,
	}
}
