const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser:true});

const fruitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please check your data entry, no name specified!"]
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review:String
});


// will cause error because no name specified
const Fruit = mongoose.model("Fruit",fruitSchema);
const fruit = new Fruit({
    // name:"Apple",
    rating:7,
    review:"Pretty solid as a fruit."
});

// fruit.save();

//add favoriteFruit
const personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    favoriteFruit:fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const pineapple = new Fruit({
    name:"Pineapple",
    score: 9,
    review: "Great fruit."
});

// pineapple.save();


const mango = new Fruit({
    name:"mango",
    score:6,
    review:"Great fruit."
});
mango.save();


Person.updateOne({name:"John"},{favoriteFruit:mango},err=>{
    if(err){
        console.log(err);
    }else{
        console.log("Successfully updated the document");
    }
});

// const person = new Person({
//     name:"John",
//     age:"37"
// });
// person.save();

const person  =new Person({
    name:"Amy",
    age:12,
    favoriteFruit: pineapple
});

// person.save()

const kiwi = new Fruit({
    name:"Kiwi",
    score:10,
    review:"The best fruit!"
});

const orange = new Fruit({
    name:"Orange",
    score:4,
    review:"Too sour for me"
});

const banana = new Fruit({
    name:"Banna",
    score:3,
    review:"Weird texture"
});

// insert many
// Fruit.insertMany([kiwi,orange,banana],function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully saved all the fruits to fruitsDB");
//     }
// });

// read and find 
Fruit.find(function(err,fruits){
    if(err){
        console.log(err);
    }else{
        console.log(fruits);
        fruits.forEach(f=>{
            console.log(f.name);
        })
    }
    // mongoose.connection.close();
})


// update and delete examples:
Fruit.updateOne({_id:"621c2102820a6f20fb6d62d8"},{name:"Peach"},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully updated the document.");
    }
});

Fruit.deleteOne({name:"Orange"},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully deleted the document");
    }
});

Fruit.deleteMany({name:"Orange"},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully deleted the document");
    }
});