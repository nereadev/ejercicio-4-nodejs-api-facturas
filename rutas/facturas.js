const express = require("express");
const cors = require("cors");
const { facturas } = require("../facturas.json");

const router = express.Router();

router.get("/", (req, res, next) => {
  const facturasObjeto = {
    total: facturas.length,
    datos: facturas
  };
  res.json(facturasObjeto);
});
router.get("/ingresos", (req, res, next) => {
  const facturaIngreso = facturas.filter(factura => factura.tipo === "ingreso");
  const facturasIngresoObjeto = {
    total: facturaIngreso.length,
    datos: facturaIngreso
  };
  res.json(facturasIngresoObjeto);
});
router.get("/gastos", (req, res, next) => {
  const facturaIngreso = facturas.filter(factura => factura.tipo === "gasto");
  const facturasIngresoObjeto = {
    total: facturaIngreso.length,
    datos: facturaIngreso
  };
  res.json(facturasIngresoObjeto);
});
router.get("/factura/:idFactura", (req, res, next) => {
  const facturaNumero = +req.params.idFactura;
  const facturaBuscada = facturas.filter(factura => factura.id === facturaNumero);
  res.json(facturaBuscada);
});

module.exports = router;
