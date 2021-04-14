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

const crearProyecto = async nuevoProyecto => {
  const respuesta = {
    proyecto: null,
    error: null
  };
  const nuevoProyectoEnBD = await Proyecto.create(nuevoProyecto);
  respuesta.proyecto = nuevoProyectoEnBD;
  return nuevoProyectoEnBD;
};

const sustituirProyecto = async (idProyecto, sustitutoProyecto) => {
  const proyectoEncontrado = await Proyecto.findById(idProyecto);
  const respuesta = {
    proyecto: null,
    error: null
  };
  if (proyectoEncontrado) {
    await proyectoEncontrado.updateOne(sustitutoProyecto);
    respuesta.proyecto = sustitutoProyecto;
  } else {
    const { error, proyecto } = await crearProyecto(sustitutoProyecto);
    if (error) {
      respuesta.error = error;
    } else {
      respuesta.proyecto = proyecto;
    }
  }
  return respuesta;
};

const modificarProyecto = async (idProyecto, cambios) => {
  const respuesta = {
    proyecto: null,
    error: null
  };
  const proyecto = await Proyecto.findByIdAndUpdate(idProyecto, cambios);
  if (proyecto) {
    respuesta.proyecto = proyecto;
    return respuesta;
  }
};

module.exports = {
  filtrarProyectos,
  filtrarPorId,
  crearProyecto,
  sustituirProyecto,
  modificarProyecto
};
