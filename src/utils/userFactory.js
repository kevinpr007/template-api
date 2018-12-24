module.exports = (user) => {
	return {
		id: user._id,
		email: user.email,
		username: user.username,
		roles: user.roles,
		confirmed: user.confirmed,
	}
}
