const path = require('path')

const MainPage = async (req, res, next) => {
	try {
		res.sendFile(path.join(__dirname, '../../public/mainpage/index.html'))
	} catch (err) {
		next(err)
	}
}

	} catch (err) {
		next(err)
	}
}

module.exports = {
	MainPage,
}
