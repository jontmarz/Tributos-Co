// Exportar constantes
export { CONSTANTES, TASAS_RECARGO, TASAS_SEGURIDAD_SOCIAL, TASAS_PRESTACIONES } from './contants';

// Exportar funciones de cálculo laboral
export {
  calcularHoraOrdinaria,
  calcularHoraExtraDiurna,
  calcularHoraExtraNocturna,
  calcularHoraOrdinariaNocturna,
  calcularHoraDominicalFestiva,
  calcularHoraExtraDiurnaDominical,
  calcularHoraExtraNocturnaDominical,
  calcularRecargosSalariales,
  type RecargosInput,
} from './modules/labor';

// Exportar funciones de prestaciones sociales
export {
  calcularSalarioBasePrestaciones,
  calcularCesantias,
  calcularPrima,
  calcularInteresesCesantias,
  calcularVacaciones,
  calcularPrestacionesSociales,
  calcularCostoTotalEmpleadoPrestaciones,
  type PrestacionesSociales,
} from './modules/prestaciones';

// Exportar funciones de seguridad social
export {
  calcularIBC,
  obtenerTasaARL,
  calcularSeguridadSocial,
  calcularParafiscales,
  calcularCostoTotalSeguridadSocial,
  calcularSalarioNeto,
  type TipoRiesgoARL,
  type SeguridadSocial,
  type Parafiscales,
} from './modules/seguridad-social';

// Exportar funciones de validaciones y deducciones
export {
  validarSalarioMinimo,
  tieneDerechoAuxilioTransporte,
  estaExentoIcbfSena,
  esSalarioIntegral,
  calcularDeduccionDependientes,
  calcularDeduccionSalud,
  calcularDeduccionVivienda,
  puedeRecibirValesExentos,
  calcularMontoMaximoVales,
  calcularDeducciones,
  requiereDotacion,
  type Deducciones,
} from './modules/deducciones';
