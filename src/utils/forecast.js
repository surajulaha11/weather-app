const request = require('request')

const forecast = (lat, long, callback) => {
    const weatherApiUrl = 'https://api.darksky.net/forecast/d2abbb1928dcaed29f910f808c6a325f/' + long + ',' + lat + '?units=si'

    request({url : weatherApiUrl, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect weather service', undefined)
        }
        else if(response.body.error){
            callback('Unable to find location', undefined)
        }
        else{
            const data = {
                temperature : response.body.currently.temperature,
                summary : response.body.daily.data[0].summary
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast