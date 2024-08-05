var express = require('express');
var router = express.Router();
const checkToken = require('../routes/checkToken');
var cateModel = require('../models/Category');

// http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
