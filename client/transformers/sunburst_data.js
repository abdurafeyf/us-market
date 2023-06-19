function sunburst_data(data) {
    const groupedData = {};
    const finalData = [];

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
        for (const i in groupedData[sector]) {
            sector_change += parseFloat(groupedData[sector][i]['stock_change_p']);
        }
        id += 1;
        finalData.push({
            sector_code: id, 
            stock_sector_name: sector,
            sector_change: sector_change,
            stocks: groupedData[sector]
        });
    }

    return finalData;
}

module.exports = sunburst_data;
