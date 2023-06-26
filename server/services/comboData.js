const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const combo_data = require('../transformers/combo_data');

async function getMultiple(page=1){
    const rows = await db.query(
        `SELECT snapshot_date, close, volume, change_p FROM tbl_nasdaq_history;
        `
    );
    
    const groupedData = combo_data(rows);
    const data = helper.emptyOrRows(groupedData);
    const meta = {page};

    return data;
}

module.exports = {
    getMultiple
}
