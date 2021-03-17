const express = require('express') // module to create a web server
const path = require('path') // module to MANIPULATE paths in projects
const hbs = require('hbs')
const geocode = require('./geocode')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // example for a path of a directory to replace the views directory
const partialPath = path.join(__dirname, '../templates/partials')

console.log(__dirname) // path of the directory containing the current file
console.log(__filename) // path of the current file
console.log(publicDirectoryPath)

const app = express() // calling the express function to build an express object
const port = process.env.PORT || 9456

app.set('view engine', 'hbs')
app.set('views', viewsPath) // change the path of the directory of the views to render

hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath)) // a way to customize the server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Raz Leshem',
        text: 'Welcome to Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Raz Leshem',
        text: 'About Weather App'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Raz Leshem',
        text: 'Weather App Help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) { // if the key "address" doesn't exist in the query
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (!data) {
            return res.send({
                error
            })
        }
        res.send({
            latitude: data.latitude,
            longitude: data.longitude,
            location: data.location,
        })
    })
})

app.get('/products', (req, res) => {
    // req.query - a json of the values that come after the ? in a url
    if (!req.query.search) { // if the key "search" doesn't exist in the query
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => { // matches every url request that wstarts with /help/
    res.render('404', {
        title:  "404",
        name: 'Raz Leshem',
        text: 'Help article not found'
    })
})

app.get('*', (req, res) => { // * - wild card character matches every url request
    res.render('404', {
        title:  "404",
        name: 'Raz Leshem',
        text: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})