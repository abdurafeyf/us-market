const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const sunburst_data = require('./../transformers/sunburst_data');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    // const rows = await db.query(
    //     `SELECT symbol, price, changesPercentage, \`change\`, dayLow, dayHigh, marketCap, volume
    //     FROM tbl_nasdaq_constituent_quote LIMIT ${offset},${config.listPerPage}`
    // );
    const rows = await db.query(
        `SELECT ndx.symbol as stock_symbol, ndx.name as stock_title, 
        nasdaq_sectors.sector as stock_sector, 
        ((ndx.sharesOutstanding*ndx.price) / total_sum) AS weightage, 
        ndx.price as stock_current_price, ndx.\`change\` as stock_change_p, 
        ndx.changesPercentage as stock_change_p, ndx.volume as stock_volume_m, 
        ndx.yearHigh as fifty_two_week_high, ndx.yearLow as fifty_two_week_low, 
        ndx.marketCap as marketcap
        FROM tbl_nasdaq_constituent_quote ndx
        LEFT JOIN tbl_nasdaq_constituent nasdaq_sectors
        ON (nasdaq_sectors.symbol = ndx.symbol)
        CROSS JOIN (
          SELECT SUM(sharesOutstanding * price) AS total_sum
          FROM tbl_nasdaq_constituent_quote
        ) AS subquery;
        `
    )
    
    const groupedData = sunburst_data(rows);
    const data = helper.emptyOrRows(groupedData);
    const meta = {page};

    return {
        data,
        meta
    }
}

module.exports = {
    getMultiple
}
