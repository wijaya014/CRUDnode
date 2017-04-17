var express = require('express'),
    router = express.Router(),
    Mahasiswa = require("../models/Mahasiswa");

    router.get('/goInput', function(req, res){
      res.render("input");
    })

    router.post("/input", function(req, res){
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

    router.get("/goList", function(req, res){
      res.render("list");
    })

    router.get("/list", function(req, res){
      Mahasiswa.find({}, function(err, allMahasiswa){
        if(err){
          res.send("errornya tuh disini");
        }else{
          res.render("list", {mahasiswa : allMahasiswa});
        }
      })
    })

    router.get("/:id/edit", function(req, res){
      Mahasiswa.findById(req.params.id, function(err, foundMahasiswa){
          if(err){
            res.send("errornya tuh disini");
          }else{
            res.render("edit",{mahasiswa : foundMahasiswa})
          }
      })
    })

    router.put("/:id", function(req, res){
      Mahasiswa.findByIdAndUpdate(req.params.id, req.body.mahasiswa, function(err, updatedMahasiswa){
        if(err){
          res.send("errornya tuh disni");
        }else{
          res.redirect("/list");
        }
      })
    })

    router.delete("/delete/:id", function(req, res){
      Mahasiswa.findByIdAndRemove(req.params.id, function(err){
        if(err){
          res.send("errornya tuh disini");
        }else{
          res.redirect("/list")
        }
      })
    })

    router.get("/", function(req, res){
      res.render("index");
    });

    module.exports = router;
