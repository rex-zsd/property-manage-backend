var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');

/**
 * 用户注册
 * @param  {[type]} '/register' [description]
 * @param  {[type]} function(   [description]
 * @return {[type]}             [description]
 */
router.post('/register', function(req, res, next) {
  var body = req.body;
  console.log(body);
  UserModel.find({
    username: _.trim(body.username)
  }, function(err, users) {
    if (err) {
      res.send({
        status: 200,
        info: '系统出错'
      });
    } else if (users.length) {
      res.send({
        status: 200,
        info: '该用户已存在'
      });
    } else {
      var UserEntity = new UserModel({
        username: _.trim(body.username),
        password: _.trim(body.password)
      });
      UserEntity.save(function(err, user) {
        if (err) {
          res.send({
            status: 200,
            info: '系统出错'
          });
        } else {
          var expireDays = 10;
          res.cookie('TOKEN', _.trim(user['_id']), {
            expires: new Date(Date.now() + expireDays * 24 * 3600 * 1000)
          });
          res.cookie('USERNAME', user['username'], {
            expires: new Date(Date.now() + expireDays * 24 * 3600 * 1000)
          });
          res.send({
            status: 100,
            info: '注册成功'
          });
        }
      });
    }
  });
});

/**
 * 用户登录
 * @param  {[type]} '/login'      [description]
 * @param  {[type]} function(req, res,          next [description]
 * @return {[type]}               [description]
 */
router.post('/login', function(req, res, next) {
  var body = req.body;
  UserModel.find({
    username: body.username,
    password: body.password
  }, function(err, user) {
    if (err) {
      res.send({
        status: 200,
        info: '系统出错'
      });
    } else if (!user.length) {
      res.send({
        status: 200,
        info: '账号或密码错误'
      });
    } else {
      user = user[0];
      var expireDays = 10;
      res.cookie('TOKEN', _.trim(user['_id']), {
        expires: new Date(Date.now() + expireDays * 24 * 3600 * 1000)
      });
      res.cookie('USERNAME', user['username'], {
        expires: new Date(Date.now() + expireDays * 24 * 3600 * 1000)
      });
      res.send({
        status: 100,
        info: '登陆成功'
      });
    }
  });
});

router.post('/password', function(req, res, next) {
  var body = req.body;
  console.log(body);
  console.log(req.cookies);
  if (!req.cookies.TOKEN) {
    res.send({
      status: 99,
      info: '请先登录'
    });
  } else {
    console.log(req.cookies.TOKEN);
    UserModel.findByIdAndUpdate(req.cookies.TOKEN, {
      $set: {
        password: body.password
      }
    }, function(err, user) {
      console.log(arguments);
      if (err) {
        res.send({
          status: 200,
          info: '系统出错'
        });
      } else {
        user = user[0];
        var expireDays = 10;
        res.send({
          status: 100,
          info: '修改成功'
        });
      }
    })
  }
});
module.exports = router;
