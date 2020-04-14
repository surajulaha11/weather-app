const request = require('request')

// API integration, callback abstraction
const geocode = (cityname, callback) => {
    const geocodeApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(cityname) + '.json?access_token=pk.eyJ1Ijoic3VyYWpqIiwiYSI6ImNrNWY0NzhkczJka2gza3BjdXdtNGZpOXgifQ.iCu_78BxFvngb2OI4dCWDQ&limit=1'

    request({url : geocodeApiUrl, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect location service', undefined)
        }
        else if(response.body.features.length == 0){
            callback('Unable to find location', undefined)
        }
        else{
            const data = {
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                place_name : response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode