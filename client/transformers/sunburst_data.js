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

    // Iterate over the groupedData object and create the finalData array
    for (const sector in groupedData) {
        finalData.push({
            stock_sector_name: sector,
            stocks: groupedData[sector]
        });
    }

    return finalData;
}

module.exports = sunburst_data;
