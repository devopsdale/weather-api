

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
//var session = require('express-session');

router.use(cookieParser());

  
/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log(req.query.lat);
  res.cookie("lat", req.query.lat);
  res.cookie("lon", req.query.lon);
  // console.log("1st");
  next();
  //res.render('index');
});

router.get('/', function(req, res, next) {
  fetch('https://api.darksky.net/forecast/'+process.env.API+'/'+req.cookies.lat+','+req.cookies.lon)
  //fetch('https://api.darksky.net/forecast/3d33ca9c7e52f847d713d8c3740d5f79/37.8267,-122.4233')
  .then(response => response.json())
  .then(data => {
      console.log(icon);
      res.render('index', {icon: data.currently.icon});
    })
  .catch(err => "error")
  
});



module.exports = router;
