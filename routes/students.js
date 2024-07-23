var express = require('express');
var router = express.Router();

/* GET home page. */


// - Tạo ra 1 danh sách sinh viên gồm các thông tin sau: mssv, họ tên, lớp, dtb             x
// - Thêm mới một sinh viên vào danh sách                                                   x
// - Thay đổi thông tin sinh viên theo mssv,                                               x                                            
// - Xóa một sv ra khỏi danh sách                                                       x
// - Lấy thông tin chi tiết của một sv theo mssv                                       x                                    
// - Lấy danh sách các sinh viên có điểm trung bình từ 6.5 đến 8.0             x                        
// - Lấy ra danh sách các sinh viên thuộc lớp MD18401 và có điểm trung bình lớn hơn 9   x               
// - Sắp xếp danh sách sinh viên theo điểm trung bình
// - Tìm ra sinh viên có điểm trung bình cao nhập thuộc lớp MD18401

var list = [
            {'mssv': 1, 'name': 'A', 'lop': "MD18401", 'dtb': 7.5},
            {'mssv': 2, 'name': 'b', 'lop': "MD18401", 'dtb': 9.1},
            {'mssv': 3, 'name': 'c', 'lop': "11A3", 'dtb': 7},
            {'mssv': 4, 'name': 'd', 'lop': "MD18401", 'dtb': 9},

        ];


//Hiện list
// http://localhost:3000/students/list
router.get('/list', function(req, res, next) {
    res.status(200).json(list);

  });

  // thêm
// http://localhost:3000/students/add
router.post('/add', function(req, res, next) {
    const {mssv, name, lop, dtb} = req.body;

    var item = {
        mssv: mssv,
        name: name,
        lop: lop,
        dtb: dtb
    }
    list.push(item);
    res.json(list);
  });

//edit
// http://localhost:3000/students/edit
router.post('/edit', function(req, res, next) {
    const {mssv, name, lop, dtb} = req.body;
    var item = list.find(p => p.mssv == mssv);
    item.name = name;
    item.lop = lop;
    item.dtb = dtb;

    res.json(list);
  });

  //xóa
// http://localhost:3000/students/delete
router.delete('/delete', function(req, res, next) {
    const {mssv} = req.body;        
    var index = list.findIndex(p => p.mssv == mssv);
    list.splice(index, 1);

    res.json(list);
  });

  //detail
// http://localhost:3000/students/detail
router.get('/detail', function(req, res, next) {
    const {mssv} = req.body;
    var item = list.find(p => p.mssv == mssv);
    res.json(item);
  });

  // Lấy danh sách các sinh viên có điểm trung bình từ 6.5 đến 8.0

// http://localhost:3000/students/dtb?from=6.5&to=8.0
 router.get('/dtb', function(req, res, next) {
    const {from, to} = req.query;
    var item = list.filter(p => p.dtb >= from && p.dtb <= to);
    res.json(item);
  });

  // Lấy ra danh sách các sinh viên thuộc lớp MD18401 và có điểm trung bình lớn hơn 9
// http://localhost:3000/students/filter?thuocdo>=9.0
router.get('/filter', function(req, res, next) {
    const {thuocdo} = req.params;

    var item = list.filter(p => p.dtb >= 9 && p.lop == "MD18401");

    res.json(item);
  });

// - Sắp xếp danh sách sinh viên theo điểm trung bình
// http://localhost:3000/students/sort
router.get('/sort', function(req, res, next) {
    list.sort((a, b) => b.dtb - a.dtb);
    res.json(list);
});

// - Tìm ra sinh viên có điểm trung bình cao nhập thuộc lớp MD18401

// http://localhost:3000/students/find
router.get('/find', function(req, res, next) {
    var md18401Students = list.filter(p => p.lop == 'MD18401');
    var topStudent = md18401Students.reduce((prev, current) => (prev.dtb > current.dtb) ? prev : current);
    res.json(topStudent);
});


module.exports = router;
