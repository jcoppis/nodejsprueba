var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fotos');

//analogia
//coleccion => define las tablas
//documento => filas de la tabla
var user_schema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  age: Number,
  email: String,
  date_of_birth: Date
});

// String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
user_schema.virtual('password_confirmation')
  .get(function() {
    return this.pass_conf;
  })
  .set(function(password) {
    this.pass_conf = password;
  });

var User = mongoose.model('User', user_schema);
module.exports.User = User;
