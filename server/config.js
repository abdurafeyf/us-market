require('dotenv').config()
const config = {
    db: {
      host: process.env.DB4FREENET_HOST,
      user: process.env.DB4FREENET_USER_NAME,
      password: process.env.DB4FREENET_PASSWORD,
      database: process.env.DB4FREENET_DATABASE,
    },
    listPerPage: 10,
};

module.exports = config;