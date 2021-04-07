require("dotenv").config();
const debug = require("debug")("facturas:principal");
const express = require("express");
const { program } = require("commander");
const morgan = require("morgan");
const { response } = require("express");
const { facturas } = require("./facturas.json");

program.option("-p, --puerto <puerto>", "Puerto para el servidor");
program.parse(process.argv);
const options = program.opts();
const puerto = options.puerto || process.env.PUERTO || 5000;

const app = express();

const server = app.listen(puerto, () => {
  debug(`Servidor escuchando en el puerto ${puerto}.`);
});

app.use(morgan("dev"));
app.get("/facturas", (req, res, next) => {
  res.json(facturas);
});
app.get("/facturas/:factura", (req, res, next) => {
  const facturaNumero = +req.params.factura;
  const facturaBuscada = facturas.filter(factura => factura.id === facturaNumero);
  res.json(facturaBuscada);
});
app.use((req, res, next) => {
  res.status(404).send({ error: true, mensaje: "Recurso no encontrado" });
});
app.use((err, req, res, next) => {
  debug(err);
  res.status(500).send({ error: true, mensaje: "Error general" });
});
