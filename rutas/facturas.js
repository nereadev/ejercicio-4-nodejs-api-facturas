const express = require("express");
const { facturas } = require("../facturas.json");

const router = express.Router();

router.get("/facturas", (req, res, next) => {
  res.json(facturas);
});
router.get("/facturas/:factura", (req, res, next) => {
  const facturaNumero = +req.params.factura;
  const facturaBuscada = facturas.filter(factura => factura.id === facturaNumero);
  res.json(facturaBuscada);
});

module.exports = router;
