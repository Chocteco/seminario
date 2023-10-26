const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = Schema({
    nombre: String,
    RFC: String,
    edad: Number,
    fecha: String,
    telefono: String,
    correo: String,
  },{
    versionKey: false
  });

/* Especifica el nombre de la colección en MongoDB */
const Cliente = mongoose.model('cliente', clienteSchema, 'cliente');

module.exports = Cliente;