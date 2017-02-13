var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fotos');

var posibles_valores = ['H', 'F'];
var email_match = [ /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i, "Coloca un email valido"];

var password_validation = {
  validator: function(p) {
    return this.password_confirmation == p; // compara password_confirmation con p(que es el password ingresado)
  },
  message: "Las contraseñas no son igual"
}

//analogia
//coleccion => define las tablas
//documento => filas de la tabla
var user_schema = new mongoose.Schema({
  name: String,
  lastname: String,
  username: {
    type: String,
    required: true,
    maxlength: [50, "Usernama puede tener hasta 50 caracteres"]
  },
  password: {
    type:String,
    minlength: [8, "El password tiene que tener mas de 8 caracteres"],
    validate: password_validation
  },
  age: {
    type: Number,
    min: [5, "La edad no puede ser menor que 5"],
    max: [100, "La edad no puede ser mayor que 100"]
  },
  email: {
    type: String,
    required: "El correo es obligatorio",
    match: email_match
  },
  date_of_birth: Date,
  sex: {
    type: String,
    enum: {values: posibles_valores, message: "Opcion no valida"}
  }
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
