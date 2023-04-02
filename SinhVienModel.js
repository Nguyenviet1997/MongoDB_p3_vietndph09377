const mongoose = require('mongoose');
const  SinhVienSchema = new mongoose.Schema({
    stt: {
        type: Number
    },
    ten: {
        type: String,
    },
   lop: {
        type: String,
    },
    diemtb: {
        type: String,
    },
   
});

const SinhVien = new mongoose.model('sinhvien', SinhVienSchema);
module.exports = SinhVien;