// set up
const express = require("express");
const bodyParser = require("body-parser");
const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

//init variables:
let items=[];



//get method:
app.get("/",function(req,res){
    let today = new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    let day = today.toLocaleDateString("en-US",options)
    console.log(day);
    res.render("list",{kindofDay:day,newListItem: items});

});

app.post("/",function(req,res){
    let item=req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});