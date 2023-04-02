const express = require('express')
const path = require('path')
var expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
var mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json()) 
app.use(express.urlencoded())
app.engine('hbs', expressHbs.engine());
app.engine('.hbs', expressHbs.engine({ extname: "hbs" }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
var uri = 'mongodb+srv://viet1997:viet2301@cluster0.fso1uhw.mongodb.net/cp17302?retryWrites=true&w=majority'

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


const SinhVien = require('./SinhVienModel');

app.get('/', async (req, res, next) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));
    await SinhVien.find({}).then(sinhviens => {
        res.render('home', {
            sinhviens: sinhviens.map(SinhVien => SinhVien.toJSON())
        });
    })
});
app.get('/form-add', async (req, res, next) => {
    res.render('form-add')
})
app.post('/add', async (req, res, next) => {
    const add = new SinhVien(req.body);
    await add.save();
    res.redirect('/')
});



app.post("/delete", async (req, res) => {
    try {
      await SinhVien.deleteOne({ _id: req.body.id });
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });

  app.post("/edit", async (req, res) => {
    try {
      await mongoose.connect(uri).then(console.log("dang nhap thanh cong"));
      const sinhviens = await SinhVien.findOne({ _id: req.body.id });
      if (sinhviens) {
        sinhviens.stt = req.body.stt;
       sinhviens.ten = req.body.ten;
        sinhviens.lop= req.body.lop;
       sinhviens.diemtb = req.body.diemtb;
        await sinhviens.save();
        res.redirect("/");
      }
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });
  

const port = 3030

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});