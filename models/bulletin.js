var mongoose = require('mongoose');
var schema = mongoose.Schema;

var BulletionSchema = new schema({
  createDate: Date,
  title: String,
  content: String
});

module.exports = mongoose.model('Bulletion', BulletionSchema);
