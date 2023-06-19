function sunburst_data(data) {
    const groupedData = {};
    const finalData = [];

    // Iterate over the data array and group the objects by sector
    data.forEach((obj) => {
        const sector = obj.stock_sector;

        finalData.push({
            stock_sector_name: sector,
            stocks:[]
        })
        
        // Check if the sector already exists in the groupedData object
        if (!groupedData.hasOwnProperty(sector)) {
            finalData[sector] = [];
        }
        // Push the object to the corresponding sector array
        groupedData[sector].push(obj);
        finalData.push(groupedData);
    });
    return finalData;
}

module.exports = sunburst_data;