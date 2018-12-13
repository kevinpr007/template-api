module.exports = {
	audience: process.env.JWT_LOGIN_AUDIENCE,
	issuer: process.env.APP_NAME,
	subject: process.env.JWT_LOGIN_SUBJECT,
}
