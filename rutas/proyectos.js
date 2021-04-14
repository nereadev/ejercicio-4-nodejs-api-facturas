const express = require("express");
const { checkSchema, check, validationResult } = require("express-validator");
const cors = require("cors");
const { proyectos } = require("../proyectos.json");
const { proyectoObjeto } = require("../controladores/proyectos");
const { errorPeticion } = require("../utils/errores");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const getProyectos = await proyectoObjeto();
  res.json(getProyectos);
});
router.get("/pendientes", async (req, res, next) => {
  const proyectosPendientes = await proyectoObjeto("pendiente");
  res.json(proyectosPendientes);
});
router.get("/en-progreso", async (req, res, next) => {
  const proyectosWip = await proyectoObjeto("wip");
  res.json(proyectosWip);
});
router.get("/finalizados", async (req, res, next) => {
  const proyectosFinalizado = await proyectoObjeto("finalizado");
  res.json(proyectosFinalizado);
});

module.exports = router;
