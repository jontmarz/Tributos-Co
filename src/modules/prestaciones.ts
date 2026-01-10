import { CONSTANTES, TASAS_PRESTACIONES } from '../contants';

/**
 * Resultado del cálculo de prestaciones sociales
 */
export interface PrestacionesSociales {
  /** Cesantías mensuales */
  cesantias: number;
  /** Prima de servicios mensual */
  prima: number;
  /** Intereses sobre cesantías anuales */
  interesesCesantias: number;
  /** Vacaciones mensuales */
  vacaciones: number;
  /** Total de prestaciones sociales mensuales */
  totalMensual: number;
  /** Total de prestaciones sociales anuales */
  totalAnual: number;
}

/**
 * Calcula el salario base para prestaciones sociales
 * Incluye auxilio de transporte si el salario es <= 2 SMLMV
 * @param salario - Salario mensual base
 * @returns Salario base para prestaciones
 */
export const calcularSalarioBasePrestaciones = (salario: number): number => {
  if (salario <= CONSTANTES.DOS_MINIMOS) {
    return salario + CONSTANTES.AUX_TRANSPORTE;
  }
  return salario;
};

/**
 * Calcula las cesantías mensuales (8.33%)
 * @param salario - Salario mensual base
 * @returns Valor mensual de cesantías
 */
export const calcularCesantias = (salario: number): number => {
  const salarioBase = calcularSalarioBasePrestaciones(salario);
  return salarioBase * TASAS_PRESTACIONES.CESANTIAS;
};

/**
 * Calcula la prima de servicios mensual (8.33%)
 * @param salario - Salario mensual base
 * @returns Valor mensual de prima
 */
export const calcularPrima = (salario: number): number => {
  const salarioBase = calcularSalarioBasePrestaciones(salario);
  return salarioBase * TASAS_PRESTACIONES.PRIMA;
};

/**
 * Calcula los intereses sobre cesantías (12% anual)
 * @param salario - Salario mensual base
 * @param meses - Meses trabajados (default 12)
 * @returns Valor anual de intereses sobre cesantías
 */
export const calcularInteresesCesantias = (salario: number, meses: number = 12): number => {
  const cesantiasAnuales = calcularCesantias(salario) * meses;
  return cesantiasAnuales * TASAS_PRESTACIONES.INTERESES_CESANTIAS;
};

/**
 * Calcula las vacaciones mensuales (4.17%)
 * Equivale a 15 días por año
 * @param salario - Salario mensual base (sin auxilio de transporte)
 * @returns Valor mensual de vacaciones
 */
export const calcularVacaciones = (salario: number): number => {
  // Las vacaciones NO incluyen auxilio de transporte
  return salario * TASAS_PRESTACIONES.VACACIONES;
};

/**
 * Calcula todas las prestaciones sociales
 * @param salario - Salario mensual base
 * @param mesesTrabajados - Meses trabajados para el cálculo de intereses (default 12)
 * @returns Objeto con detalle de prestaciones
 */
export const calcularPrestacionesSociales = (
  salario: number,
  mesesTrabajados: number = 12
): PrestacionesSociales => {
  const cesantias = calcularCesantias(salario);
  const prima = calcularPrima(salario);
  const interesesCesantias = calcularInteresesCesantias(salario, mesesTrabajados);
  const vacaciones = calcularVacaciones(salario);

  const totalMensual = cesantias + prima + vacaciones;
  const totalAnual = (cesantias + prima + vacaciones) * 12 + interesesCesantias;

  return {
    cesantias,
    prima,
    interesesCesantias,
    vacaciones,
    totalMensual,
    totalAnual,
  };
};

/**
 * Calcula el costo total del empleado incluyendo prestaciones
 * @param salario - Salario mensual base
 * @returns Costo mensual total
 */
export const calcularCostoTotalEmpleadoPrestaciones = (salario: number): number => {
  const prestaciones = calcularPrestacionesSociales(salario);
  return salario + prestaciones.totalMensual;
};
