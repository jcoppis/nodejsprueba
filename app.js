var express = require('express');
var app = express();
//usar siempre './' para carpeta actual
var User = require('./models/user').User;
var cookieSession = require('cookie-session');
var router_app = require('./routes_app');
var session_middleware = require('./middlewares/session');
var formidable = require('express-formidable');

var methodOverride= require('method-override');


app.use('/public', express.static('public'));
// "/pepito" no existe, es una carpeta virtual para si bien hacer publicos los archivos de public no poder acceder por la ruta real, sino por medio de "/pepito"
//app.use("/pepito", express.static('public'));

app.use(formidable({ keepExtension: true }));

app.use(methodOverride('_method'));

app.use(cookieSession({
  name: 'session',
  keys: ['llave-1', 'llave-2']
}));

app.set('view engine', 'jade');

app.get('/', function(req, res){
  console.log(req.session.user_id);
  res.render('index');
});

app.get('/signup', function(req, res) {
  User.find(function(err, doc){
    console.log(doc);
    res.render('signup');
  });
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/sessions', function(req, res) {
  User.findOne({
    email: req.fields.email,
    password: req.fields.password
  }, function(err, user) {
    req.session.user_id = user._id; //_id es el id que creo mongo
    res.redirect('/app');
  });
});

app.post('/users', function(req, res) {
  var user = new User({
    username: req.fields.username,
    email: req.fields.email,
    password: req.fields.password,
    password_confirmation: req.fields.password_confirmation,
  });

  user.save().then(function(us) {
    res.send('Guardamos el usuario exitosamente');
  }, function(err) {
    if(err) {
      console.log(String(err));
      res.send('No pudimos guardar la información');
    }
  });
});

app.use('/app', session_middleware);
app.use('/app', router_app);

app.listen(27374);
