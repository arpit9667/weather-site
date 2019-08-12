const express = require('express')
const path  = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

// console.log(__dirname);
// console.log()
// define path for configure express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join( __dirname, '../templates/views');

// partials path
const partialsPath = path.join( __dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
// set up static directory to serve
app.use(express.static(publicDirectoryPath))

// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Arpit Agrawal"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Arpit Agrawal"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        help_message: 'Ask me a Question!!',
        title: 'Help Page',
        name: 'Arpit Agrawal'
    })
})

app.get('/weather', (req,res) => {
    
    if(!req.query.address){
        return res.send({
            error: "Please Provide a location!!"
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send(error);
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error)
                return res.send(error);

            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     location: "jaipur",
    //     forecast: 'Heavy Rain',
    //     address: req.query.address
    // });
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You should provide a search query'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('errorpage',{
        content: 'Help page not found',
        title: 'Weather App',
        name: 'Arpit Agrawal'
    })
})
app.get('*', (req,res)=>{
    res.render('errorpage', {
        content: 'Page not Found',
        title: 'Weather App',
        name: 'Arpit Agrawal'
    })   
})

app.listen(3000, () =>{
    console.log('Server is Up');
})