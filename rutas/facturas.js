const express = require("express");
const { checkSchema, check, validationResult } = require("express-validator");
const cors = require("cors");
const { facturas } = require("../facturas.json");
const {
  facturasObjeto, filtrarFactura, crearFactura, modificarFactura, borrarFactura
} = require("../controladores/facturas");
const { errorPeticion } = require("../utils/errores");

const validacionFactura = () => {
  const numero = {
    errorMessage: "Falta el numero de la factura.",
    notEmpty: true
  };
  const fecha = {
    errorMessage: "Falta la fecha de la factura.",
    notEmpty: true
  };
  const abonada = {
    errorMessage: "Falta el estado de la factura",
    notEmpty: true
  };
  const base = {
    isFloat: {
      errorMessage: "La base debe ser un decimal.",
      notEmpty: true
    }
  };
  const tipoIva = {
    isInt: {
      errorMessage: "El tipo de Iva debe ser un número entero.",
      notEmpty: true
    }
  };
  const tipo = {
    matches: {
      errorMessage: "El tipo solo puede ser ingreso o gasto",
      options: ["ingreso", "gasto"]
    }
  };
  const vencimiento = {
    errorMessage: "Falta la fecha de vencimiento."
  };
  numero.exists = true;
  fecha.exists = true;
  abonada.exists = true;
  base.exists = {
    errorMessage: "Falta la base."
  };
  tipoIva.exists = {
    errorMessage: "Falta el tipo de Iva."
  };
  /* tipo.exists = {
    errorMessage: "Falta el tipo de factura."
  }; */
  vencimiento.optional = true;
  return {
    numero,
    fecha,
    abonada,
    base,
    tipoIva,
    /*     tipo,
 */ vencimiento
  };
};
const validaLaFactura = validacionFactura();

const router = express.Router();

router.get("/", (req, res, next) => {
  const getFacturas = facturasObjeto(facturas);
  res.json(getFacturas);
});
router.get("/ingresos", (req, res, next) => {
  const facturasIngresos = filtrarFactura("ingreso");
  res.json(facturasIngresos);
});
router.get("/gastos", (req, res, next) => {
  const facturasGastos = filtrarFactura("gasto");
  res.json(facturasGastos);
});
router.get("/factura/:idFactura", (req, res, next) => {
  const facturaNumero = +req.params.idFactura;
  const facturaBuscada = facturas.filter(factura => factura.id === facturaNumero);
  res.json(facturaBuscada);
});
router.post("/factura",
  checkSchema(validaLaFactura),
  (req, res, next) => {
    const error400 = errorPeticion(req);
    if (error400) {
      return error400;
    }
    const nuevaFactura = req.body;
    const facturaIntroducida = crearFactura(nuevaFactura);
    res.json(facturaIntroducida);
  });
router.put("/factura/:idFactura",
  checkSchema(validaLaFactura),
  (req, res, next) => {
    const error400 = errorPeticion(req);
    if (error400) {
      return error400;
    }
    const facturaNumero = +req.params.idFactura;
    const facturaModificada = req.body;
    const facturaFinal = modificarFactura(facturaNumero, facturaModificada, "completo");
    res.json(facturaFinal);
  });
router.patch("/factura/:idFactura",
  checkSchema(validaLaFactura),
  (req, res, next) => {
    const error400 = errorPeticion(req);
    if (error400) {
      return error400;
    }
    const facturaNumero = +req.params.idFactura;
    const facturaModificada = req.body;
    const facturaFinal = modificarFactura(facturaNumero, facturaModificada, "parcial");
    res.json(facturaFinal);
  });
router.delete("/factura/:idFactura", (req, res, next) => {
  const facturaNumero = +req.params.idFactura;
  const facturasFinales = borrarFactura(facturaNumero);
  res.json(facturasFinales);
});

module.exports = router;
