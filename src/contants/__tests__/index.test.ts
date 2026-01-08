import { CONSTANTES, TASAS_RECARGO } from '../index';

describe('Constantes', () => {
  describe('CONSTANTES', () => {
    it('debe tener el valor correcto de UVT para 2026', () => {
      expect(CONSTANTES.UVT).toBe(52374);
    });

    it('debe tener el valor correcto de SMLMV para 2026', () => {
      expect(CONSTANTES.SMLMV).toBe(1750905);
    });

    it('debe tener el valor correcto de Auxilio de Transporte para 2026', () => {
      expect(CONSTANTES.AUX_TRANSPORTE).toBe(249095);
    });

    it('debe tener el valor correcto de IVA general', () => {
      expect(CONSTANTES.IVA_GENERAL).toBe(0.19);
    });

    it('debe tener 220 horas mensuales antes de julio 2026', () => {
      expect(CONSTANTES.HORAS_MES_ANTES_JULIO).toBe(220);
    });

    it('debe tener 210 horas mensuales después de julio 2026', () => {
      expect(CONSTANTES.HORAS_MES_DESPUES_JULIO).toBe(210);
    });
  });

  describe('TASAS_RECARGO', () => {
    it('debe tener tasa de extra diurna del 25%', () => {
      expect(TASAS_RECARGO.EXTRA_DIURNA).toBe(0.25);
    });

    it('debe tener tasa de extra nocturna del 75%', () => {
      expect(TASAS_RECARGO.EXTRA_NOCTURNA).toBe(0.75);
    });

    it('debe tener tasa de recargo nocturno del 35%', () => {
      expect(TASAS_RECARGO.RECARGO_NOCTURNO).toBe(0.35);
    });

    it('debe tener tasa de dominical/festivo del 80% (actualizado 2026)', () => {
      expect(TASAS_RECARGO.DOMINICAL_FESTIVO).toBe(0.8);
    });

    it('debe tener tasa de extra diurna dominical del 105% (2.05)', () => {
      expect(TASAS_RECARGO.EXTRA_DIURNA_DOMINICAL).toBe(2.05);
    });

    it('debe tener tasa de extra nocturna dominical del 155% (2.55)', () => {
      expect(TASAS_RECARGO.EXTRA_NOCTURNA_DOMINICAL).toBe(2.55);
    });
  });

  describe('Validación de cálculos manuales', () => {
    it('la tasa extra diurna dominical debe ser el valor total correcto', () => {
      // La tasa es el multiplicador completo: hora ordinaria * (1 + 1.05) = hora * 2.05
      // Es decir: 100% base + 25% extra + 80% dominical = 205% = 2.05
      expect(TASAS_RECARGO.EXTRA_DIURNA_DOMINICAL).toBe(2.05);
    });

    it('la tasa extra nocturna dominical debe ser el valor total correcto', () => {
      // La tasa es el multiplicador completo: hora ordinaria * (1 + 1.55) = hora * 2.55
      // Es decir: 100% base + 75% extra + 80% dominical = 255% = 2.55
      expect(TASAS_RECARGO.EXTRA_NOCTURNA_DOMINICAL).toBe(2.55);
    });
  });
});
