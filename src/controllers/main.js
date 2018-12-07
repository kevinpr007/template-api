const path = require('path')

const MainPage = (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'))
}

module.exports = {
	MainPage,
}
