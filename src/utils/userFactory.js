module.exports = (user) => {
	return {
		_id: user._id,
		email: user.email,
		username: user.username,
		roles: user.roles,
		confirmed: user.confirmed,
	}
}
