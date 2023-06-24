const mysql = require('mysql');
const config = require('./../config');
require('dotenv').config();


const environment = process.argv[2] || 'development';

if (environment == "production") {
    var dbConfig = config.production;
} else if (environment == "test"){
    var dbConfig = config.test;
} else {
    var dbConfig = config.development;
}
async function query(sql, params) {
    return new Promise((resolve, reject) => {

        const connection = mysql.createConnection(dbConfig);
        console.log(connection);
    
        connection.connect((err) => {
            if (err) {
            console.error(err);
            reject(err);
            return;
            }
    
            connection.query(sql, params, function (err, rows, fields) {
            if (err) {
                console.error(err);
                reject(err);
            }
    
            connection.end();
            resolve(rows);
            });
        });
    });
}
  

module.exports = {
    query
}