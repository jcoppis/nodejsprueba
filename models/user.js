var mongoose = require('mongoose');

var userSchemaJSON = {
  name: String,
  username: String,
  password: String,
  age: Number,
  email: String,
  date_of_birth: Date
};

// String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
