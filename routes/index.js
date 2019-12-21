

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
//var session = require('express-session');

  
router.get('/', function(req, res, next) {
  res.cookie("lat", req.query.lat);
  res.cookie("lon", req.query.lon);
  console.log(req.query);
  console.log("cookie setter &&&&&&&&&&&&&&");
  next();
});




router.get('/', function(req, res, next) {
  var lat = req.query.lat;
  var lon = req.query.lon;
  console.log("did we fetch -----------------------");
  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial&appid='+process.env.API)
  //fetch('https://api.darksky.net/forecast/3d33ca9c7e52f847d713d8c3740d5f79/37.8267,-122.4233')
  
  .then(response => response.json())
  .then(data => {
      console.log(data);

      
      var top = data.main.temp.toString();
      //var bottom = data.weather.description.replace(" ", "_");
      
      var bottom = "test";
      var url = "https://memegen.link/feelsgood/"+top+"_and/"+bottom+".jpg";
      //var url = "https://memegen.link/feelsgood/70_and/sunny.jpg";
      // console.log(x);
      //var url = "https://pmcvariety.files.wordpress.com/2019/04/wu-tang-clan-e1556300913498.jpg?w=995";

      res.render('index', {url: url});
    })
  .catch(err => "error")
  
});



module.exports = router;
