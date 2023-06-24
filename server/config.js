require('dotenv').config()

const db4free_config = {
    db: {
      host: process.env.DB4FREENET_HOST,
      user: process.env.DB4FREENET_USER_NAME,
      password: process.env.DB4FREENET_PASSWORD,
      database: process.env.DB4FREENET_DATABASE,
    },
    listPerPage: 10
};

const planetscale_config = {
  db: {
    connection_string: process.env.DATABASE_URL
  }
}

const config = {
  production: planetscale_config.db.connection_string,
  development: db4free_config.db,
  test: planetscale_config.db.connection_string,
};

module.exports = config;