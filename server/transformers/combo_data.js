const moment = require('moment');

function combo_data(data) {
    const price_data = [];
    const volume_data = [];

    data.forEach((obj) => {
        const formattedDate = moment(obj.snapshot_date).format('YYYY-MM-DD');

        price_data.push({
            time: formattedDate,
            value: parseFloat(obj.close)
        });

        let color = "";
        if (parseFloat(obj.change_p) > 0) {
            color = 'rgba(0, 150, 136, 0.8)';
        } else {
            color = 'rgba(255, 82, 82, 0.8)';
        }

        volume_data.push({
            time: formattedDate,
            value: parseFloat(obj.volume),
            color: color
        });
    });

    const groupedData = {
        price: price_data,
        volume: volume_data
    };

    return groupedData;
}

module.exports = combo_data;
