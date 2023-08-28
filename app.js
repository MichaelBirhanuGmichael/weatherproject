const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;
  const appKey = "5c85236caeef54fdbe825de79731de89";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    appKey +
    "&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + description + "</p>");
      res.write(
        "<h1>The Tempreature in " +
          city +
          " is " +
          temp +
          " degree celcius.</h1>"
      );
      res.write("<img src=" + iconUrl + ">");
      res.send();
    });
  });
});

app.listen(process.env.PORT||3000, function () {
  console.log("server is started on port 3000.");
});
