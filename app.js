var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Mahasiswa = require("./models/Mahasiswa");
var methodOverride = require("method-override");
var app = express();

mongoose.connect("mongodb://127.0.0.1/dbmahasiswa");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get('/goInput', function(req, res){
  res.render("input");
})

app.post("/input", function(req, res){
  var nim = req.body.nim;
  var nama = req.body.nama;
  var alamat = req.body.alamat;
  var telfon = req.body.telfon;

  var newMahasiswa = {nim : nim, nama:nama, alamat:alamat, telfon:telfon};
  if(nim === "" || nama ==="" || alamat ==="" || telfon ===""){
        res.redirect("/goInput");
        alert("silahkan isi field terlebih dahulu");
  }else{
    Mahasiswa.create(newMahasiswa, function(err, newCreatedMahasiswa){
      if(err){
        res.send("errornya tuh disini");
      }else{
        res.redirect("/list");
      }
    })
  }
})

app.get("/goList", function(req, res){
  res.render("list");
})

app.get("/list", function(req, res){
  Mahasiswa.find({}, function(err, allMahasiswa){
    if(err){
      res.send("errornya tuh disini");
    }else{
      res.render("list", {mahasiswa : allMahasiswa});
    }
  })
})

app.get("/:id/edit", function(req, res){
  Mahasiswa.findById(req.params.id, function(err, foundMahasiswa){
      if(err){
        res.send("errornya tuh disini");
      }else{
        res.render("edit",{mahasiswa : foundMahasiswa})
      }
  })
})

app.put("/:id", function(req, res){
  Mahasiswa.findByIdAndUpdate(req.params.id, req.body.mahasiswa, function(err, updatedMahasiswa){
    if(err){
      res.send("errornya tuh disni");
    }else{
      res.redirect("/list");
    }
  })
})

app.delete("/delete/:id", function(req, res){
  Mahasiswa.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.send("errornya tuh disini");
    }else{
      res.redirect("/list")
    }
  })
})

app.get("/", function(req, res){
  res.render("index");
});

app.listen("1337", function(){
  console.log("server is running");
});
