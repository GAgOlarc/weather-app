const request = require('request');

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/2f6de53622accb91f1a331a087520e87/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast servers.');
        } else if (response.statusCode === 400) {
            callback(undefined, body.error);
        } else if (response.statusCode === 200) {
            const fahrenheitToCelsius = temp => (
                ((temp - 32) * (5 / 9)).toFixed(2)
            ); 

            callback(undefined, {
                temperature: fahrenheitToCelsius(body.currently.temperature),
                apparentTemperature: fahrenheitToCelsius(body.currently.apparentTemperature)
            });
        } else {
            callback(undefined, 'Unable to fetch weather.');
        }
    });
};
module.exports.getWeather = getWeather;


