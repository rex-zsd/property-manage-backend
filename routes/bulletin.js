var express = require('express');
var router = express.Router();
var BulletinModel = require('../models/bulletin.js');

router.get('/', function(req, res, next) {
  var query = req.query;
  BulletinModel
  .find({})
  .skip(parseInt(query.start))
  .sort({'createDate': -1})
  .limit(parseInt(query.size))
  .exec(function(err, bulletions) {
    if(err) {
      res.send({
        info: '系统错误',
        status: 200
      });
    } else {
      res.send({
        info: '获取成功',
        status: 100,
        data: bulletions
      });
    }
  });
});

router.post('/add', function(req, res, next) {
  var body = req.body;
  var BulletinEntity = new BulletinModel({
    createDate: new Date(),
    title: body.title,
    content: body.content
  });
  BulletinEntity.save(function(err, bulletin) {
    if(err) {
      res.send({
        status: 200,
        info: '系统错误'
      });
    } else {
      res.send({
        status: 100,
        info: '保存成功',
        bulletin: bulletin
      });
    }
  });
});

module.exports = router;
