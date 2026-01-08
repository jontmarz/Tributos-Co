// Exportar constantes
export { CONSTANTES, TASAS_RECARGO } from './contants';

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