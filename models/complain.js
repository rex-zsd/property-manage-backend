var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ComplainSchema = new schema({
  userId: String,
  content: String,
  imgList: Array,
  createDate: Date
});

module.exports = mongoose.model('Complain', ComplainSchema);
