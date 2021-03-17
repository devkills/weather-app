const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')
const latitude = document.querySelector('#latitude')
const longitude = document.querySelector('#longitude')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // prevents form refresh on submit click

    const location = search.value // the value of the input

    message.textContent = 'Loading...'
    latitude.textContent = ''
    longitude.textContent = ''

    fetch(`http://localhost:9456/weather?address=${location}`).then((response) => { // allows to fetch data from a url
    response.json().then((data) => {
        if (!data.error) {
            message.textContent = 'location: ' + data.location
            latitude.textContent = 'latitude: ' + data.latitude
            longitude.textContent = 'longitude: ' + data.longitude
        } else {
            message.textContent = data.error
            latitude.textContent = ''
            longitude.textContent = ''
        }
    })
})
})