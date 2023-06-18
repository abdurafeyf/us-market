const mysql = require('mysql');
const config = require('./../config');

function query(sql, params) {
    const connection = mysql.createConnection(config.db);
    connection.connect();
    connection.query(sql, function(err, rows, fields) {
        if (err) console.log(err);
        connection.end();
        return rows;
    })
}

module.exports = {
    query
}