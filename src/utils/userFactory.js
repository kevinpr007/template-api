export default (user) => {
	return {
		email: user.email,
		confirmed: user.confirmed,
		username: user.username,
	}
}
