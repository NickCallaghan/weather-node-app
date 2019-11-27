const http = require("http");
const cliArguments = process.argv.slice(2);
require("dotenv").config();

// This app users the open weather api, please sign up for an api key at www.openweathermap.org
const apiKey = process.env.API_KEY;

function location(cliArguments) {
  const location = `${cliArguments[0]},${cliArguments[1]}`;
  return location;
}

function printWeather(weather) {
  console.log(
    `The weather in ${weather.name}, ${weather.sys.country} is: ${weather.weather[0].description} clear and the windspeed is ${weather.wind.speed}mps`
  );
}

function printError(error) {
  console.error(error.message);
}

function get(apiKey, location) {
  const queryString = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
  try {
    const request = http.get(queryString, res => {
      if (res.statusCode === 200) {
        let body = "";
        // Read data
        res.on("data", chunk => {
          body += chunk;
        });
        res.on("end", () => {
          const weather = JSON.parse(body);
          printWeather(weather);
        });
      } else {
        const statusCodeError = new Error(
          `There was an error getting the message for: ${location}. (${
            http.STATUS_CODES[res.statusCode]
          })`
        );
        printError(statusCodeError);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}

get(apiKey, location(cliArguments));
