var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fotos');

var userSchemaJSON = {
  email:String,
  password:String
};

var user_schema = new mongoose.Schema(userSchemaJSON);

var User = mongoose.model("User", user_schema);

app.use(express.static('public'));
// "/pepito" no existe, es una carpeta virtual para si bien hacer publicos los archivos de public no poder acceder por la ruta real, sino por medio de "/pepito"
//app.use("/pepito", express.static('public'));

app.use(bodyParser.json()); //para application/json
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/users', function(req, res) {
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save(function() {
    res.send("Guardamos tus datos");
  });
});

app.listen(27374);
