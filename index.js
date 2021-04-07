require("dotenv").config();
const debug = require("debug")("facturas:principal");
const express = require("express");
const { program } = require("commander");

program.option("-p, --puerto <puerto>", "Puerto para el servidor");
program.parse(process.argv);
const options = program.opts();
const puerto = options.puerto || process.env.PUERTO || 5000;

const app = express();

const server = app.listen(puerto, () => {
  debug(`Servidor escuchando en el puerto ${puerto}.`);
});
