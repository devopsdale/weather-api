var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var session = require('express-session');



// router.get('/', function(req, res, next) {
//   //res.cookie("lat", req.query.lat);
//   //res.cookie("lon", req.query.lon);
//   //console.log(req.query);
//   console.log(req.query.lat+ "-----------------------");
//   //fetch('https://api.openweathermap.org/data/2.5/weather?lat='+req.cookie.lat+'&lon='+req.cookie.lon+'&units=imperial&appid='+process.env.API)
//   fetch('https://api.openweathermap.org/data/2.5/weather?lat=33&lon=103&units=imperial&appid='+process.env.API)
//   .then(response => response.json())
//   .then(data => {
//       console.log(data.weather);

      
//       // var top = Math.round(data.main.temp);
//       // var test = data.weather.description;
//       // var main = data.weather;
//       // var bottom = main[0].description;
//       // var bottom = bottom.replace(" ", "_");
//       //var url = "https://memegen.link/feelsgood/"+top+"_and/"+bottom+".jpg";
//       var url = "https://memegen.link/feelsgood/70_and/sunny.jpg";
//       console.log(x);
//       //var url = "https://pmcvariety.files.wordpress.com/2019/04/wu-tang-clan-e1556300913498.jpg?w=995";

//       res.render('weather');
//     })
//   .catch(err => "error")
// });

router.get('/', function(req, res, next) {

  console.log('lat: ', req.cookies.lat)
  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+req.query.lat+'&lon='+req.query.lon+'&units=imperial&appid='+process.env.API)

  .then(response => response.json())
  .then(data => {
      var top = Math.round(data.main.temp);
      var test = data.weather.description;
      var main = data.weather;
      var bottom = main[0].description;
      var bottom = bottom.replace(" ", "_");
      var url = "https://memegen.link/feelsgood/"+top+"_and/"+bottom+".jpg";
      res.render("weather", {url: url} );
    })
  .catch(err => err)

});

module.exports = router;
