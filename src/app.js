const path = require('path');
const hbs = require('hbs');
const express = require('express');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();

//Define paths for Express configs
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory in use
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Service App',
        name: 'Almar Glen'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Almar Glen'
    });
}); 
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some helpful text',
        name: 'Almar Glen I. Marcelo'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    } 
    
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, {Forecast, Temperature}) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    forecast: Forecast,
                    location: location,
                    address: req.query.address,
                    temperature: Temperature
                })
            });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term!'
        });
    } 
         
    console.log(req.query.search);
    res.send({
        products: []
    })
    
});

//404 Pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found!',
        name: 'Almar Glen I. Marcelo'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        name: 'Almar Glen I. Marcelo'
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

