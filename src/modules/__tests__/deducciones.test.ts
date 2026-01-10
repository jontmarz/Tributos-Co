import {
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
} from '../deducciones';
import { CONSTANTES } from '../../contants';

describe('Validaciones y Deducciones', () => {
  describe('validarSalarioMinimo', () => {
    it('debe retornar true si salario >= SMLMV', () => {
      expect(validarSalarioMinimo(CONSTANTES.SMLMV)).toBe(true);
      expect(validarSalarioMinimo(CONSTANTES.SMLMV + 100000)).toBe(true);
    });

    it('debe retornar false si salario < SMLMV', () => {
      expect(validarSalarioMinimo(CONSTANTES.SMLMV - 1)).toBe(false);
    });
  });

  describe('tieneDerechoAuxilioTransporte', () => {
    it('debe retornar true si salario <= 2 SMLMV', () => {
      expect(tieneDerechoAuxilioTransporte(CONSTANTES.SMLMV)).toBe(true);
      expect(tieneDerechoAuxilioTransporte(CONSTANTES.DOS_MINIMOS)).toBe(true);
    });

    it('debe retornar false si salario > 2 SMLMV', () => {
      expect(tieneDerechoAuxilioTransporte(CONSTANTES.DOS_MINIMOS + 1)).toBe(false);
    });
  });

  describe('estaExentoIcbfSena', () => {
    it('debe retornar true si salario <= 10 SMLMV', () => {
      expect(estaExentoIcbfSena(CONSTANTES.SMLMV * 10)).toBe(true);
      expect(estaExentoIcbfSena(CONSTANTES.SMLMV * 5)).toBe(true);
    });

    it('debe retornar false si salario > 10 SMLMV', () => {
      expect(estaExentoIcbfSena(CONSTANTES.SMLMV * 11)).toBe(false);
    });
  });

  describe('esSalarioIntegral', () => {
    it('debe retornar true si salario >= 13 SMLMV', () => {
      expect(esSalarioIntegral(CONSTANTES.MINIMO_INTEGRAL)).toBe(true);
      expect(esSalarioIntegral(CONSTANTES.MINIMO_INTEGRAL + 100000)).toBe(true);
    });

    it('debe retornar false si salario < 13 SMLMV', () => {
      expect(esSalarioIntegral(CONSTANTES.MINIMO_INTEGRAL - 1)).toBe(false);
    });
  });

  describe('requiereDotacion', () => {
    it('debe retornar true si salario <= 2 SMLMV', () => {
      expect(requiereDotacion(CONSTANTES.SMLMV)).toBe(true);
      expect(requiereDotacion(CONSTANTES.DOS_MINIMOS)).toBe(true);
    });

    it('debe retornar false si salario > 2 SMLMV', () => {
      expect(requiereDotacion(CONSTANTES.DOS_MINIMOS + 1)).toBe(false);
    });
  });

  describe('calcularDeduccionDependientes', () => {
    it('debe calcular deducción por dependiente (32 UVT)', () => {
      expect(calcularDeduccionDependientes(1)).toBe(CONSTANTES.DEDUCIBLE_DEPENDIENTES);
      expect(calcularDeduccionDependientes(2)).toBe(CONSTANTES.DEDUCIBLE_DEPENDIENTES * 2);
      expect(calcularDeduccionDependientes(0)).toBe(0);
    });
  });

  describe('calcularDeduccionSalud', () => {
    it('debe retornar el monto si es menor al máximo', () => {
      const gastos = CONSTANTES.DEDUCIBLE_SALUD / 2;
      expect(calcularDeduccionSalud(gastos)).toBe(gastos);
    });

    it('debe retornar el máximo si gastos exceden 32 UVT', () => {
      const gastos = CONSTANTES.DEDUCIBLE_SALUD * 2;
      expect(calcularDeduccionSalud(gastos)).toBe(CONSTANTES.DEDUCIBLE_SALUD);
    });
  });

  describe('calcularDeduccionVivienda', () => {
    it('debe retornar el monto si es menor al máximo', () => {
      const pagos = CONSTANTES.MAXIMO_DEDUCIBLE_VIVIENDA / 2;
      expect(calcularDeduccionVivienda(pagos)).toBe(pagos);
    });

    it('debe retornar el máximo si pagos exceden 100 UVT', () => {
      const pagos = CONSTANTES.MAXIMO_DEDUCIBLE_VIVIENDA * 2;
      expect(calcularDeduccionVivienda(pagos)).toBe(CONSTANTES.MAXIMO_DEDUCIBLE_VIVIENDA);
    });
  });

  describe('puedeRecibirValesExentos', () => {
    it('debe retornar true si salario anual <= 310 UVT', () => {
      const salario = CONSTANTES.TOPE_SALARIAL_BENEFICIO_VALES / 12;
      expect(puedeRecibirValesExentos(salario)).toBe(true);
    });

    it('debe retornar false si salario anual > 310 UVT', () => {
      const salario = (CONSTANTES.TOPE_SALARIAL_BENEFICIO_VALES / 12) + 1;
      expect(puedeRecibirValesExentos(salario)).toBe(false);
    });
  });

  describe('calcularMontoMaximoVales', () => {
    it('debe retornar monto mensual si puede recibir vales', () => {
      const salario = 1000000;
      const esperado = CONSTANTES.MONTO_MAXIMO_VALES_NO_GRAVADOS / 12;
      expect(calcularMontoMaximoVales(salario)).toBeCloseTo(esperado, 2);
    });

    it('debe retornar 0 si no puede recibir vales', () => {
      const salario = 50000000;
      expect(calcularMontoMaximoVales(salario)).toBe(0);
    });
  });

  describe('calcularDeducciones', () => {
    it('debe calcular todas las deducciones correctamente', () => {
      const params = {
        numeroDependientes: 2,
        gastosSalud: 1000000,
        pagosVivienda: 3000000,
      };

      const deducciones = calcularDeducciones(params);

      expect(deducciones.dependientes).toBe(CONSTANTES.DEDUCIBLE_DEPENDIENTES * 2);
      expect(deducciones.salud).toBe(1000000);
      expect(deducciones.vivienda).toBe(3000000);
      expect(deducciones.totalDeducciones).toBe(
        deducciones.dependientes + deducciones.salud + deducciones.vivienda
      );
    });

    it('debe manejar parámetros opcionales', () => {
      const deducciones = calcularDeducciones({});

      expect(deducciones.dependientes).toBe(0);
      expect(deducciones.salud).toBe(0);
      expect(deducciones.vivienda).toBe(0);
      expect(deducciones.totalDeducciones).toBe(0);
    });

    it('debe aplicar límites máximos', () => {
      const params = {
        numeroDependientes: 2,
        gastosSalud: CONSTANTES.DEDUCIBLE_SALUD * 10,
        pagosVivienda: CONSTANTES.MAXIMO_DEDUCIBLE_VIVIENDA * 10,
      };

      const deducciones = calcularDeducciones(params);

      expect(deducciones.salud).toBe(CONSTANTES.DEDUCIBLE_SALUD);
      expect(deducciones.vivienda).toBe(CONSTANTES.MAXIMO_DEDUCIBLE_VIVIENDA);
    });
  });
});
