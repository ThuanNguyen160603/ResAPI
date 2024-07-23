var express = require('express');
var router = express.Router();

var cateModel = require('../models/Category');

// http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// http://localhost:3000/categoryRouter/add
router.post('/add', async function(req, res, next) {
  const { name } = req.body;
  const newItem  = {name};
  await cateModel.create(newItem);
  res.status(200).json(newItem);
});

// http://localhost:3000/categoryRouter/list
router.get('/list', async function(req, res, next) {
  var list = await cateModel.find();
  res.status(200).json(list);
});

module.exports = router;
