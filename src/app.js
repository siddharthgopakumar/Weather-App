const path = require("path");
const express = require("express");
const hbs = require("hbs");
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
    title: "Weather Page",
    name: "Siddharth",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Siddharth",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Siddharth",
    helpMessage: "I am here to help, how could I help?",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geocode(address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, weather) => {
      if (error) {
        return res.send({ error });
      }
      res.send(weather);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorText: "article not found",
    name: "Siddharth",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorText: "resource not found",
    name: "Siddharth",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
