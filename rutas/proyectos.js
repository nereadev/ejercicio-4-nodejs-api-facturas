const express = require("express");
const { checkSchema, check, validationResult } = require("express-validator");
const cors = require("cors");
const { facturas } = require("../proyectos.json");
const {
  facturasObjeto, filtrarFactura, crearFactura, modificarFactura, borrarFactura
} = require("../controladores/facturas");
const { errorPeticion } = require("../utils/errores");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("ESTÁS CONECTADA");
});

module.exports = router;
