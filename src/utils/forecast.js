const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=8210071483db20cfcceb2f219e587fbe&query=" +
    +latitude +
    "," +
    longitude +
    "";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather service");
    } else if (response.body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". It's " +
          response.body.current.temperature +
          " degrees out, but it feel likes " +
          response.body.current.feelslike +
          " degrees out."

        // {
        //   description: response.body.current.weather_descriptions[0],
        //   temperature: response.body.current.temperature,
        // }
        // temperature2: response.body.current.feelslike,
        // console.log(

        // response.body.current.weather_descriptions[0] +
        //   ". It's " +
        //   response.body.current.temperature +
        //   " degrees out,  but it feel likes " +
        //   response.body.current.feelslike +
        //   " degrees out"
        // )
      );
    }
  });
};

module.exports = forecast;
