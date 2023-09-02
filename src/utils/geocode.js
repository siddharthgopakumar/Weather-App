const request = require("request");

const geocode = (address, callback) => {
  const posUrl = `https://eu1.locationiq.com/v1/search?key=pk.3a07ea45c2b53234ef5d9d12ed5ec0e4&q=${address}&format=json&limit=1`;
  request({ url: posUrl, json: true }, (error, res, body = {}) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (!body?.length) {
      callback("Unable to find the location. Try another search");
    } else {
      callback(undefined, {
        latitude: body[0].lat,
        longitude: body[0].lon,
        place: body[0].name,
      });
    }
  });
};

module.exports = geocode;
