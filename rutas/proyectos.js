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

module.exports = router;
