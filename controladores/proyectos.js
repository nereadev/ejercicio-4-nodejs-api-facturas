const Proyecto = require("../bd/modelos/proyecto");
const { proyectos } = require("../proyectos.json");
const { generaError } = require("../utils/errores");

const proyectoObjeto = async (estado) => {
  const getProyectos = await Proyecto
    .find({});
  if (estado) {
    const nombreEstado = estado.toString();
    console.log(estado);
    const datoFiltrado = await Proyecto
      .find({ estado: nombreEstado });
    return datoFiltrado;
  } else {
    return getProyectos;
  }
};

module.exports = {
  proyectoObjeto
};
