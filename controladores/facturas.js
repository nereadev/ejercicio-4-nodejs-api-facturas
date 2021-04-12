let { facturas } = require("../facturas.json");
const { generaError } = require("../utils/errores");

const facturasObjeto = (facturas) => (
  {
    total: facturas.length,
    datos: facturas
  }
);

const filtrarFactura = (tipo, parametroTag) => {
  const facturaFiltrada = facturas.filter(factura => factura.tipo === tipo);
  const factura = facturasObjeto(facturaFiltrada);
  if (parametroTag.abonada === "true") {
    const facturaFiltradaCondicion = facturaFiltrada
      .filter(factura => factura.abonada === true);
    return facturaFiltradaCondicion;
  } else if (parametroTag.abonada === "false") {
    const facturaFiltradaCondicion = facturaFiltrada
      .filter(factura => factura.abonada === false);
    return facturaFiltradaCondicion;
  } else {
    return factura;
  }
};

const crearFactura = nuevaFactura => {
  const respuesta = {
    factura: null,
    error: null
  };
  if (facturas.find(factura => factura.id === nuevaFactura.id)) {
    const error = generaError("Ya existe la factura", 409);
    respuesta.error = error;
  }
  if (!respuesta.error) {
    facturas.push(nuevaFactura);
    respuesta.factura = nuevaFactura;
  }
  return respuesta;
};

const modificarFactura = (idFactura, facturaModificada, tipoModificacion) => {
  const facturaBuscada = facturas.find(factura => factura.id === idFactura);
  const respuesta = {
    factura: null,
    error: null
  };
  if (tipoModificacion === "parcial") {
    const cambios = facturaModificada;
    const facturaModificadaParcial = {
      ...facturaBuscada,
      ...cambios
    };
    if (facturaBuscada) {
      facturaModificadaParcial.id = facturaBuscada.id;
      facturas[facturas.indexOf(facturaBuscada)] = facturaModificadaParcial;
      respuesta.factura = facturaModificadaParcial;
    }
  }
  if (facturaBuscada) {
    facturaModificada.id = facturaBuscada.id;
    facturas[facturas.indexOf(facturaBuscada)] = facturaModificada;
    respuesta.factura = facturaModificada;
  }
  return respuesta;
};

const borrarFactura = idFactura => {
  const respuesta = {
    factura: null,
    error: null
  };
  const factura = facturas.find(factura => factura.id === idFactura);
  facturas = facturas.filter(factura => factura.id !== idFactura);
  respuesta.factura = facturas;
  return respuesta;
};

module.exports = {
  facturasObjeto,
  filtrarFactura,
  crearFactura,
  modificarFactura,
  borrarFactura
};
