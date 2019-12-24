

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var session = require('express-session');

  
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
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+req.cookies.lat+'&lon='+req.cookies.lat+'&units=imperial&appid='+process.env.API)
    .then(response => response.json())
    .then(data => {
        // var top = Math.round(data.main.temp);
        // var test = data.weather.description;
        var main = data.weather;
        var desc = main[0].description;
        var icon = main[0].icon;
        // var bottom = bottom.replace(" ", "_");
        console.log(data.weather)
        //var url = "https://memegen.link/cryingfloor/"+top+"_and/"+bottom+".jpg";
        var url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.render('index', {display: "none", url: url, weatherdisplay: "flex", desc:desc });
      })
    .catch(err => err)
  }
  
});

router.post('/submit-form', (req, res) => {
  const zip = req.body.zip
  console.log(zip)
  fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&units=imperial&appid='+process.env.API)
  .then(response => response.json())
  .then(data => {
      // var top = Math.round(data.main.temp);
      // var test = data.weather.description;
      var main = data.weather;
      var desc = main[0].description;
      var icon = main[0].icon;
      // var bottom = bottom.replace(" ", "_");
      console.log(data.weather)
      //var url = "https://memegen.link/cryingfloor/"+top+"_and/"+bottom+".jpg";
      var url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.render('index', {display: "none", url: url, weatherdisplay: "flex", desc:desc });
    })
  .catch(err => err)

})

module.exports = router;
                