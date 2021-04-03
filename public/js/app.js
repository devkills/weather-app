const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')
const weatherData = document.querySelector('#weatherData')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // prevents form refresh on submit click

    const location = search.value // the value of the input

    message.textContent = 'Loading...'
    weatherData.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => { // allows to fetch data from a url
    response.json().then((data) => { // parsing the json response sent in the main app.js file
        if (!data.error) {
            message.textContent = 'מיקום: ' + data.location
            weatherData.textContent = data.weatherData
        } else {
            message.textContent = data.error
            weatherData.textContent = ''
        }
    })



})
})