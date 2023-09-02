const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a77ee807fb39d43c4ddfe45b794890a0&query=${lat},${long}&units=f`;
  request({ url, json: true }, (err, res, { error, current, location }) => {
    if (err) {
      callback("Unable to connect weather services!", undefined);
    } else if (error) {
      callback("Unable to find the weather for given location", undefined);
    } else {
      callback(undefined, {
        currentTemperature: current.temperature,
        weatherDescription: current["weather_descriptions"][0],
        location: location.name,
      });
    }
  });
};

module.exports = forecast;
