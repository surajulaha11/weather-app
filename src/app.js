const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
  
const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'Suraj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Suraj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText:'This is helpful text',
        title: 'Help',
        name: 'Suraj'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Suraj',
        errorMessage:'Help article not found.'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address)
    {
        return res.send({
            error:"address is mandatory"            
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error)
        {
            return res.send({error});            
        }        
        forecast(latitude, longitude, (error, forecastData) => {

            if(error)
            {
                return res.send({error});            
            } 

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Suraj',
        errorMessage:'Page Not Found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})