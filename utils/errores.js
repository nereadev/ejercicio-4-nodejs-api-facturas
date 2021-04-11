const debug = require("debug")("facturas:errores");
const chalk = require("chalk");
const { validationResult } = require("express-validator");

const generaError = (mensaje, status) => {
  const error = new Error(mensaje);
  error.codigo = status;
  return error;
};

const errorPeticion = req => {
  const errores = validationResult(req);
  let error;
  if (!errores.isEmpty()) {
    const mapaErrores = errores.mapped();
    if (mapaErrores.numero || mapaErrores.fecha
      || mapaErrores.abonada || mapaErrores.base
      || mapaErrores.tipoIva || mapaErrores.tipo) {
      error = generaError("La factura no tiene la forma correcta", 400);
      console.log(errores.mapped());
    }
  }
  return error;
};
module.exports = { generaError, errorPeticion };
