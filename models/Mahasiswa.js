var mongoose = require('mongoose'),
    MahasiswaSchema = new mongoose.Schema({
        nim : String,
        nama : String,
        alamat : String,
        telfon : String
    });

    module.exports = mongoose.model("Mahasiswa", MahasiswaSchema);
