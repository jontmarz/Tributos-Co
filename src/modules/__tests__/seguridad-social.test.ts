import {
  calcularIBC,
  obtenerTasaARL,
  calcularSeguridadSocial,
  calcularParafiscales,
  calcularCostoTotalSeguridadSocial,
  calcularSalarioNeto,
} from '../seguridad-social';
import { CONSTANTES, TASAS_SEGURIDAD_SOCIAL } from '../../contants';

describe('Seguridad Social', () => {
  describe('calcularIBC', () => {
    it('debe incluir auxilio de transporte si salario <= 2 SMLMV', () => {
      const salario = 2000000;
      const ibc = calcularIBC(salario);
      expect(ibc).toBe(salario + CONSTANTES.AUX_TRANSPORTE);
    });

    it('no debe incluir auxilio de transporte si salario > 2 SMLMV', () => {
      const salario = 4000000;
      const ibc = calcularIBC(salario);
      expect(ibc).toBe(salario);
    });

    it('no debe superar el tope de IBC', () => {
      const salario = 50000000;
      const ibc = calcularIBC(salario);
      expect(ibc).toBe(CONSTANTES.TOPE_IBC_SEG_SOCIAL);
    });

    it('debe ser mínimo 1 SMLMV', () => {
      const salario = 1000000;
      const ibc = calcularIBC(salario);
      expect(ibc).toBe(CONSTANTES.SMLMV);
    });
  });

  describe('obtenerTasaARL', () => {
    it('debe retornar la tasa correcta para riesgo I', () => {
      expect(obtenerTasaARL(1)).toBe(0.00522);
    });

    it('debe retornar la tasa correcta para riesgo V', () => {
      expect(obtenerTasaARL(5)).toBe(0.06960);
    });
  });

  describe('calcularSeguridadSocial', () => {
    it('debe calcular aportes de salud correctamente', () => {
      const salario = 2000000;
      const seguridad = calcularSeguridadSocial(salario);
      const ibc = calcularIBC(salario);

      expect(seguridad.saludEmpleado).toBeCloseTo(ibc * 0.04, 2);
      expect(seguridad.saludEmpleador).toBeCloseTo(ibc * 0.085, 2);
      expect(seguridad.totalSalud).toBeCloseTo(ibc * 0.125, 2);
    });

    it('debe calcular aportes de pensión correctamente', () => {
      const salario = 2000000;
      const seguridad = calcularSeguridadSocial(salario);
      const ibc = calcularIBC(salario);

      expect(seguridad.pensionEmpleado).toBeCloseTo(ibc * 0.04, 2);
      expect(seguridad.pensionEmpleador).toBeCloseTo(ibc * 0.12, 2);
      expect(seguridad.totalPension).toBeCloseTo(ibc * 0.16, 2);
    });

    it('debe calcular ARL según el riesgo', () => {
      const salario = 2000000;
      const seguridad1 = calcularSeguridadSocial(salario, 1);
      const seguridad3 = calcularSeguridadSocial(salario, 3);
      const ibc = calcularIBC(salario);

      expect(seguridad1.arl).toBeCloseTo(ibc * 0.00522, 2);
      expect(seguridad3.arl).toBeCloseTo(ibc * 0.02436, 2);
    });

    it('debe calcular totales correctamente', () => {
      const salario = 2000000;
      const seguridad = calcularSeguridadSocial(salario);

      expect(seguridad.totalEmpleado).toBe(
        seguridad.saludEmpleado + seguridad.pensionEmpleado
      );
      expect(seguridad.totalEmpleador).toBe(
        seguridad.saludEmpleador + seguridad.pensionEmpleador + seguridad.arl
      );
      expect(seguridad.totalSeguridadSocial).toBe(
        seguridad.totalSalud + seguridad.totalPension + seguridad.arl
      );
    });
  });

  describe('calcularParafiscales', () => {
    it('debe calcular caja de compensación siempre', () => {
      const salario = 2000000;
      const parafiscales = calcularParafiscales(salario);
      const ibc = calcularIBC(salario);

      expect(parafiscales.cajaCompensacion).toBeCloseTo(ibc * 0.04, 2);
    });

    it('debe exentar ICBF y SENA si salario <= 10 SMLMV', () => {
      const salario = CONSTANTES.SMLMV * 5;
      const parafiscales = calcularParafiscales(salario);

      expect(parafiscales.exentoIcbfSena).toBe(true);
      expect(parafiscales.icbf).toBe(0);
      expect(parafiscales.sena).toBe(0);
    });

    it('debe cobrar ICBF y SENA si salario > 10 SMLMV', () => {
      const salario = CONSTANTES.SMLMV * 12;
      const parafiscales = calcularParafiscales(salario);
      const ibc = calcularIBC(salario);

      expect(parafiscales.exentoIcbfSena).toBe(false);
      expect(parafiscales.icbf).toBeCloseTo(ibc * 0.03, 2);
      expect(parafiscales.sena).toBeCloseTo(ibc * 0.02, 2);
    });

    it('debe calcular total parafiscales correctamente', () => {
      const salario = CONSTANTES.SMLMV * 12;
      const parafiscales = calcularParafiscales(salario);

      expect(parafiscales.totalParafiscales).toBe(
        parafiscales.cajaCompensacion + parafiscales.icbf + parafiscales.sena
      );
    });
  });

  describe('calcularCostoTotalSeguridadSocial', () => {
    it('debe sumar seguridad social y parafiscales del empleador', () => {
      const salario = 2000000;
      const costoTotal = calcularCostoTotalSeguridadSocial(salario);
      const seguridad = calcularSeguridadSocial(salario);
      const parafiscales = calcularParafiscales(salario);

      expect(costoTotal).toBeCloseTo(
        seguridad.totalEmpleador + parafiscales.totalParafiscales,
        2
      );
    });
  });

  describe('calcularSalarioNeto', () => {
    it('debe restar deducciones de seguridad social del salario', () => {
      const salario = 2000000;
      const neto = calcularSalarioNeto(salario);
      const seguridad = calcularSeguridadSocial(salario);

      expect(neto).toBeCloseTo(salario - seguridad.totalEmpleado, 2);
    });
  });
});
