var express = require('express');
var router = express.Router();
var ComplainModel = require('../models/complain.js');

var multer = require('multer');
var upload = multer({
  dest: 'img/complain/',
  // limits: {
  //   fieldSize: 1024 * 1024 * 10
  // }
});

/**
 * 保存投诉
 * @param  {[type]} '/save'             [description]
 * @param  {[type]} upload.array('file' [description]
 * @return {[type]}                     [description]
 */
router.post('/save', upload.array('file'), function(req, res, next) {
  if(!req.cookies.TOKEN){
    res.send({
      status: 99,
      info: '请先登录'
    });
  } else {
    var body = req.body;
    var ComplainEntity = new ComplainModel({
      userId: req.cookies.TOKEN,
      userName: req.cookies.USERNAME,
      content: body.content,
      createDate: new Date(),
      imgList: req.files,
      status: 0
    });
    ComplainEntity.save(function(err, complain) {
      if(err) {
        res.send({
          info: '系统错误',
          status: 200
        });
      } else {
        res.send({
          info: '投诉成功',
          status: 100,
          data: {
            id: complain._id
          }
        });
      }
    });
  }
});

/**
 * 投诉列表
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
    ComplainModel.find({
      userId: req.cookies.TOKEN
    }, null, {
      sort: {'_id': -1}
    },
    function(err, complainList){
      if(err) {
        res.send({
          status: 200,
          info: '系统错误'
        });
      } else {
        res.send({
          status: 100,
          info: '获取成功',
          data: complainList
        })
      }
    });
  }
});

/**
 * 投诉详情
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
    ComplainModel.findOne({
      userId: req.cookies.TOKEN,
      _id: req.query.id
    }, function(err, complain){
      console.log(complain);
      res.send({
        status: 200,
        info: '获取成功',
        data: complain
      });
    });
  }
});

module.exports = router;
