// please see my deployed version at: https://morning-beyond-45359.herokuapp.com/
// API key will not show in this file
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const app =express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]

    };
    const jsonData = JSON.stringify(data);
    const url ="https://us14.api.mailchimp.com/3.0/lists/eb38ca41d5";

    const options={
        method: "POST",
        auth:"APIproject:API key will not show here"
    }
    const request = https.request(url,options,function(response){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));

        });

    });
    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000. ")
});

