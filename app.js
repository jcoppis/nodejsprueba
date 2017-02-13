var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//usar siempre './' para carpeta actual
var User = require('./models/user').User;
var session = require('express-session');
var router_app = require('./routes_app');
var session_middleware = require('./middlewares/session');


app.use('/public', express.static('public'));
// "/pepito" no existe, es una carpeta virtual para si bien hacer publicos los archivos de public no poder acceder por la ruta real, sino por medio de "/pepito"
//app.use("/pepito", express.static('public'));

app.use(bodyParser.json()); //para application/json
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: '123456asdfsdf',
  resave: false,
  saveUninitialized: false
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
    email: req.body.email,
    password: req.body.password
  }, function(err, user) {
    req.session.user_id = user._id; //_id es el id que creo mongo
    res.redirect('/app');
  });
});

app.post('/users', function(req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
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
