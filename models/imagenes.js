var mongoose = require('mongoose');

var img_schema = new mongoose.Schema({
  title: { type: String, require: true }
});

var Imagen = mongoose.model('Imagen', img_schema);

module.exports = Imagen;
