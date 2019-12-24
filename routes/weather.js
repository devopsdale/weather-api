var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var session = require('express-session');



router.get('/', function(req, res, next) {
  console.log("my lat: " + req.query.lat);
  console.log("my long: " + req.query.lon);
  res.cookie("lat", req.query.lat);
  res.cookie("lon", req.query.lon);

  res.end()
    // fetch('https://api.openweathermap.org/data/2.5/weather?lat='+req.cookies.lat+'&lon='+req.cookies.lat+'&units=imperial&appid='+process.env.API)
  // .then(response => response.json())
  // .then(data => {
  //     // var top = Math.round(data.main.temp);
  //     // var test = data.weather.description;
  //     // var main = data.weather;
  //     // var desc = main[0].description;
  //     // var icon = main[0].icon;
  //     // var bottom = bottom.replace(" ", "_");
  //     console.log(data.weather)
  //     //var url = "https://memegen.link/cryingfloor/"+top+"_and/"+bottom+".jpg";
  //     var url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
  //     res.send(data);
  //   })
  // .catch(err => err)
});
module.exports = router;
