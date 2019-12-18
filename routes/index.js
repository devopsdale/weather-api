

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

fetch('https://api.darksky.net/forecast/3d33ca9c7e52f847d713d8c3740d5f79/37.8267,-122.4233')
  .then(response => response.json())
  .then(data => {
    console.log(data.currently)
    var info = JSON.stringify(data.currently);

    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Weather', info: info });
    });

  })
  .catch(err => err)



module.exports = router;
