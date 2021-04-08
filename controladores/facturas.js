const { facturas } = require("../facturas.json");

const facturasObjeto = (facturas) => (
  {
    total: facturas.length,
    datos: facturas
  }
);

const filtrarFactura = (tipo) => {
  const facturaFiltrada = facturas.filter(factura => factura.tipo === tipo);
  const factura = facturasObjeto(facturaFiltrada);
  return factura;
};

const crearFactura = nuevaFactura => {
  const respuesta = {
    factura: null,
    error: null
  };
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

module.exports = {
  facturasObjeto,
  filtrarFactura,
  crearFactura,
  modificarFactura
};
