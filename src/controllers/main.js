const path = require('path')

const MainPage = async (req, res, next) => {
	try {
		res.sendFile(path.join(__dirname, '../../public/mainpage/index.html'))
	} catch (err) {
		next(err)
	}
}

const apiDoc = async (req, res, next) => {
	try {
		res.sendFile(path.join(__dirname, '../../public/apidoc/index.html'))
	} catch (err) {
		next(err)
	}
}

module.exports = {
	MainPage,
	apiDoc,
}
