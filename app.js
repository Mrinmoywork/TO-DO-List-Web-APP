//jshint ESversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));  //bodyParser
app.use(express.static("public")); // converted static to a web page through the backend server

app.get("/", function(req, res)
{
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day =  today.toLocaleDateString("en-US", options);

    //from list.ejs
    res.render("list",{
        listTitle: day,
        newListItems: items,
    });

});

app.post("/", function(req, res){
    console.log(req.body);
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

//work route
app.get("/work", function(req,res){
    res.render("list",{
        listTitle: "work List",
        newListItems: workItems
    });
});

app.post("/work",function(req,res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000,function(){
    console.log("Server started on port 3000");
});