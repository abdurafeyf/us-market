function sunburst_data(data) {
    const groupedData = {}

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
    return groupedData;
}

module.exports = sunburst_data;