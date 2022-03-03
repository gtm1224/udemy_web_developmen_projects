const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express()

app.use(bodyParser.urlencoded({extended:true}));
app.use('view engine','ejs');

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

// create article schema
const articleSchema = {
    title:String,
    content:String
};
// create mongodb model through schema

const Article = mongoose.model("Article",articleSchema);




app.listen(3000,function(){
    console.log("server started on port 3000");
});