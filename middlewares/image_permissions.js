var Imagen = require('../models/imagenes');

module.exports = function(req, res, imagen) {
  //True = tiene permisos
  //False = NO iene permisos

  if(req.method === 'GET' && req.path.indexOf('edit') < 0) {
    //Ver la imagen
    return true;
  }

  if(typeof(imagen.creator) != 'undefined' && imagen.creator._id.toString() == res.locals.user._id) {
    //soy el dueño de esta imagen
    return true;
  }

  return false;
}
