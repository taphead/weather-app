const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { error } = require("console");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Test",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Express",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message:
      "Simply provide the desired location in the search field under the weather tab and click on Search",
    title: "Help",
    name: "Express",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        } else {
          return res.send({
            location: location,
            description: forecastData.description,
            temperature: forecastData.temperature,
            feelsLike: forecastData.feelslike,
          });
        }
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Express",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Express",
    errorMessage: "Page not found",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
