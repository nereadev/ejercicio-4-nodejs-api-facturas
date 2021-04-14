const express = require("express");
const { checkSchema, check, validationResult } = require("express-validator");
const cors = require("cors");
const { proyectos } = require("../proyectos.json");
const { filtrarProyectos, filtrarPorId } = require("../controladores/proyectos");
const { errorPeticion } = require("../utils/errores");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const getProyectos = await filtrarProyectos();
  res.json(getProyectos);
});
router.get("/pendientes", async (req, res, next) => {
  const proyectosPendientes = await filtrarProyectos("pendiente");
  res.json(proyectosPendientes);
});
router.get("/en-progreso", async (req, res, next) => {
  const proyectosWip = await filtrarProyectos("wip");
  res.json(proyectosWip);
});
router.get("/finalizados", async (req, res, next) => {
  const proyectosFinalizado = await filtrarProyectos("finalizado");
  res.json(proyectosFinalizado);
});
router.get("/proyecto/:idProyecto", async (req, res, next) => {
  const idProyecto = req.params.idProyecto;
  const proyectoPorId = await filtrarPorId(idProyecto);
  res.json(proyectoPorId);
});

module.exports = router;
