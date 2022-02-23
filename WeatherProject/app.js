const express = require("express");
const app = express();
const https = require("https");



app.get("/",function(req,res){
  const url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=061a58bb2f51b64cfb9a5dc822b0f641&units=metric"
  https.get(url,function(response){
    console.log(response.statusCode)
    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon =weatherData.weather[0].icon
      const imageURL= "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      // console.log(temp,weatherDescription)
      res.write("<h1>The temperature in London is "+ temp + "degrees Celcius</h1>")
      res.write("<h1> The weather is currently "+ weatherDescription+"/<h1>")
      res.write("<img src="+imageURL+">")
      res.send()
    })
  })
})




app.listen(3000,function(){
  console.log("server is running on port 3000");
});
