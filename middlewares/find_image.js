var Imagen = require('../models/imagenes');

module.exports = function(req, res, next) {
  Imagen.findById(req.params.id, function(err, imagen) {
    if(imagen == null) {
      res.redirect('/app');
    } else {
      console.log('Encontre la imagen '+imagen.title);
      res.locals.imagen = imagen;
      next();
    }
  });
}
