var express = require('express');
var router = express.Router();

var productModel = require('../models/Product');
var cateModel = require('../models/Category');
const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId
var sendMail = require('../config/sendMail');
var upload = require('../config/upload');
const transporter = require('../config/sendMail'); // Import the configured transporter


// Lấy thông tin tất cả các sản phẩm
// Lấy thông tin sản phẩm theo ID
// Lấy tên và giá của tất cả các sản phẩm
// Lấy thông tin các sản phẩm có giá trên 1000
// Lấy thông tin các sản phẩm thuộc loại 'Bánh'
// Đếm số lượng sản phẩm trong mỗi loại (countDocuments)
// Lấy thông tin sản phẩm có số lượng ít hơn 10
// Cập nhật giá của sản phẩm theo ID, với giá người dùng truyền vào
// Xóa sản phẩm theo ID
// Lấy các sản phẩm có giá trong khoảng từ 500 đến 1500
// Lấy tên và số lượng của các sản phẩm có số lượng lớn hơn 20
// Lấy các sản phẩm có tên chứa từ khóa 'phone'
// Lấy thông tin sản phẩm đắt nhất
// Lấy thông tin sản phẩm rẻ nhất
// Lấy giá trung bình của các sản phẩm


// (*)Tính tổng giá trị của tất cả các sản phẩm (số lượng * giá)

// Lấy thông tin tất cả các sản phẩm
// http://localhost:3000/product/list
router.get('/list', async function(req, res, next) {
  try{
    const list = await productModel.find();
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Lấy thông tin sản phẩm theo ID
//http://localhost:3000/product/detailById
router.get('/detailById', async function(req, res, next) {
  try{
    var _id = req.body.id;
    var list = await productModel.find({_id: _id});
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
  
});

// Lấy tên và giá của tất cả các sản phẩm
// http://localhost:3000/product/nameAndPrice
router.get('/nameAndPrice', async function(req, res, next) {
  try{
    var list = await productModel.find({}, {name: 1, price: 1});
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Lấy thông tin các sản phẩm có giá trên 1000
// http://localhost:3000/product/priceOver1000
router.get('/priceOver1000', async function(req, res, next) {
  try{
    var list = await productModel.find({price: {$gt: 1000}});
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});


// câu này chưa xong

// Lấy thông tin các sản phẩm thuộc loại 'Bánh'
// http://localhost:3000/product/categoryCake
router.get('/categoryCake', async function(req, res, next) {
  try{
    // var category = await cateModel.find({ name: "Bánh" });
    // var categoryId = category ? category._id : "6691df6490af11e36615bfd2";
    // console.log(categoryId);
    
    var list = await productModel.find({ category: new ObjectId("6691df6490af11e36615bfd2") });
    console.log(list);

    res.status(200).json(list);
  }catch(e){
    console.log(e)
    res.status(400).json({"err":"Lỗi"});
  }
});

// Đếm số lượng sản phẩm trong mỗi loại (countDocuments)
// http://localhost:3000/product/countProductInCategory
router.get('/countProductInCategory', async function(req, res, next) {
  try{
    var list = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Lấy thông tin sản phẩm có số lượng ít hơn 10
// http://localhost:3000/product/quantityLessThan10
router.get('/quantityLessThan10', async function(req, res, next) {
  try{
    var list = await productModel.find({ quantity: { $lt: 10 } });
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Cập nhật giá của sản phẩm theo ID, với giá người dùng truyền vào
// http://localhost:3000/product/updatePriceById  POST
router.post('/updatePriceById', async function(req, res, next) {
  try{
    var id = req.body.id;
    var price = req.body.price;
    var list = await productModel.updateOne({ _id: id }, { price: price });
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});
//Xóa sản phẩm theo ID
// http://localhost:3000/product/deleteById  
router.delete('/deleteById', async function(req, res, next) {
  try{
    var id = req.body.id;
    var list = await productModel.deleteOne({ _id: id });
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Lấy các sản phẩm có giá trong khoảng từ 500 đến 1500
// http://localhost:3000/product/priceFrom500To1500
router.get('/priceFrom500To1500', async function(req, res, next) {
  try{
    var list = await productModel.find({ price: { $gte: 500, $lte: 1500 } });
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Lấy tên và số lượng của các sản phẩm có số lượng lớn hơn 20
// http://localhost:3000/product/nameAndQuantityOver20
router.get('/nameAndQuantityOver20', async function(req, res, next) {
  try{
    var list = await productModel.find({ quantity: { $gt: 20 } }, { name: 1, quantity: 1 });
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Lấy các sản phẩm có tên chứa từ khóa 'phone'
// http://localhost:3000/product/nameContainPhone
router.get('/nameContainPhone', async function(req, res, next) {
  try{
    var list = await productModel.find({ name: { $regex: 'phone', $options: 'i' } });
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Lấy thông tin sản phẩm đắt nhất
// http://localhost:3000/product/mostExpensive
router.get('/mostExpensive', async function(req, res, next) {
  try{
    var list = await productModel.find().sort({ price: -1 }).limit(1);
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Lấy thông tin sản phẩm rẻ nhất\
// http://localhost:3000/product/cheapest
router.get('/cheapest', async function(req, res, next) {
  try{
    var list = await productModel.find().sort({ price: 1 }).limit(1);
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// Lấy giá trung bình của các sản phẩm
// http://localhost:3000/product/averagePrice
router.get('/averagePrice', async function(req, res, next) {
  try{
    var list = await productModel.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: "$price" }
        }
      }
    ]);
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});


// (*)Tính tổng giá trị của tất cả các sản phẩm (số lượng * giá)
// http://localhost:3000/product/totalValue
router.get('/totalValue', async function(req, res, next) {
  try{
    var list = await productModel.aggregate([
      {
        $project: {
          totalValue: { $multiply: ["$quantity", "$price"] }
        }
      },
      {
        $group: {
          _id: null,
          totalValue: { $sum: "$totalValue" }
        }
      }
    ]);
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

// http://localhost:3000/product/upload
// Upload image
router.post('/upload', [upload.single('image')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });

// http://localhost:3000/product/uploads
    router.post('/uploads', [upload.array('image', 9)],
    async (req, res, next) => {
        try {
            const { files } = req;
            if (!files) {
               return res.json({ status: 0, link : [] }); 
            } else {
              const url = [];
              for (const singleFile of files) {
                url.push(`http://localhost:3000/images/${singleFile.filename}`);
              }
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : [] });
        }
    });

    // // http://localhost:3000/product/send-mail
    // router.post("/send-mail", async function(req, res, next){
    //   try{
    //     const {to, subject, content} = req.body;
    
    //     const mailOptions = {
    //       from: "thuannguyen <admin@dinhnt.com>",
    //       to: to,
    //       subject: subject,
    //       html: content
    //     };
    //     await sendMail.transporter.sendMail(mailOptions);
    //     res.json({ status: 1, message: "Gửi mail thành công"});
    //   }catch(err){
    //     res.json({ status: 0, message: "Gửi mail thất bại"});
    //   }
    // });
    
// how to send template html email 
// http://localhost:3000/product/send-mail-template
router.post("/send-mail-template", async function(req, res, next) {
  try {
    const { to, subject } = req.body;

    const mailOptions = {
      from: "thuannguyen <admin@dinhnt.com>",
      to: to,
      subject: subject,
      template: "template",
      context: {
        name: "Thuan Nguyen",
        age: 20
      }
    };

    await transporter.sendMail(mailOptions);
    res.json({ status: 1, message: "Gửi mail thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Gửi mail thất bại" });
  }
});

module.exports = router;




module.exports = router;