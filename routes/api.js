

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var session = require('express-session');



router.get('/cookie', function(req, res, next) {
  res.cookie("lat", req.query.lat);
  res.cookie("lon", req.query.lon);
  console.log("testing this ===============" +req.query.lon);
  next();

});


// router.get('/cookie', function(req, res, next) {

//   console.log("get endpoint is reached with coordinates-------------");
//   fetch('https://api.openweathermap.org/data/2.5/weather?lat='+req.query.lat+'&lon='+req.query.lon+'&units=imperial&appid='+process.env.API)
//   //fetch('https://api.openweathermap.org/data/2.5/weather?lat=33&lon=103&units=imperial&appid='+process.env.API)
  
//   .then(response => response.json())
//   .then(data => {
//       //console.log(data);

      
//       var top = Math.round(data.main.temp);
//       var test = data.weather.description;
//       var main = data.weather;
//       var bottom = main[0].description;
//       var bottom = bottom.replace(" ", "_");
//       //ar url = "https://memegen.link/feelsgood/"+top+"_and/"+bottom+".jpg";
//       //var url = "https://memegen.link/feelsgood/70_and/sunny.jpg";
//       // console.log(x);
//       var url = "https://pmcvariety.files.wordpress.com/2019/04/wu-tang-clan-e1556300913498.jpg?w=995";

//       response.redirect(request.get('index', {url: url}));
//     })
//   .catch(err => "error")

  
// });


router.get('/currently', function(req, res, next) {

  //console.log('lat: ', req.cookies.lat)
  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+req.cookies.lat+'&lon='+req.cookies.lon+'&units=imperial&appid='+process.env.API)

  .then(response => response.json())
  .then(data => {
      var main = data.weather;
      res.send(main[0].description);
    })
  .catch(err => err)

});



module.exports = router;
