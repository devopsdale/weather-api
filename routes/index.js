

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var session = require('express-session');

  
router.get('/', function(req, res, next) {
  var url = "https://memegen.link/boat/checking/weather.jpg";
  res.render('index', {url: url} );
});





module.exports = router;
