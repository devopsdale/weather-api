

var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

fetch('https://example.com')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => err)

  console.log('API Key:', process.env.API);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather' });
});

module.exports = router;
