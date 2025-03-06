const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=" +
    process.env.WEATHERSTACK_API_KEY +
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
