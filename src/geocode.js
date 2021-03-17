const request = require('request')

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoiam9lcmVjdjAiLCJhIjoiY2ttNTgybW92MGF6ODJycXQzM3gzOG85aiJ9.5NydUEU-nrxZVXANmPl3kA'

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search')
    } else {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        // console.log(latitude, longitude)
    }
})

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9lcmVjdjAiLCJhIjoiY2ttNTgybW92MGF6ODJycXQzM3gzOG85aiJ9.5NydUEU-nrxZVXANmPl3kA'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location sevices!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode