var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');


// GET request to create cookie
router.get('/', function(req, res, next) {
  console.log("my lat: " + req.query.lat);
  console.log("my long: " + req.query.lon);
  res.cookie("lat", req.query.lat);
  res.cookie("lon", req.query.lon);
  next()
});
module.exports = router;
