const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function () {
  console.log("Server running on port 3000.");
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
  const query = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=9b5385010c7c18ca07e3e4346ef0976a&units=metric"
  https.get(url, function(response){
    response.on("data", function (data){
      const weatherData = JSON.parse(data);
      var temp = weatherData.main.temp
      var descp = weatherData.weather[0].description
      var icon = weatherData.weather[0].icon
      var imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The temperature in "+query+" is " + temp + " Celsius</h1>");
      res.write("<h3>The weather is currently " + descp + "</h3>")
      res.write('<img src=' + imageURL +' alt="">')
      res.send();
    })
  })
})
