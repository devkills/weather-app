const request = require('request')
var API_KEY = '0e77042d7fb3fdc97cf3c13695f5113c'

// callback: (error, data)
const forecast = (latitude, longitude, callback) => {

    var url = `http://api.openweathermap.org/data/2.5/weather?`
        + `lat=${latitude}&lon=${longitude}&lang=he&units=metric&appid=${API_KEY}`

    request({ url, json: true }, (error, response) => {
        if (error) {
            console.log(error)
            callback('Unable to connect to Forecast API', undefined)
        } else {
            var direction
            const windDirectionDegrees = response.body.wind.deg
            if (windDirectionDegrees >= 0 && windDirectionDegrees < 90) {
                if (windDirectionDegrees === 0)
                    direction = 'צפונית'
                else
                    direction = 'צפונית מערבית'
            }
            else if (windDirectionDegrees >= 90 && windDirectionDegrees < 180) {
                if (windDirectionDegrees === 90)
                    direction = 'מערבית'
                else
                    direction = 'דרומית מערבית'
            }
            else if (windDirectionDegrees >= 180 && windDirectionDegrees < 270) {
                if (windDirectionDegrees === 180)
                    direction = 'דרומית'
                else
                    direction = 'דרומית מזרחית'
            }else if (windDirectionDegrees >= 270) {
                if (windDirectionDegrees === 270)
                    direction = 'מזרחית'
                else
                    direction = 'צפונית מזרחית'
            }

            const weatherData = 'מזג האוויר עכשיו הוא ' + parseFloat(response.body.main.temp).toFixed(2) + '°C בחוץ.\n' +
                'הגבוה היום הוא ' + parseFloat(response.body.main.temp_max).toFixed(2) + '°C' + ' והנמוך הוא ' + parseFloat(response.body.main.temp_min).toFixed(2) + '°C.\n' +
                'רמת הלחות היום היא ' + response.body.main.humidity + '%.\n' +
                'הרוח היום היא ' + direction + ', והמהירות שלה היא ' + (parseFloat(response.body.wind.speed) * 3.6).toFixed(2) + ' קמ"ש.'

            // const weatherData = 'It is currently ' + (parseFloat(response.body.main.temp) - 273.15) + '°C out.\n' +
            //     'The high today is ' + (parseFloat(response.body.main.temp_max) - 273.15) + '°C with a low of ' + (parseFloat(response.body.main.temp_min) - 273.15) + '°C.\n' +
            //     'Humidity today is ' + response.body.main.humidity + '%\n' + 'The wind is' + direction +
            //     ', and its speed is ' + response.body.wind.speed + ' mph'
            callback(undefined, weatherData)
        }
    })
}

module.exports = forecast