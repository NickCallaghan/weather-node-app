const express = require("express");
const cors = require("cors");
require("dotenv").config();
const weather = require("./weather");

const app = express();
const port = process.env.PORT;

const apiKey = process.env.API_KEY;
const lat = process.env.LAT;
const long = process.env.LONG;

app.use(cors());
app.use(express.json());

app.get("/api", async (req, res) => {
  const weatherReport = await weather(apiKey, lat, long);
  console.log(weather);
  await res.json({ weatherReport });
});

// The test below is returns static data in order to avoid OpenWeather API rate limits during development
app.get("/api/test", async (req, res) => {
  const testData = {
    weatherReport: {
      windspeeds: [
        {
          dt: 1575212300,
          dtText: "2019-12-01 12:00:00",
          windspeed: 3.45,
          windDirection: 255
        },
        {
          dt: 1575212400,
          dtText: "2019-12-01 15:00:00",
          windspeed: 4.27,
          windDirection: 255
        },
        {
          dt: 1575223200,
          dtText: "2019-12-01 18:00:00",
          windspeed: 5.17,
          windDirection: 248
        },
        {
          dt: 1575234000,
          dtText: "2019-12-01 21:00:00",
          windspeed: 5.64,
          windDirection: 247
        }
      ],
      maxWindSpeed: 5.64,
      isSafeToErect: false
    }
  };
  res.json(testData);
});

app.listen(port, () => console.log(`App listening on port ${port}`));
