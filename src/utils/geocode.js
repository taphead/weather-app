const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=" +
    process.env.MAPBOX_API_KEY;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (body.features.length === 0) {
      callback("Unable to find locaion. Try another search");
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
