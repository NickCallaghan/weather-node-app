const express = require("express");
const app = express();
require("dotenv").config();
const weather = require("./weather");

const apiKey = process.env.API_KEY;
const lat = process.env.LAT;
const long = process.env.LONG;

const port = process.env.PORT;

app.use(express.json());

app.get("/api", async (req, res) => {
  const weatherReport = await weather(apiKey, lat, long);
  console.log(weather);
  await res.json({ weatherReport });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
