var express = require('express');
var router = express.Router();
const checkToken = require('../routes/checkToken');
var cateModel = require('../models/Category');

/*                           
1 xem                 x
2 Thêm người dùng     x              
3 Xóa người dùng       x              
4 Sửa                   x
*/ 

// // http://localhost:3000/
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// sửa
// http://localhost:3000/categoryRouter/update
router.put('/update', checkToken, async function(req, res, next) {
  try{
    const { id, name , decripsion} = req.body;
    await cateModel.updateOne({_id : id}, {name , decripsion});
    res.status(200).json({status: true, message: 'Sửa thành công'});
  }catch(e){
    res.status(400).json({status: false, message: e.message});
  }
});

// xóa
// http://localhost:3000/categoryRouter/delete
router.delete('/delete', checkToken, async function(req, res, next) {
  try{
    const { id } = req.body;
    await cateModel.deleteOne({_id : id});
    res.status(200).json({status: true, message: 'Xóa thành công'});
  }catch(e){
    res.status(400).json({status: false, message: e.message});
  }
 
});

//xem
// http://localhost:3000/categoryRouter/list
router.get('/list', checkToken, async function(req, res, next) {
  try{
    var list = await cateModel.find();
    res.status(200).json(list);
  }catch(e){
    res.status(400).json({status: false, message: e.message});
  } 
});

//thêm
// http://localhost:3000/categoryRouter/add
router.post('/add', checkToken ,async function(req, res, next) {
  try{
    const { name , decripsion} = req.body;
    const newItem  = {name , decripsion};
    await cateModel.create(newItem);
    res.status(200).json(newItem);
  }catch(e){
    res.status(400).json({status: false, message: e.message});
  }
 
});

/**
 * @swagger
 * /categoryRouter/add/{name}:
 *   post:
 *     summary: Thêm loại sản phẩm
 *     parameters:
 *      - in: path
 *        name: name
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
router.post('/add/:name', async function(req, res, next) {
  try{
    const { name } = req.params;
    const newItem  = {name};
    await cateModel.create(newItem);
    res.status(200).json(newItem);
  }catch(e){
    res.status(400).json({status: false, message: e.message});
  }
 
});

/**
 * @swagger
 * /categoryRouter/list:
 *   get:
 *     summary: Lấy danh sách loại sản phẩm 
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/list', async function(req, res, next) {
    var list = await cateModel.find();
    res.status(200).json(list);
});

module.exports = router;
