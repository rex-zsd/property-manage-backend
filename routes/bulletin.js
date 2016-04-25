var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var query = req.query;
  var list = [];
  for (var i = 0; i < query.size; i++) {
    list.push({
      title: '标题' + parseInt(i + parseInt(query.start)),
      content: '内容' + parseInt(i + parseInt(query.start)),
      time: new Date().getTime()
    });
  }
  res.send({
    info: '获取成功',
    status: 100,
    data: list
  });
});

module.exports = router;
