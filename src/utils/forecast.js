require("dotenv").config();
const { WEATHERSTACK_API_KEY } = require("../../test");
const request = require("request");
console.log(WEATHERSTACK_API_KEY);
const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=" +
    WEATHERSTACK_API_KEY +
    "&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
