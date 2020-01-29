const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var moment = require('moment-timezone');
var zipcodes = require("zipcodes")

var GetWeather = {
    current: function current(lat, lon){
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
    
    },

    hourly: function hourly(lat, lon){
        return fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial&appid='+process.env.API)
        .then(response => response.json())
        .then(data => {
            var list = data.list;
            var dl = data.list;
            var hourly_forecast = []
            for (i=0; i < 3; i++){
              var time = dl[i].dt_txt
              var temp = Math.round(dl[i].main.temp)
              var description = dl[i].weather[0].description
              var icon = dl[i].weather[0].icon
              var day = {
                time: time,
                temp: temp,
                description: description,
                icon: icon
              };
              hourly_forecast.push(day) 
            } 
            return hourly_forecast;
          })
        .catch(err => err)
    
    }

}








module.exports = GetWeather