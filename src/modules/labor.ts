import { CONSTANTES, TASAS_RECARGO } from '../contants';

/**
 * Calcula el valor de la hora ordinaria de trabajo
 * @param salario - Salario mensual del trabajador
 * @param fecha - Fecha para la cual se calcula (afecta las horas mensuales por reforma)
 * @returns Valor de la hora ordinaria
 */
export const calcularHoraOrdinaria = (salario: number, fecha: Date = new Date()): number => {
  const limiteLey = new Date('2026-07-15');
  const horasMes = fecha >= limiteLey 
    ? CONSTANTES.HORAS_MES_DESPUES_JULIO 
    : CONSTANTES.HORAS_MES_ANTES_JULIO;
  return salario / horasMes;
};

/**
 * Calcula el valor de la hora extra diurna (6am - 9pm)
 * Recargo del 25% sobre la hora ordinaria
 * @param salario - Salario mensual del trabajador
 * @param fecha - Fecha de referencia
 * @returns Valor de la hora extra diurna
 */
export const calcularHoraExtraDiurna = (salario: number, fecha: Date = new Date()): number => {
  const vho = calcularHoraOrdinaria(salario, fecha);
  return vho * (1 + TASAS_RECARGO.EXTRA_DIURNA);
};

/**
 * Calcula el valor de la hora extra nocturna (9pm - 6am)
 * Recargo del 75% sobre la hora ordinaria
 * @param salario - Salario mensual del trabajador
 * @param fecha - Fecha de referencia
 * @returns Valor de la hora extra nocturna
 */
export const calcularHoraExtraNocturna = (salario: number, fecha: Date = new Date()): number => {
  const vho = calcularHoraOrdinaria(salario, fecha);
  return vho * (1 + TASAS_RECARGO.EXTRA_NOCTURNA);
};

/**
 * Calcula el valor de la hora ordinaria nocturna (9pm - 6am)
 * Recargo del 35% sobre la hora ordinaria
 * @param salario - Salario mensual del trabajador
 * @param fecha - Fecha de referencia
 * @returns Valor de la hora ordinaria nocturna
 */
export const calcularHoraOrdinariaNocturna = (salario: number, fecha: Date = new Date()): number => {
  const vho = calcularHoraOrdinaria(salario, fecha);
  return vho * (1 + TASAS_RECARGO.RECARGO_NOCTURNO);
};

/**
 * Calcula el valor de la hora ordinaria en domingo o festivo
 * Recargo del 80% sobre la hora ordinaria (actualizado 2026)
 * @param salario - Salario mensual del trabajador
 * @param fecha - Fecha de referencia
 * @returns Valor de la hora dominical/festiva
 */
export const calcularHoraDominicalFestiva = (salario: number, fecha: Date = new Date()): number => {
  const vho = calcularHoraOrdinaria(salario, fecha);
  return vho * (1 + TASAS_RECARGO.DOMINICAL_FESTIVO);
};

/**
 * Calcula el valor de la hora extra diurna en domingo o festivo
 * Recargo del 105% sobre la hora ordinaria (25% extra + 80% dominical)
 * @param salario - Salario mensual del trabajador
 * @param fecha - Fecha de referencia
 * @returns Valor de la hora extra diurna dominical/festiva
 */
export const calcularHoraExtraDiurnaDominical = (salario: number, fecha: Date = new Date()): number => {
  const vho = calcularHoraOrdinaria(salario, fecha);
  return vho * TASAS_RECARGO.EXTRA_DIURNA_DOMINICAL;
};

/**
 * Calcula el valor de la hora extra nocturna en domingo o festivo
 * Recargo del 155% sobre la hora ordinaria (75% extra + 80% dominical)
 * @param salario - Salario mensual del trabajador
 * @param fecha - Fecha de referencia
 * @returns Valor de la hora extra nocturna dominical/festiva
 */
export const calcularHoraExtraNocturnaDominical = (salario: number, fecha: Date = new Date()): number => {
  const vho = calcularHoraOrdinaria(salario, fecha);
  return vho * TASAS_RECARGO.EXTRA_NOCTURNA_DOMINICAL;
};

export interface RecargosInput {
  /** Horas extras diurnas (6am - 9pm) */
  extrasDiurnas?: number;
  /** Horas extras nocturnas (9pm - 6am) */
  extrasNocturnas?: number;
  /** Horas ordinarias nocturnas (9pm - 6am) */
  recargoNocturno?: number;
  /** Horas ordinarias en domingo/festivo diurnas */
  festivasDiurnas?: number;
  /** Horas extras diurnas en domingo/festivo */
  extrasDiurnasDominicales?: number;
  /** Horas extras nocturnas en domingo/festivo */
  extrasNocturnasDominicales?: number;
}

/**
 * Calcula todos los recargos salariales de un trabajador
 * @param salario - Salario mensual base
 * @param items - Objeto con las horas trabajadas por tipo
 * @param fecha - Fecha de referencia para el cálculo
 * @returns Objeto con detalle de recargos y total
 */
export const calcularRecargosSalariales = (
  salario: number, 
  items: RecargosInput, 
  fecha: Date = new Date()
) => {
  const vho = calcularHoraOrdinaria(salario, fecha);
  
  const detalle = {
    extrasDiurnas: (items.extrasDiurnas || 0) * vho * TASAS_RECARGO.EXTRA_DIURNA,
    extrasNocturnas: (items.extrasNocturnas || 0) * vho * TASAS_RECARGO.EXTRA_NOCTURNA,
    recargoNocturno: (items.recargoNocturno || 0) * vho * TASAS_RECARGO.RECARGO_NOCTURNO,
    festivasDiurnas: (items.festivasDiurnas || 0) * vho * TASAS_RECARGO.DOMINICAL_FESTIVO,
    extrasDiurnasDominicales: (items.extrasDiurnasDominicales || 0) * vho * TASAS_RECARGO.EXTRA_DIURNA_DOMINICAL,
    extrasNocturnasDominicales: (items.extrasNocturnasDominicales || 0) * vho * TASAS_RECARGO.EXTRA_NOCTURNA_DOMINICAL,
  };

  const totalRecargos = Object.values(detalle).reduce((a, b) => a + b, 0);

  return { 
    vho, 
    detalle, 
    totalRecargos, 
    totalNomina: salario + totalRecargos 
  };
};