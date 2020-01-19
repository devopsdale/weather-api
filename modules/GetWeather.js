const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var moment = require('moment-timezone');
var zipcodes = require("zipcodes")

function GetWeather(lat, lon){
    return fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial&appid='+process.env.API)
    .then(response => response.json())
    .then(data => {
        var weather = {
        temp: Math.round(data.main.temp),
        high: Math.round(data.main.temp_max),
        low: Math.round(data.main.temp_min),
        humid: data.main.humidity,
        wind: Math.round(data.wind.speed),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        location: data.name
        };
        return weather;
    })
    .catch(err => err)

}



module.exports = GetWeather