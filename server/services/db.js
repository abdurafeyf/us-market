const mysql = require('mysql');
const config = require('./../config');

async function query(sql, params) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config.db);
    
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