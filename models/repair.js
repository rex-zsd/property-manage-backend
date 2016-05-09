var mongoose = require('mongoose');
var schema = mongoose.Schema;

var RepairSchema = new schema({
  userId: String,
  userName: String,
  type: Number,
  content: String,
  date: Date,
  imgList: Array,
  createDate: Date,
  status: Number
});

module.exports = mongoose.model('Repair', RepairSchema);
