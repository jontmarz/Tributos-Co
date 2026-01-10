import { CONSTANTES, TASAS_SEGURIDAD_SOCIAL } from '../contants';

/**
 * Tipo de riesgo de ARL
 */
export type TipoRiesgoARL = 1 | 2 | 3 | 4 | 5;

/**
 * Resultado del cálculo de seguridad social
 */
export interface SeguridadSocial {
  /** Ingreso Base de Cotización */
  ibc: number;
  /** Salud aporte empleado (4%) */
  saludEmpleado: number;
  /** Salud aporte empleador (8.5%) */
  saludEmpleador: number;
  /** Total aporte salud (12.5%) */
  totalSalud: number;
  /** Pensión aporte empleado (4%) */
  pensionEmpleado: number;
  /** Pensión aporte empleador (12%) */
  pensionEmpleador: number;
  /** Total aporte pensión (16%) */
  totalPension: number;
  /** ARL (variable según riesgo, paga empleador) */
  arl: number;
  /** Total aportes empleado (salud + pensión) */
  totalEmpleado: number;
  /** Total aportes empleador (salud + pensión + ARL) */
  totalEmpleador: number;
  /** Total seguridad social */
  totalSeguridadSocial: number;
}

/**
 * Resultado del cálculo de parafiscales
 */
export interface Parafiscales {
  /** Caja de Compensación (4%, siempre se paga) */
  cajaCompensacion: number;
  /** ICBF (3%, solo si salario > 10 SMLMV) */
  icbf: number;
  /** SENA (2%, solo si salario > 10 SMLMV) */
  sena: number;
  /** Total parafiscales */
  totalParafiscales: number;
  /** Indica si está exento de ICBF y SENA */
  exentoIcbfSena: boolean;
}

/**
 * Calcula el Ingreso Base de Cotización (IBC)
 * Incluye salario + auxilio de transporte si aplica
 * @param salario - Salario mensual base
 * @returns IBC para seguridad social
 */
export const calcularIBC = (salario: number): number => {
  let ibc = salario;
  
  // Agregar auxilio de transporte si el salario es <= 2 SMLMV
  if (salario <= CONSTANTES.DOS_MINIMOS) {
    ibc += CONSTANTES.AUX_TRANSPORTE;
  }
  
  // El IBC no puede superar el tope establecido
  if (ibc > CONSTANTES.TOPE_IBC_SEG_SOCIAL) {
    ibc = CONSTANTES.TOPE_IBC_SEG_SOCIAL;
  }
  
  // El IBC mínimo es 1 SMLMV
  if (ibc < CONSTANTES.SMLMV) {
    ibc = CONSTANTES.SMLMV;
  }
  
  return ibc;
};

/**
 * Obtiene la tasa de ARL según el tipo de riesgo
 * @param riesgo - Tipo de riesgo (1 a 5)
 * @returns Tasa de ARL
 */
export const obtenerTasaARL = (riesgo: TipoRiesgoARL): number => {
  const tasas: Record<TipoRiesgoARL, number> = {
    1: 0.00522,  // 0.522%
    2: 0.01044,  // 1.044%
    3: 0.02436,  // 2.436%
    4: 0.04350,  // 4.350%
    5: 0.06960,  // 6.960%
  };
  return tasas[riesgo];
};

/**
 * Calcula los aportes a seguridad social
 * @param salario - Salario mensual base
 * @param riesgoARL - Tipo de riesgo para ARL (default 1)
 * @returns Objeto con detalle de aportes a seguridad social
 */
export const calcularSeguridadSocial = (
  salario: number,
  riesgoARL: TipoRiesgoARL = 1
): SeguridadSocial => {
  const ibc = calcularIBC(salario);
  const tasaARL = obtenerTasaARL(riesgoARL);
  
  const saludEmpleado = ibc * TASAS_SEGURIDAD_SOCIAL.SALUD_EMPLEADO;
  const saludEmpleador = ibc * TASAS_SEGURIDAD_SOCIAL.SALUD_EMPLEADOR;
  const totalSalud = saludEmpleado + saludEmpleador;
  
  const pensionEmpleado = ibc * TASAS_SEGURIDAD_SOCIAL.PENSION_EMPLEADO;
  const pensionEmpleador = ibc * TASAS_SEGURIDAD_SOCIAL.PENSION_EMPLEADOR;
  const totalPension = pensionEmpleado + pensionEmpleador;
  
  const arl = ibc * tasaARL;
  
  const totalEmpleado = saludEmpleado + pensionEmpleado;
  const totalEmpleador = saludEmpleador + pensionEmpleador + arl;
  const totalSeguridadSocial = totalSalud + totalPension + arl;
  
  return {
    ibc,
    saludEmpleado,
    saludEmpleador,
    totalSalud,
    pensionEmpleado,
    pensionEmpleador,
    totalPension,
    arl,
    totalEmpleado,
    totalEmpleador,
    totalSeguridadSocial,
  };
};

/**
 * Calcula los aportes parafiscales
 * ICBF y SENA solo aplican para salarios > 10 SMLMV
 * @param salario - Salario mensual base
 * @returns Objeto con detalle de parafiscales
 */
export const calcularParafiscales = (salario: number): Parafiscales => {
  const ibc = calcularIBC(salario);
  const exentoIcbfSena = salario <= (10 * CONSTANTES.SMLMV);
  
  const cajaCompensacion = ibc * TASAS_SEGURIDAD_SOCIAL.CAJA_COMPENSACION;
  const icbf = exentoIcbfSena ? 0 : ibc * TASAS_SEGURIDAD_SOCIAL.ICBF;
  const sena = exentoIcbfSena ? 0 : ibc * TASAS_SEGURIDAD_SOCIAL.SENA;
  
  const totalParafiscales = cajaCompensacion + icbf + sena;
  
  return {
    cajaCompensacion,
    icbf,
    sena,
    totalParafiscales,
    exentoIcbfSena,
  };
};

/**
 * Calcula el costo total de seguridad social y parafiscales para el empleador
 * @param salario - Salario mensual base
 * @param riesgoARL - Tipo de riesgo para ARL (default 1)
 * @returns Costo total mensual para el empleador
 */
export const calcularCostoTotalSeguridadSocial = (
  salario: number,
  riesgoARL: TipoRiesgoARL = 1
): number => {
  const seguridadSocial = calcularSeguridadSocial(salario, riesgoARL);
  const parafiscales = calcularParafiscales(salario);
  
  return seguridadSocial.totalEmpleador + parafiscales.totalParafiscales;
};

/**
 * Calcula el salario neto después de deducciones de seguridad social
 * @param salario - Salario mensual bruto
 * @param riesgoARL - Tipo de riesgo para ARL (default 1)
 * @returns Salario neto después de deducciones
 */
export const calcularSalarioNeto = (
  salario: number,
  riesgoARL: TipoRiesgoARL = 1
): number => {
  const seguridadSocial = calcularSeguridadSocial(salario, riesgoARL);
  return salario - seguridadSocial.totalEmpleado;
};
