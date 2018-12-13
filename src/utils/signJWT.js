module.exports = {
	expiresIn: process.env.JWT_LOGIN_EXPIRATION_TIME,
	notBefore: process.env.JWT_LOGIN_NOT_BEFORE_EXPIRATION_TIME,
	audience: process.env.JWT_LOGIN_AUDIENCE,
	issuer: process.env.APP_NAME,
	subject: process.env.JWT_LOGIN_SUBJECT,
}
