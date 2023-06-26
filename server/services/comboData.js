const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(){
    const rows = await db.query(
        `
        `
    )
    
    const groupedData = sunburst_data(rows);
    const data = helper.emptyOrRows(groupedData);
    const meta = {page};

    return data;
}

module.exports = {
    getMultiple
}
