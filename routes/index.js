var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var moment = require('moment-timezone');
var zipcodes = require("zipcodes")
var GetWeather = require('../modules/GetWeather.js');

router.get('/', function(req, res, next) {
  if (!req.cookies.lat){
    console.log("=============== no cookie found");
    res.render('index', {display: "flex", weatherdisplay: "none"} );
  }
  else
  {
    console.log(" ===============  we found a cookie!");
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+req.cookies.lat+'&lon='+req.cookies.lon+'&units=imperial&appid='+process.env.API)
    .then(response => response.json())
    .then(data => {
        var weather = data.weather;
        var main = data.main;
        var desc = weather[0].description;
        var icon = weather[0].icon; 
        var temp = Math.round(data.main.temp);
        var s = new Date(data.sys.sunrise).toLocaleDateString("en-US")
        var sys = data.sys;    
        res.render('weather', {display: "none", icon: icon, temp:temp, weatherdisplay: "flex", desc:desc , data: data, main:main, weather: weather[0]});
      })
    .catch(err => err)
  }
});

router.post('/zip', (req, res) => {
  const zip = req.body.zip
  console.log("===============")
  console.log(zip)
  var hills = zipcodes.lookup(90210);
  console.log(hills)
  fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&units=imperial&appid='+process.env.API)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    var weather = data.weather;
    var main = data.main;
    var desc = weather[0].description;
    var icon = weather[0].icon; 
    console.log(data.sys.sunrise)
    var s = new Date(data.sys.sunrise).toLocaleDateString("en-US")
    var sys = data.sys;    
    res.render('weather', {icon: icon, temp:temp, weatherdisplay: "flex", desc:desc , data: data, main:main, weather: weather[0]});
  })
  .catch(err => err)
});


router.get('/test', (req, res) => {
 GetWeather.current(req.cookies.lat,req.cookies.lon)
 .then(response => res.send(response))
});



module.exports = router;
                