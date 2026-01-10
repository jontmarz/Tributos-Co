export const CONSTANTES = {
  UVT: 52374,
  IVA_GENERAL: 0.19,
  SMLMV: 1750905, // Valor para 2026
  AUX_TRANSPORTE: 249095, // Valor para 2026
  // Jornada laboral: 15 julio 2026 baja a 42h semanales
  HORAS_MES_ANTES_JULIO: 220,
  HORAS_MES_DESPUES_JULIO: 210,
  // Valores de referencia adicionales
  MINIMO_INTEGRAL: 22761765, // 13 SMLMV del 2026
  DOS_MINIMOS: 3501810, // Para derecho a Subsidio de Transporte
  CUATRO_MINIMOS: 7003620, // Para aportes FSP "Seguridad Social"
  TOPE_FSP_EMPLEADO: 875453, // Tope FSP para empleado
  DEDUCIBLE_DEPENDIENTES: 1676000, // 32 UVT - Ley 1607/26-12-2012
  DEDUCIBLE_SALUD: 1676000, // 32 UVT - Ley 1607/26-12-2012
  MAXIMO_DEDUCIBLE_VIVIENDA: 5237000, // 100 UVT - Ley 1111/2006
  MAXIMO_EXENTO: 12570000, // 240 UVT - Ley 1111/2006
  TOPE_SALARIAL_BENEFICIO_VALES: 16236000, // 310 UVT - Ley 1111/2006
  MONTO_MAXIMO_VALES_NO_GRAVADOS: 2147000, // 41 UVT - Ley 1111/2006
  TOPE_ANUAL_DEDUCIBLE_AFP_VOL: 19009000, // 3,800 UVT
  TOPE_IBC_SEG_SOCIAL: 43773000, // Tope para IBC de seguridad social
};

export const TASAS_RECARGO = {
  EXTRA_DIURNA: 0.25,
  EXTRA_NOCTURNA: 0.75,
  RECARGO_NOCTURNO: 0.35,
  DOMINICAL_FESTIVO: 0.8, // Aumentado por ley para 2026
  EXTRA_DIURNA_DOMINICAL: 2.05,
  EXTRA_NOCTURNA_DOMINICAL: 2.55,
};

// Tasas de seguridad social
export const TASAS_SEGURIDAD_SOCIAL = {
  SALUD_EMPLEADO: 0.04, // 4%
  SALUD_EMPLEADOR: 0.085, // 8.5%
  PENSION_EMPLEADO: 0.04, // 4%
  PENSION_EMPLEADOR: 0.12, // 12%
  TOTAL_SALUD: 0.125, // 12.5%
  TOTAL_PENSION: 0.16, // 16%
  ARL_MIN: 0.00522, // Riesgo I - 0.522%
  ARL_MAX: 0.0696, // Riesgo V - 6.96%
  CAJA_COMPENSACION: 0.04, // 4% (solo empleador)
  ICBF: 0.03, // 3% (solo empleador, salarios > 10 SMLMV)
  SENA: 0.02, // 2% (solo empleador, salarios > 10 SMLMV)
};

// Tasas de prestaciones sociales
export const TASAS_PRESTACIONES = {
  CESANTIAS: 1 / 12, // 8.33%
  PRIMA: 1 / 12, // 8.33%
  INTERESES_CESANTIAS: 0.12, // 12% anual
  VACACIONES: 1 / 24, // 4.17% (15 días por año)
};
