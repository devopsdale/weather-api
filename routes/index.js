

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
//var session = require('express-session');

router.use(cookieParser());
//router.use(session({secret: 'weatherApiSecret', saveUninitialized: true, resave: true}));

// router.use('/api', require('./api.v0/.js'));


  // router.get('/', function(req, res, next) {
  //   var info = req.query;
  //   var coor = JSON.parse(info);
  //   console.log("%%%%%%%%%");
  //   console.log(coor);
  //   res.render('index', { title: 'meme' });
  // });


// var coord = loc();


// fetch('https://api.darksky.net/forecast/'+process.env.API+'/'+lat+','+lon)
// .then(response => response.json())
// .then(data => {
//     var currently = JSON.stringify(data.currently);
//   })
// .catch(err => err)


// router.get('/', function(req, res, next) {

//   var info = req.query;
//   var lat=34.0353778
//   var lon=-84.2644238



//   console.log("lat: "+lat+" lon: "+lon);

//   fetch('/api/currently')
//   .then(response => response.json())
//   .then(data => {
//       var currently = JSON.stringify(data.currently);
//       console.log(currently);
//       res.render('index' );
    
//     })
//   .catch(err => err)

  
/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log(req.query.lat);
  res.cookie("lat", req.query.lat);
  res.cookie("lon", req.query.lon);

  fetch('/api/currently')
  .then(response => response.json())
  .then(data => {
      var currently = JSON.stringify(data.currently);
    })
  .catch(err => err)


  //console.log(req.session);

  
  res.render('index');
});

module.exports = router;
