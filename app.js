const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help('address="some place"')
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=(YOUR API KEY)`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    console.log(response.data.results[0].formatted_address);

    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/(YOUR API KEY)/${lat},${lng}`;

    return axios.get(weatherUrl);
}).then(response => {
    const fahrenheitToCelsius = temp => (
        ((temp - 32) * (5 / 9)).toFixed(2)
    ); 

    console.log(`Temperature: ${fahrenheitToCelsius(response.data.currently.temperature)} celsius`);
    console.log(`Feels Like: ${fahrenheitToCelsius(response.data.currently.apparentTemperature)} celsius`);
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(error.message);
    }
});
