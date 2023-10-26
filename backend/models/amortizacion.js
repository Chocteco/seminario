const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  // Esquema para la tabla "amortizaciones"
  const amortizacionesSchema = Schema({
    cliente: String,
    monto: Number,
    meses: Number,
    interes: Number,
  },{
    versionKey: false
  });

/* Creamos el modelo */
const Amortizacion = mongoose.model('amortizacion', amortizacionesSchema,'amortizaciones');

module.exports = Amortizacion