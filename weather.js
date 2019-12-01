const fetch = require("node-fetch");
require("dotenv").config();

// This app users the open weather api, please sign up for an api key at www.openweathermap.org

const safeSpeed = process.env.SAFE_SPEED;

function getWindSpeeds(weather) {
  const windspeeds = [...weather.list].map(obj => {
    const forecast = {
      dt: obj.dt,
      dtText: obj.dt_txt,
      windspeed: obj.wind.speed,
      windDirection: obj.wind.deg
    };
    return forecast;
  });
  return windspeeds;
}

function determineMaxWindSpeed(windspeeds) {
  const windspeedArr = [];
  windspeeds.forEach(forecast => {
    windspeedArr.push(forecast.windspeed);
  });
  const maxWindspeed = Math.max(...windspeedArr);
  return maxWindspeed;
}

function filterWindSpeeds(windspeeds, date = new Date()) {
  //   const dateString = `${date.getFullYear()}-${date.getMonth() +
  //     1}-${date.getDate()}`;
  const dateString = `2019-12-01`;
  const regex = new RegExp(dateString);
  const todaysWindSpeeds = windspeeds.filter(forecast => {
    return regex.test(forecast.dtText);
  });
  return todaysWindSpeeds;
}

module.exports = async function getOWForecast(apiKey, lat, long) {
  try {
    const queryString = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${apiKey}`;

    const response = await fetch(queryString);
    const weather = await response.json();
    const windspeeds = getWindSpeeds(weather);
    const todaysWindSpeeds = filterWindSpeeds(windspeeds);
    const maxWindSpeed = determineMaxWindSpeed(todaysWindSpeeds);
    const isSafeToErect = maxWindSpeed < safeSpeed ? true : false;
    const weatherReport = {
      windspeeds: todaysWindSpeeds,
      maxWindSpeed,
      isSafeToErect
    };
    console.log(weatherReport);
    return weatherReport;
  } catch (err) {
    console.log(err);
  }
};
