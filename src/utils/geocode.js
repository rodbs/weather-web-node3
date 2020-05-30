const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoicm9kYnMiLCJhIjoiY2thcWlzMjY0MDA5eDJ4b2MwNGNkcXA0YSJ9.hBX1oRtacUGLx9wT86rRng";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather service");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
