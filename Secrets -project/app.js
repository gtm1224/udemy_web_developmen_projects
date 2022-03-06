require('dotenv').config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const md5 = require("md5");
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const saltRound = 10;

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));



// console.log(process.env.SECRET_KEY);
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});



userSchema.plugin(encrypt,{secret:process.env.SECRET_KEY,encryptedFields: ['password']});

const User = new mongoose.model("User",userSchema);

app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});


app.post("/register",function(req,res){
    
    bcrypt.hash(req.body.password,saltRound,function(err,hash){
        if(!err){
            const newUser = new User({
                email:req.body.username,
                password: hash
            });
            newUser.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.render("secrets");
                }
            });
        }else{
            console.log(err);
        }
        
    });
    
    
});

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email:username},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                bcrypt.compare(password,foundUser.password,function(err,result){
                        if(result){
                            res.render("secrets");
                        }else{
                            console.log(err);
                        }
                });
            }
        }
    });
})




app.listen(3000,function(){
    console.log("Server started on port 3000.");
});