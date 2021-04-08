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

module.exports = {
  facturasObjeto,
  filtrarFactura,
  crearFactura
};
