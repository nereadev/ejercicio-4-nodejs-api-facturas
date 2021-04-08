const express = require("express");
const cors = require("cors");
const { facturas } = require("../facturas.json");
const { facturasObjeto, filtrarFactura } = require("../controladores/facturas");

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

module.exports = router;
