var express = require('express');
var router = express.Router();
var modelCate = require('../models/Category');
var modelProd = require('../models/Product');

/* GET home page. */
//http://localhost:3000/
router.get('/', async function(req, res, next) {
  var _list = await modelProd.find().populate("category");
  
  res.render('index', {title: "Quản lý sản phẩm", list: _list });
});

//thêm
//localhost:3000/add
//hiển thị trang thêm
router.get('/add', async function(req, res, next) {

  var listCate = await modelCate.find();

  res.render('add', {listCate: listCate});
});

//xử lý form trang thêm
router.post('/add-product', async function(req, res, next){
  const {name, price, quantity, image, category} = req.body;

  const newItem = {name, price, quantity, image, category};
  await modelProd.create(newItem);

  res.redirect("/");

});

//localhost:3000/delete/12233
router.get("/delete/:id", async function(req, res, next){
  const {id} = req.params;
  await modelProd.findByIdAndDelete(id);
  res.redirect("/");
});

module.exports = router;