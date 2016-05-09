var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ComplainSchema = new schema({
  userId: String,
  userName: String,
  content: String,
  imgList: Array,
  createDate: Date,
  status: Number
});

module.exports = mongoose.model('Complain', ComplainSchema);
