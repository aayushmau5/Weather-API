const express = require("express");
const router = express.Router();
const Post = require("../Models/Post");
const fetch = require("node-fetch");
require("dotenv/config");
const cities = require("../cities");

let time = 1;

router.post("/", async (req, res) => {
  if (time == 1) return res.send("Data Already Present.");
  await getData();
});

function getWeather(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1107429ef67f4ff90050a129c01b5219`;
  return new Promise((res, rej) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        res(data.main.temp);
      })
      .catch((err) => rej(err));
  });
}

function getData() {
  cities.forEach((place) => {
    getWeather(place)
      .then((data) => {
        const post = new Post({
          City: place,
          Temp: data,
        });
        post
          .save()
          .then((data) => console.log(data))
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  });
}

module.exports = router;
