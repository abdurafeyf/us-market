function sunburst_data(data) {
    // object to group data on the basis of sector
    const groupedData = {};
    /* 
    after grouping the data finalData array will be used to store other information about that 
    particular sector
    */
    const finalData = [];
    /*
    Final response to be sent over the API
     */
    let response = {};

    // Iterate over the data array and group the objects by sector
    data.forEach((obj) => {
        const sector = obj.stock_sector;

        // Check if the sector already exists in the groupedData object
        if (!groupedData.hasOwnProperty(sector)) {
            groupedData[sector] = [];
        }

        // Push the object to the corresponding sector array
        groupedData[sector].push(obj);
    });

    var id = 0;
    // Iterate over the groupedData object and create the finalData array
    for (const sector in groupedData) {
        var sector_change = 0.0;
        var sector_current = 0.0;
        var sector_marketcap = 0.0;
        var sector_stock_volume = 0.0;
        var sector_weightage = 0.0;
        for (const i in groupedData[sector]) {
            sector_change += parseFloat(groupedData[sector][i]['stock_change_p']);
            sector_current += parseFloat(groupedData[sector][i]['stock_current_price']);
            sector_marketcap += parseFloat(groupedData[sector][i]['marketcap']);
            sector_stock_volume += parseFloat(groupedData[sector][i]['stock_volume_m']);
            sector_weightage += parseFloat(groupedData[sector][i]['weightage']);
        }
        id += 1;
        finalData.push({
            sector_code: id,
            stock_sector_name: sector,
            sector_current: sector_current,
            sector_change: sector_change,
            weightage: sector_weightage,
            marketcap: sector_marketcap,
            stock_volume: sector_stock_volume,
            stocks: groupedData[sector]
        });
    }

    var market_change_p = 0.0;
    for (const i in finalData) {
        market_change_p += parseFloat(finalData[i]['sector_change']);
    }
    response = ({
        status: "success",
        indice: "NASDAQ",
        market_change_p: market_change_p,
        data: finalData
    })

    return response;
}

module.exports = sunburst_data;
