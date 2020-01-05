

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');



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
      var main = data.weather;
      console.log(data);
      res.send(data);
    })
  .catch(err => err)

});


// get hourly forecast
router.get('/forecast', function(req, res, next) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+req.cookies.lat+'&lon='+req.cookies.lon+'&units=imperial&appid='+process.env.API)
  .then(response => response.json())
  .then(data => {
      var main = data.weather;
      res.send(data);
    })
  .catch(err => err)

});


module.exports = router;
