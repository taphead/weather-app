require("dotenv").config();
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
module.exports = { WEATHERSTACK_API_KEY, MAPBOX_API_KEY };
