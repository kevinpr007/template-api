const jwt = require('jsonwebtoken')
const userFactory = require('../utils/userFactory')
const signJWT = require('../utils/signJWT')
const JWTVariableFactory = require('../utils/JWTVariableFactory')
const { ERROR_PARAMS_CANT_BE_NULL } = require('../utils/constant')

const sign = (user) => {
	if (!user) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

	return jwt.sign(userFactory(user), process.env.JWT_SECRET, signJWT)

	// | code | name            | description                                                                                                                                                                                                                                                                                                        |   |   |
	// |------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|---|
	// | iss  | Issuer          | Identifies principal that issued the JWT.                                                                                                                                                                                                                                                                          |   |   |
	// | sub  | Subject         | Identifies the subject of the JWT.                                                                                                                                                                                                                                                                                 |   |   |
	// | aud  | Audience        | Identifies the recipients that the JWT is intended for. Each principal intended to process the JWT must identify itself with a value in the audience claim. If the principal processing the claim does not identify itself with a value in the aud claim when this claim is present, then the JWT must be rejected |   |   |
	// | exp  | Expiration time | Identifies the expiration time on or after which the JWT must not be accepted for processing. The value should be in NumericDate[10] format.                                                                                                                                                                       |   |   |
	// | nbf  | Not before      | Identifies the time on which the JWT will start to be accepted for processing.                                                                                                                                                                                                                                     |   |   |
	// | iat  | Issued at       | Identifies the time at which the JWT was issued.                                                                                                                                                                                                                                                                   |   |   |
	// | jti  | JWT ID          | Case sensitive unique identifier of the token even among different issuers.                     																																																					 |   |   |
	// |------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|---|
}

const ResetPasswordSign = (user) => {
	if (!user) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

	return jwt.sign(
		{
			_id: user._id,
			resetPasswordToken: user.resetPasswordToken,
		},
		process.env.JWT_SECRET,
		Object.assign(signJWT, { expiresIn: process.env.JWT_EMAIL_EXPIRATION_TIME })
	)
}

const resultVerify = (err, decodedToken) => {
	return { err, decodedToken }
}

const verify = (token) => {
	if (!token) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

	return jwt.verify(
		token,
		process.env.JWT_SECRET,
		JWTVariableFactory,
		resultVerify
	)
}

module.exports = {
	sign,
	ResetPasswordSign,
	verify,
}
