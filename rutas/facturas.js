const express = require("express");
const cors = require("cors");
const { facturas } = require("../facturas.json");
const {
  facturasObjeto, filtrarFactura, crearFactura, modificarFactura, borrarFactura
} = require("../controladores/facturas");

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
router.post("/factura", (req, res, next) => {
  const nuevaFactura = req.body;
  const facturaIntroducida = crearFactura(nuevaFactura);
  res.json(facturaIntroducida);
});
router.put("/factura/:idFactura", (req, res, next) => {
  const facturaNumero = +req.params.idFactura;
  const facturaModificada = req.body;
  const facturaFinal = modificarFactura(facturaNumero, facturaModificada, "completo");
  res.json(facturaFinal);
});
router.patch("/factura/:idFactura", (req, res, next) => {
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
