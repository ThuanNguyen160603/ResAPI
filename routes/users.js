var express = require('express');
var router = express.Router();
var userModel = require('../models/User');

var jwt = require('jsonwebtoken');
var config = require('../config');
const { verify } = require('../config/sendTemplateMail');
const { token } = require('morgan');
const checkToken = require('./checkToken');
/* GET users listing. */

/*
1 Đăng nhập                          x
2 Đăng ký                            x
3 Lấy danh sách người dùng           x
4 Thêm người dùng                    x
5 Xóa người dùng                     x     
6 Sửa
7 Đổi mk
*/ 

// http://localhost:3000/users/register
router.post('/register', checkToken ,async function(req, res, next) {
  try{
    const {username, fullname, email, phone, password, adress} = req.body;
    const checkUser = await userModel.findOne({username});
    if(checkUser){
      res.status(200).json({status: false, message: "Username đã tồn tại"});
    }else{
      const newItem  = {username, fullname, email, phone, password, adress};
      await userModel.create(newItem);
      res.status(200).json({status: true, message: "Đăng ký thành công"});
    }
  }catch(e){
    res.status(500).json({status: false, message: e.message});
  }
});

//http://localhost:3000/users/login
router.post('/login', async function(req, res, next) {
  try{
    const {username, password} = req.body;
    const checkUser = await userModel.findOne({username, password});
    if(checkUser){
      const token = jwt.sign({user: username, data: "Ahihi"}, config.SECRETKEY, {expiresIn: '1000s'});
      const refreshToken = jwt.sign({ username, password}, config.SECRETKEY, {expiresIn: '1d'});
      res.status(200).json({status: true, message : "Login thành công", token: token, refreshToken: refreshToken});
    }else{
      res.status(200).json({status: false, message : "Login thất bại"});
    }
  }catch(e){
    res.status(500).json({status: false, message: e.message});
  }
                              
});

// http://localhost:3000/users/refreshToken
router.post('/refreshToken', async function(req, res, next){
  const {refreshToken} = req.body;
  jwt.verify(refreshToken, config.SECRETKEY, function(err){
    if(err){
      res.json(401).json({status: false, err : err});
    }else{
      var newToken = jwt.sign({"Token categories": "RefreshToken"}, config.SECRETKEY, {expiresIn: '30s'});
      res.status(203).json({status: true, token: newToken});
    }
  });

});

/**
 * @swagger
 * /users/listUser:
 *   get:
 *     summary: Lấy danh sách người dùng 
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Lỗi
 */
router.get('/listUser', checkToken, async function(req, res, next){
  try{
    const list = await userModel.find();
    res.status(200).json(list);
  }catch(e){
    res.status(500).json({status: false, message: e.message});
  }
});

// xóa người dùng
//http://localhost:3000/users/deleteUser
router.delete('/deleteUser', checkToken, async function(req, res, next){
  try{
    var id = req.body.id;
    var list = await userModel.deleteOne({ _id: id });
    res.status(200).json(list);
  }catch(e){
    res.status(500).json({status: false, message: e.message});
  }
});

// sửa người dùng
//http://localhost:3000/users/updateUser
router.post('/updateUser', checkToken, async function(req, res, next){
  try{
    var {id, username, fullname, email, phone, password, adress} = req.body;
    var list = await userModel.updateOne({_id: id}, {username, fullname, email, phone, password, adress});
    res.status(200).json(list);
  }catch(e){
    res.status(500).json({status: false, message: e.message});
  }
});

// tìm user bằng username
/**
 * @swagger
 * /users/findStByUsername/{username}:
 *   get:
 *     summary: Lấy danh sách người dùng theo username
 *     parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Lỗi
 */
router.get('/findStByUsername/:username', async function(req, res, next){
  try{
    var {username} = req.params;
    var list = await userModel.find({username: username});
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({"err":"Lỗi"});
  }
});

module.exports = router;
