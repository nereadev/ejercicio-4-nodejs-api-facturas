require("dotenv").config();
const debug = require("debug")("facturas:principal");
const express = require("express");
const { program } = require("commander");
const morgan = require("morgan");
const { response } = require("express");
const rutaFacturas = require("./rutas/facturas.js");
const rutasProyectos = require("./rutas/proyectos.js");
require("./bd/bdMongoDB");

program.option("-p, --puerto <puerto>", "Puerto para el servidor");
program.parse(process.argv);
const options = program.opts();
const puerto = options.puerto || process.env.PUERTO || 5000;

const app = express();

const server = app.listen(puerto, () => {
  debug(`Servidor escuchando en el puerto ${puerto}.`);
});

app.use(morgan("dev"));
app.use(express.json());
app.use("/facturas", rutaFacturas);
app.use("/proyectos", rutasProyectos);
app.use((req, res, next) => {
  res.status(404).send({ error: true, mensaje: "Recurso no encontrado" });
});
app.use((err, req, res, next) => {
  debug(err);
  res.status(500).send({ error: true, mensaje: "Error general" });
});
