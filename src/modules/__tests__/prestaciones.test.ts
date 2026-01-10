import {
  calcularCesantias,
  calcularPrima,
  calcularInteresesCesantias,
  calcularVacaciones,
  calcularPrestacionesSociales,
  calcularSalarioBasePrestaciones,
} from '../prestaciones';
import { CONSTANTES } from '../../contants';

describe('Prestaciones Sociales', () => {
  describe('calcularSalarioBasePrestaciones', () => {
    it('debe incluir auxilio de transporte si salario <= 2 SMLMV', () => {
      const salario = 2000000;
      const base = calcularSalarioBasePrestaciones(salario);
      expect(base).toBe(salario + CONSTANTES.AUX_TRANSPORTE);
    });

    it('no debe incluir auxilio de transporte si salario > 2 SMLMV', () => {
      const salario = 4000000;
      const base = calcularSalarioBasePrestaciones(salario);
      expect(base).toBe(salario);
    });
  });

  describe('calcularCesantias', () => {
    it('debe calcular cesantías correctamente para salario con auxilio', () => {
      const salario = 2000000;
      const cesantias = calcularCesantias(salario);
      const base = salario + CONSTANTES.AUX_TRANSPORTE;
      expect(cesantias).toBeCloseTo(base / 12, 2);
    });

    it('debe calcular cesantías correctamente para salario sin auxilio', () => {
      const salario = 4000000;
      const cesantias = calcularCesantias(salario);
      expect(cesantias).toBeCloseTo(salario / 12, 2);
    });
  });

  describe('calcularPrima', () => {
    it('debe calcular prima correctamente', () => {
      const salario = 2000000;
      const prima = calcularPrima(salario);
      const base = salario + CONSTANTES.AUX_TRANSPORTE;
      expect(prima).toBeCloseTo(base / 12, 2);
    });
  });

  describe('calcularInteresesCesantias', () => {
    it('debe calcular intereses sobre cesantías al 12% anual', () => {
      const salario = 2000000;
      const intereses = calcularInteresesCesantias(salario, 12);
      const cesantiasAnuales = calcularCesantias(salario) * 12;
      expect(intereses).toBeCloseTo(cesantiasAnuales * 0.12, 2);
    });

    it('debe calcular intereses proporcionales para menos de 12 meses', () => {
      const salario = 2000000;
      const meses = 6;
      const intereses = calcularInteresesCesantias(salario, meses);
      const cesantiasPeriodo = calcularCesantias(salario) * meses;
      expect(intereses).toBeCloseTo(cesantiasPeriodo * 0.12, 2);
    });
  });

  describe('calcularVacaciones', () => {
    it('debe calcular vacaciones sin incluir auxilio de transporte', () => {
      const salario = 2000000;
      const vacaciones = calcularVacaciones(salario);
      // Las vacaciones NO incluyen auxilio de transporte
      expect(vacaciones).toBeCloseTo(salario / 24, 2);
    });
  });

  describe('calcularPrestacionesSociales', () => {
    it('debe calcular todas las prestaciones correctamente', () => {
      const salario = CONSTANTES.SMLMV;
      const prestaciones = calcularPrestacionesSociales(salario);

      expect(prestaciones.cesantias).toBeGreaterThan(0);
      expect(prestaciones.prima).toBeGreaterThan(0);
      expect(prestaciones.interesesCesantias).toBeGreaterThan(0);
      expect(prestaciones.vacaciones).toBeGreaterThan(0);
      expect(prestaciones.totalMensual).toBe(
        prestaciones.cesantias + prestaciones.prima + prestaciones.vacaciones
      );
    });

    it('debe calcular total anual correctamente', () => {
      const salario = 2000000;
      const prestaciones = calcularPrestacionesSociales(salario);

      const esperadoAnual =
        (prestaciones.cesantias + prestaciones.prima + prestaciones.vacaciones) * 12 +
        prestaciones.interesesCesantias;

      expect(prestaciones.totalAnual).toBeCloseTo(esperadoAnual, 2);
    });
  });
});
