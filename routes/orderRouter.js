var express = require('express');
var router = express.Router();

var orderModel = require('../models/Order');
const checkToken = require('../routes/checkToken');

// 1 xem                 x
// 2 Thêm người dùng     x              
// 3 Xóa người dùng       x              
// 4 Sửa                x

//xem danh sách order
router.get('/list', checkToken, async function(req, res, next) {
  try{
    var list = await orderModel.find();
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({status: false, message: e.message});
  }
});

// thêm order
// localhost:3000/orderRouter/add
router.post('/add',checkToken, async function(req, res, next) {
  try{
    const {date, idUser, total} = req.body;
    const newItem  = {date, idUser, total};
    await orderModel.create(newItem);
    res.status(200).json(newItem);
  }catch(e){
    res.status(400).json({status: false, message: e.message});
  }
});

// xóa 
// localhost:3000/orderRouter/delete/:id
router.delete('/delete', checkToken, async function(req, res, next) {
  try{
    const {id} = req.body;
    await orderModel.findByIdAndDelete(id);
    res.status(200).json({status: true, message: "Xóa thành công"});
  }catch(e){
    res.status(400).json({status: false, message: e.message});
  }
});

// sửa
// localhost:3000/orderRouter/update
router.put('/update',checkToken, async function(req, res, next) {
  try{
    const {id, date, idUser, total} = req.body;
    await orderModel.findByIdAndUpdate(id, {date, idUser, total});
    res.status(200).json({status: true, message: "Sửa thành công"});
    }catch(e){
        res.status(400).json({status: false, message: e.message});
    }
});

module.exports = router;
