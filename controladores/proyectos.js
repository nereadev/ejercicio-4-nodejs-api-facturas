const Proyecto = require("../bd/modelos/proyecto");
const { proyectos } = require("../proyectos.json");
const { generaError } = require("../utils/errores");

const filtrarProyectos = async (estado) => {
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

const filtrarPorId = async id => {
  const idProyecto = id.toString();
  const datoFiltrado = await Proyecto
    .find({ _id: idProyecto });
  return datoFiltrado;
};

module.exports = {
  filtrarProyectos,
  filtrarPorId
};
