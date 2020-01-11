

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var moment = require('moment-timezone');

router.get('/cookie', function(req, res, next) {
  res.cookie("lat", req.query.lat);
  res.cookie("lon", req.query.lon);
  console.log("testing this ===============" +req.query.lon);
  next();

});


// get current conditions
router.get('/currently', function(req, res, next) {
  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+req.cookies.lat+'&lon='+req.cookies.lon+'&units=imperial&appid='+process.env.API)
  .then(response => response.json())
  .then(data => {
      var current_weather = {
        temp: Math.round(data.main.temp),
        high: Math.round(data.main.temp_max),
        low: Math.round(data.main.temp_min),
        humid: data.main.humidity,
        wind: Math.round(data.wind.speed),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        location: data.name
      }
      res.send(current_weather);
    })
  .catch(err => err)
});



// get hourly forecast
router.get('/hourly', function(req, res, next) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+req.cookies.lat+'&lon='+req.cookies.lon+'&units=imperial&appid='+process.env.API)
  .then(response => response.json())
  .then(data => {
      var list = data.list;
      var dl = data.list;
      var hourly_forecast = []
      for (i=0; i < 8; i++){
        var time = dl[i].dt_txt
        var temp = Math.round(dl[i].main.temp)
        var description = dl[i].weather[0].description
        var icon = dl[i].weather[0].icon
        var day = {
          time: time,
          temp: temp,
          description: description,
          icon: icon
        };
        hourly_forecast.push(day) 
      } 
      res.send(hourly_forecast);
    })
  .catch(err => err)

});


module.exports = router;
