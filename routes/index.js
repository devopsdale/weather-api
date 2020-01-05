

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');


router.get('/', function(req, res, next) {
  console.log(req.cookies);

  if (!req.cookies.lat){
    console.log("no luck");
    console.log("no luck");
    res.render('index', {display: "flex", weatherdisplay: "none"} );
  }
  else
  {
    console.log("we found a cookie!");
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+req.cookies.lat+'&lon='+req.cookies.lon+'&units=imperial&appid='+process.env.API)
    .then(response => response.json())
    .then(data => {
        var weather = data.weather;
        var main = data.main;
        var desc = weather[0].description;
        var icon = weather[0].icon; 
        console.log(data)
        var s = new Date(data.sys.sunrise).toLocaleDateString("en-US")
        var sys = data.sys;    
        res.render('index', {display:"none", icon:icon,  desc:desc , data:data, main:main, weather:weather[0]});
      })
    .catch(err => err)
  }
});

router.post('/cookie', (req, res) => {
  const zip = req.body.zip
  console.log(zip)
  fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&units=imperial&appid='+process.env.API)
  .then(response => response.json())
  .then(data => {
    var weather = data.weather;
    var main = data.main;
    var desc = weather[0].description;
    var icon = weather[0].icon; 
    console.log(data.sys.sunrise)
    var s = new Date(data.sys.sunrise).toLocaleDateString("en-US")
    var sys = data.sys;    
    res.render('index', {display: "none", icon: icon, weatherdisplay: "flex", desc:desc , data: data, main:main, weather: weather[0]});
    })
  .catch(err => err)
})


module.exports = router;
                