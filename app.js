const request = require('request');
const yargs = require('yargs');

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

const encodedAddress = encodeURIComponent(argv.a);

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyD-9ut4vAlJXGUjuBJ9uQ-ybtA3mAHZuN8`,
    json: true
}, (err, res, body) => {
    console.log('Address: ', body.results[0].formatted_address);
    console.log('Latitude:', body.results[0].geometry.location.lat);
    console.log('Longitude:', body.results[0].geometry.location.lng);
});