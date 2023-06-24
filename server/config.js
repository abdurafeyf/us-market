require('dotenv').config()
// const config = {
//     db: {
//       host: process.env.PLANETSCALE_HOST,
//       user: process.env.PLANETSCALE_USER_NAME,
//       password: process.env.PLANETSCALE_PASSWORD,
//       database: process.env.PLANETSCALE_DATABASE,
//     },
//     listPerPage: 10
// };

const config = {
  db: {
    connection_string: process.env.DATABASE_URL
  }
}

module.exports = config;