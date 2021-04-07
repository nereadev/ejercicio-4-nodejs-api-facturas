const express = require("express");
const cors = require("cors");
const { facturas } = require("../facturas.json");

const router = express.Router();

router.get("/facturas", (req, res, next) => {
  res.json(facturas);
});
router.get("/facturas/factura/:idFactura", (req, res, next) => {
  const facturaNumero = +req.params.idFactura;
  const facturaBuscada = facturas.filter(factura => factura.id === facturaNumero);
  res.json(facturaBuscada);
});

module.exports = router;
