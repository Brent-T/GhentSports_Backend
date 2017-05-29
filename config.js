require('dotenv').config();

const config = {
	server: {
		port: process.env.PORT || 5050,
	},
	db: {
		user: process.env.DB_USER,
		psw: process.env.DB_PSW,
		url: `mongodb://${process.env.DB_USER}:${process.env.DB_PSW}@ds151651.mlab.com:51651/ghentsports`,
	}
}

module.exports = config;
