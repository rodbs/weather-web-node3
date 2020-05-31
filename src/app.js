const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Static contet (it's need to load the css and js)
app.use(express.static(publicDirPath));

// Dynamic content
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Manolo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Manolo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Manolo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        //
        // console.log("Error: ", error);
        // console.log("Data: ", data);
        // console.log(location);
        // console.log(forecastData);
        res.send({
          address: req.query.address,
          location,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "My 404",
    errorMessage: "Help page not found",
    name: "Manolo",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "My 404",
    errorMessage: "Page not found",
    name: "Manolo",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
