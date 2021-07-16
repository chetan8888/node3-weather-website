const express = require('express')
const path = require("path")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// index.html is automatically detected by node thats why we don't have to explicitly provide the index.html filename in app.use method
// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req,res) =>
{
    res.render('index',{
        'title': 'Weather',
        'name': 'Chetan'
    })
})

app.get('/help', (req,res) =>
{
    res.render('help')
})

app.get('/about', (req,res) =>
{
    res.render('about')
})

// These routes does not necessarily have to be html views. For ex. the /weather route does not render a view but returns a json object.
app.get('/weather', (req,res) =>
{
    if (req.query.address)
    {
        geocode(req.query.address, (error,{latitude,longitude,location} = {}) =>
        {
            if (error)
            {
                res.send(
                {
                    error: error
                })
            }
            else
            {
                forecast(latitude, longitude, (error, data) => {
                    if (error)
                    {
                        return res.send(
                        {
                            error: error
                        })
                    }
                    res.send({
                        forecast: data,
                        location: location,
                        address: req.query.address
                    })
                })
            }
            
        })
    }
    else
    {
        res.send({
            error: "You must provide an address!"
        })
    }
})

app.get('/products', (req,res) =>
{
    if (!req.query.search)
    {
        return res.send({
            error: "You must provide a search query!"
        })
    }

    console.log(req.query)
    res.send({
        'products':[]
    })
})

app.get('*', (req,res) =>
{
    res.send('404 page')
})

app.listen(3000, () =>
{
    console.log("Server is running on port 3000.")
})