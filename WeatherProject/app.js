const express = require("express");
const app = express();
const https = require("https");



app.get("/",function(req,res){
  const url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=061a58bb2f51b64cfb9a5dc822b0f641&units=metric"
  https.get(url,function(response){
    console.log(response.main);
  })
  res.send("hello world!")
})




app.listen(3000,function(){
  console.log("server is running on port 3000");
});
