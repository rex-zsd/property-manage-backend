var mongoose = require('mongoose');
var schema = mongoose.Schema;

var RepairSchema = new schema({
  userId: String,
  type: Number,
  content: String,
  date: Date,
  imgList: Array,
  createDate: Date
});

module.exports = mongoose.model('Repair', RepairSchema);
