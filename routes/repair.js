var express = require('express');
var router = express.Router();
var RepairModel = require('../models/repair.js');

var multer = require('multer');
var upload = multer({
  dest: 'img/repair/',
  // limits: {
  //   fieldSize: 1024 * 1024 * 10
  // }
});

router.post('/save', upload.array('file'), function(req, res, next){
  if(!req.cookies.TOKEN){
    res.send({
      status: 99,
      info: '请先登录'
    });
  } else {
    var body = req.body;
    var RepairEntity = new RepairModel({
      userId: req.cookies.TOKEN,
      type: body.type,
      content: body.content,
      date: body.date,
      imgList: req.files,
      createDate: new Date()
    });
    RepairEntity.save(function(err, repair){
      console.log(repair);
      if(err) {
        res.send({
          status: 200,
          info: '系统错误'
        });
      } else {
        res.send({
          data: {
            id: repair._id
          },
          status: 100,
          info: '保修成功'
        });
      }
    });
  }
});
/**
 * 列表
 * @param  {[type]} 'list'    [description]
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
router.get('/list', function(req, res, next){
  if(!req.cookies.TOKEN){
    res.send({
      status: 99,
      info: '请先登录'
    });
  } else {
    RepairModel.find({
      userId: req.cookies.TOKEN
    }, null, {
      sort: {'_id': -1}
    },
    function(err, repairList){
      if(err) {
        res.send({
          status: 200,
          info: '系统错误'
        });
      } else {
        res.send({
          status: 100,
          info: '获取成功',
          data: repairList
        })
      }
    });
  }
});
/**
 * 详情
 * @param  {[type]} '/show'       [description]
 * @param  {[type]} function(req, res,          next [description]
 * @return {[type]}               [description]
 */
router.get('/detail', function(req, res, next){
  if(!req.cookies.TOKEN){
    res.send({
      status: 99,
      info: '请先登录'
    });
  } else {
    RepairModel.findOne({
      userId: req.cookies.TOKEN,
      _id: req.query.id
    }, function(err, repair){
      console.log(repair);
      res.send({
        status: 200,
        info: '获取成功',
        data: repair
      })
    });
  }
});

module.exports = router;
