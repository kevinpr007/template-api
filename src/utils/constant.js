const USER = 'User'
const ADMIN = 'Admin'
const SUPER_ADMIN = 'Super_Admin'
const ROLES = [USER, ADMIN, SUPER_ADMIN]

const ERROR_RECORD_NOT_FOUND = 'Record not found.'
const ERROR_TOKEN_NOT_VALID = 'The token is not valid'
const ERROR_TOKEN_NOT_FOUND = 'Token not found'
const ERROR_USER_NOT_FOUND = 'User not found'
const ERROR_INVALID_TOKEN = 'Invalid token'
const ERROR_INVALID_CREDENTIAL = 'Invalid credentials'
const ERROR_ROLE_NOT_VALID = 'Role is not valid'
const ERROR_USER_OR_TOKEN_NOT_FOUND = 'User or token not found'

const ERROR_PARAMS_CANT_BE_NULL = "Params can't be null"

module.exports = {
	USER,
	ADMIN,
	SUPER_ADMIN,
	ROLES,
	ERROR_RECORD_NOT_FOUND,
	ERROR_TOKEN_NOT_VALID,
	ERROR_TOKEN_NOT_FOUND,
	ERROR_USER_NOT_FOUND,
	ERROR_INVALID_TOKEN,
	ERROR_INVALID_CREDENTIAL,
	ERROR_ROLE_NOT_VALID,
	ERROR_USER_OR_TOKEN_NOT_FOUND,
	ERROR_PARAMS_CANT_BE_NULL,
}
