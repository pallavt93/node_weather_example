const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//define parts of express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


// set up handle bar engine with views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDir));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'home',
        name: 'Pallav'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about',
        name: 'Pallav'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'address is not provided'
        });
    }

    geocode(req.query.address,(error, {latitude,longitude,place}={})=>{
        if(error){
            return res.send({
                error
            });
        }
        forecast({latitude,longitude},(error, response)=>{
            if(error){
                return res.send({
                    error
                });
            }
            res.send(response);
        });
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 help',
        errorMessage:'help message'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 help',
        errorMessage: 'page not found'
    });
});

app.listen(3000,()=>{
    console.log('server is running.');
});