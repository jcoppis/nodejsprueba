var Imagen = require('../models/imagenes');
var owner_check = require('./image_permissions');

module.exports = function(req, res, next) {
  Imagen.findById(req.params.id)
    .populate('creator')
    .exec(function(err, imagen) {
      if(imagen != null && owner_check(req, res, imagen)) {
        console.log('El creador de la imagen es '+imagen.creator);
        res.locals.imagen = imagen;
        next();
      } else {
        res.redirect('/app');
      }
    });
}
