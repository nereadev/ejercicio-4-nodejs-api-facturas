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

module.exports = { facturasObjeto, filtrarFactura };
