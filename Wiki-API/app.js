const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express()

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

// create article schema
const articleSchema = {
    title: String,
    content: String
};
// create mongodb model through schema

const Article = mongoose.model("Article",articleSchema);


// request targeting all articles
app.route("/articles").get(
    function(req,res){
        Article.find(function(err,foundArticles){
            if(!err){
                res.send(foundArticles);
            }else{
                console.log(err);
            }
            
        });
    }
)
.post(
    function(req,res){
        // console.log(req.body.title);
        // console.log(req.body.content);
        const newArticle = new Article({
            title:req.body.title,
            content:req.body.content
        });
        newArticle.save(function(err){
            if(!err){
                res.send("Successfully added a new article.");
            }else{
                res.send(err);
            }
        });
    }
)
.delete(
    function(req,res){
        Article.deleteMany(function(err){
            if(!err){
                res.send("Successfully deleted all articles.");
            }else{
                res.send(err);
            }
        });
    }
);

// request targeting a specific article

app.route("/articles/:articleTitle")
.get(function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err,foundDoc){
        if(foundDoc){
            res.send(foundDoc);
        }else{
            res.send("No articles matching that title was found.");
        }
    });
}
)
.put(function(req,res){
    Article.updateOne(
        {title:req.params.articleTitle},
        {
            title:req.body.title,
            content:req.body.content
        },
        // {overwrite:true},
        function(err,result){
            if(!err){
                res.send("Successfully updated article.");
            }
        }
    )
}
)
.patch(function(req,res){
    Article.updateOne(
        {title:req.params.articleTitle},
        {$set:req.body},
        function(err){
            if(!err){
                res.send("Successfully update");
            }else{
                res.send(err);
            }
        }
    )
}
)
.delete(function(req,res){
    Article.deleteOne(
        {title:req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Successfully deleted the corresponding article.");
            }else{
                res.send(err);
            }
        }
    )
}
);

app.listen(3000,function(){
    console.log("server started on port 3000");
});