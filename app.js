var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Mahasiswa = require("./models/Mahasiswa");
var MahasiswaRouter = require("./router/MahasiswaRouter");
var methodOverride = require("method-override");
var app = express();

mongoose.connect("mongodb://127.0.0.1/dbmahasiswa");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

app.use(MahasiswaRouter);


app.listen("1337", function(){
  console.log("server is running");
});
