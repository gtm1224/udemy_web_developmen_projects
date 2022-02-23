const express = require("express");
const bodyParser = require("body-parser");
const app =express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var result = Number(req.body.num1)+Number(req.body.num2);
  res.send("Your calculation result is "+result);
});

app.get("/bmiCalculator",function(req,res){
  res.sendFile(__dirname+"/bmiCalculator.html");
});
app.post("/bmiCalculator",function(req,res){
  var bmi = parseFloat(req.body.weight)/parseFloat(req.body.height)/parseFloat(req.body.height);
  res.send("Your BMI is "+bmi+"");
});


app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
