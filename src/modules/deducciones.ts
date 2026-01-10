import { CONSTANTES } from '../contants';

/**
 * Valida si un salario cumple con el salario mínimo legal
 * @param salario - Salario a validar
 * @returns true si el salario es >= SMLMV
 */
export const validarSalarioMinimo = (salario: number): boolean => {
  return salario >= CONSTANTES.SMLMV;
};

/**
 * Valida si un trabajador tiene derecho a auxilio de transporte
 * Aplica para salarios <= 2 SMLMV
 * @param salario - Salario mensual
 * @returns true si tiene derecho a auxilio de transporte
 */
export const tieneDerechoAuxilioTransporte = (salario: number): boolean => {
  return salario <= CONSTANTES.DOS_MINIMOS;
};

/**
 * Valida si un salario está exento de ICBF y SENA
 * Aplica para salarios <= 10 SMLMV
 * @param salario - Salario mensual
 * @returns true si está exento
 */
export const estaExentoIcbfSena = (salario: number): boolean => {
  return salario <= (10 * CONSTANTES.SMLMV);
};

/**
 * Valida si un salario es considerado integral
 * Debe ser >= 13 SMLMV
 * @param salario - Salario mensual
 * @returns true si es salario integral
 */
export const esSalarioIntegral = (salario: number): boolean => {
  return salario >= CONSTANTES.MINIMO_INTEGRAL;
};

/**
 * Calcula la deducción por dependientes permitida
 * @param numeroDependientes - Número de dependientes
 * @returns Valor de la deducción anual
 */
export const calcularDeduccionDependientes = (numeroDependientes: number): number => {
  return CONSTANTES.DEDUCIBLE_DEPENDIENTES * numeroDependientes;
};

/**
 * Calcula la deducción por salud permitida
 * @param gastosSalud - Gastos en salud del año
 * @returns Valor deducible (máximo 32 UVT)
 */
export const calcularDeduccionSalud = (gastosSalud: number): number => {
  return Math.min(gastosSalud, CONSTANTES.DEDUCIBLE_SALUD);
};

/**
 * Calcula la deducción por vivienda permitida
 * @param pagosVivienda - Pagos por vivienda del año
 * @returns Valor deducible (máximo 100 UVT)
 */
export const calcularDeduccionVivienda = (pagosVivienda: number): number => {
  return Math.min(pagosVivienda, CONSTANTES.MAXIMO_DEDUCIBLE_VIVIENDA);
};

/**
 * Valida si el salario puede recibir vales de alimentación exentos
 * @param salario - Salario mensual
 * @returns true si puede recibir vales exentos
 */
export const puedeRecibirValesExentos = (salario: number): boolean => {
  const salarioAnual = salario * 12;
  return salarioAnual <= CONSTANTES.TOPE_SALARIAL_BENEFICIO_VALES;
};

/**
 * Calcula el monto máximo de vales no gravados
 * @param salario - Salario mensual
 * @returns Monto máximo mensual de vales exentos
 */
export const calcularMontoMaximoVales = (salario: number): number => {
  if (!puedeRecibirValesExentos(salario)) {
    return 0;
  }
  return CONSTANTES.MONTO_MAXIMO_VALES_NO_GRAVADOS / 12; // Mensual
};

/**
 * Resultado del cálculo de deducciones
 */
export interface Deducciones {
  /** Deducción por dependientes */
  dependientes: number;
  /** Deducción por salud */
  salud: number;
  /** Deducción por vivienda */
  vivienda: number;
  /** Total deducciones anuales */
  totalDeducciones: number;
}

/**
 * Calcula todas las deducciones permitidas
 * @param params - Parámetros para el cálculo
 * @returns Objeto con detalle de deducciones
 */
export const calcularDeducciones = (params: {
  numeroDependientes?: number;
  gastosSalud?: number;
  pagosVivienda?: number;
}): Deducciones => {
  const dependientes = calcularDeduccionDependientes(params.numeroDependientes || 0);
  const salud = calcularDeduccionSalud(params.gastosSalud || 0);
  const vivienda = calcularDeduccionVivienda(params.pagosVivienda || 0);
  
  const totalDeducciones = dependientes + salud + vivienda;
  
  return {
    dependientes,
    salud,
    vivienda,
    totalDeducciones,
  };
};

/**
 * Valida si el trabajador requiere dotación
 * Aplica para salarios <= 2 SMLMV
 * @param salario - Salario mensual
 * @returns true si requiere dotación
 */
export const requiereDotacion = (salario: number): boolean => {
  return salario <= CONSTANTES.DOS_MINIMOS;
};
