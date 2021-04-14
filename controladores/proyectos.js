const Proyecto = require("../bd/modelos/proyecto");
const { proyectos } = require("../proyectos.json");
const { generaError } = require("../utils/errores");

const proyectoObjeto = async () => {
  const getProyectos = await Proyecto
    .find({});
  return getProyectos;
};

module.exports = {
  proyectoObjeto
};
