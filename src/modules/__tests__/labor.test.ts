import {
  calcularHoraOrdinaria,
  calcularHoraExtraDiurna,
  calcularHoraExtraNocturna,
  calcularHoraOrdinariaNocturna,
  calcularHoraDominicalFestiva,
  calcularHoraExtraDiurnaDominical,
  calcularHoraExtraNocturnaDominical,
  calcularRecargosSalariales,
} from '../labor';

describe('Cálculos de Horas Laborales', () => {
  const salario = 2000000;
  const fechaAntes = new Date('2026-07-10');
  const fechaDespues = new Date('2026-07-20');

  describe('calcularHoraOrdinaria', () => {
    it('debe calcular correctamente la hora ordinaria antes del 15 de julio 2026', () => {
      const resultado = calcularHoraOrdinaria(salario, fechaAntes);
      expect(resultado).toBeCloseTo(9090.91, 2);
    });

    it('debe calcular correctamente la hora ordinaria después del 15 de julio 2026', () => {
      const resultado = calcularHoraOrdinaria(salario, fechaDespues);
      expect(resultado).toBeCloseTo(9523.81, 2);
    });

    it('debe usar la fecha actual si no se proporciona', () => {
      const resultado = calcularHoraOrdinaria(salario);
      expect(resultado).toBeGreaterThan(0);
    });

    it('debe calcular con SMLMV 2026', () => {
      const smlmv = 1750905;
      const resultado = calcularHoraOrdinaria(smlmv, fechaAntes);
      expect(resultado).toBeCloseTo(7958.66, 2);
    });
  });

  describe('calcularHoraExtraDiurna', () => {
    it('debe aplicar recargo del 25% sobre hora ordinaria', () => {
      const vho = calcularHoraOrdinaria(salario, fechaAntes);
      const resultado = calcularHoraExtraDiurna(salario, fechaAntes);
      expect(resultado).toBeCloseTo(vho * 1.25, 2);
    });

    it('debe calcular correctamente para 2M de salario', () => {
      const resultado = calcularHoraExtraDiurna(salario, fechaAntes);
      expect(resultado).toBeCloseTo(11363.64, 2);
    });
  });

  describe('calcularHoraExtraNocturna', () => {
    it('debe aplicar recargo del 75% sobre hora ordinaria', () => {
      const vho = calcularHoraOrdinaria(salario, fechaAntes);
      const resultado = calcularHoraExtraNocturna(salario, fechaAntes);
      expect(resultado).toBeCloseTo(vho * 1.75, 2);
    });

    it('debe calcular correctamente para 2M de salario', () => {
      const resultado = calcularHoraExtraNocturna(salario, fechaAntes);
      expect(resultado).toBeCloseTo(15909.09, 2);
    });
  });

  describe('calcularHoraOrdinariaNocturna', () => {
    it('debe aplicar recargo del 35% sobre hora ordinaria', () => {
      const vho = calcularHoraOrdinaria(salario, fechaAntes);
      const resultado = calcularHoraOrdinariaNocturna(salario, fechaAntes);
      expect(resultado).toBeCloseTo(vho * 1.35, 2);
    });

    it('debe calcular correctamente para 2M de salario', () => {
      const resultado = calcularHoraOrdinariaNocturna(salario, fechaAntes);
      expect(resultado).toBeCloseTo(12272.73, 2);
    });
  });

  describe('calcularHoraDominicalFestiva', () => {
    it('debe aplicar recargo del 80% sobre hora ordinaria', () => {
      const vho = calcularHoraOrdinaria(salario, fechaAntes);
      const resultado = calcularHoraDominicalFestiva(salario, fechaAntes);
      expect(resultado).toBeCloseTo(vho * 1.8, 2);
    });

    it('debe calcular correctamente para 2M de salario', () => {
      const resultado = calcularHoraDominicalFestiva(salario, fechaAntes);
      expect(resultado).toBeCloseTo(16363.64, 2);
    });
  });

  describe('calcularHoraExtraDiurnaDominical', () => {
    it('debe aplicar recargo del 105% sobre hora ordinaria (25% + 80%)', () => {
      const vho = calcularHoraOrdinaria(salario, fechaAntes);
      const resultado = calcularHoraExtraDiurnaDominical(salario, fechaAntes);
      expect(resultado).toBeCloseTo(vho * 2.05, 2);
    });

    it('debe calcular correctamente para 2M de salario', () => {
      const resultado = calcularHoraExtraDiurnaDominical(salario, fechaAntes);
      expect(resultado).toBeCloseTo(18636.36, 2);
    });
  });

  describe('calcularHoraExtraNocturnaDominical', () => {
    it('debe aplicar recargo del 155% sobre hora ordinaria (75% + 80%)', () => {
      const vho = calcularHoraOrdinaria(salario, fechaAntes);
      const resultado = calcularHoraExtraNocturnaDominical(salario, fechaAntes);
      expect(resultado).toBeCloseTo(vho * 2.55, 2);
    });

    it('debe calcular correctamente para 2M de salario', () => {
      const resultado = calcularHoraExtraNocturnaDominical(salario, fechaAntes);
      expect(resultado).toBeCloseTo(23181.82, 2);
    });
  });

  describe('calcularRecargosSalariales', () => {
    it('debe calcular todos los recargos correctamente', () => {
      const resultado = calcularRecargosSalariales(salario, {
        extrasDiurnas: 5,
        extrasNocturnas: 3,
        recargoNocturno: 4,
        festivasDiurnas: 8,
        extrasDiurnasDominicales: 2,
        extrasNocturnasDominicales: 1,
      }, fechaAntes);

      expect(resultado.vho).toBeCloseTo(9090.91, 2);
      expect(resultado.detalle.extrasDiurnas).toBeCloseTo(11363.64, 2);
      expect(resultado.detalle.extrasNocturnas).toBeCloseTo(20454.55, 2);
      expect(resultado.detalle.recargoNocturno).toBeCloseTo(12727.27, 2);
      expect(resultado.detalle.festivasDiurnas).toBeCloseTo(58181.82, 2);
      expect(resultado.detalle.extrasDiurnasDominicales).toBeCloseTo(37272.73, 2);
      expect(resultado.detalle.extrasNocturnasDominicales).toBeCloseTo(23181.82, 2);
      expect(resultado.totalRecargos).toBeCloseTo(163181.82, 1);
      expect(resultado.totalNomina).toBeCloseTo(2163181.82, 1);
    });

    it('debe manejar valores opcionales (sin proporcionar horas)', () => {
      const resultado = calcularRecargosSalariales(salario, {}, fechaAntes);
      
      expect(resultado.vho).toBeCloseTo(9090.91, 2);
      expect(resultado.totalRecargos).toBe(0);
      expect(resultado.totalNomina).toBe(salario);
    });

    it('debe calcular solo horas extras diurnas', () => {
      const resultado = calcularRecargosSalariales(salario, {
        extrasDiurnas: 10,
      }, fechaAntes);

      expect(resultado.detalle.extrasDiurnas).toBeCloseTo(22727.27, 2);
      expect(resultado.totalRecargos).toBeCloseTo(22727.27, 2);
      expect(resultado.totalNomina).toBeCloseTo(2022727.27, 2);
    });

    it('debe calcular con la fecha actual por defecto', () => {
      const resultado = calcularRecargosSalariales(salario, {
        extrasDiurnas: 5,
      });

      expect(resultado.vho).toBeGreaterThan(0);
      expect(resultado.totalRecargos).toBeGreaterThan(0);
    });

    it('debe reflejar el cambio de horas mensuales después del 15 de julio', () => {
      const resultadoAntes = calcularRecargosSalariales(salario, {
        extrasDiurnas: 10,
      }, fechaAntes);

      const resultadoDespues = calcularRecargosSalariales(salario, {
        extrasDiurnas: 10,
      }, fechaDespues);

      // El valor después debe ser mayor porque hay menos horas mensuales
      expect(resultadoDespues.vho).toBeGreaterThan(resultadoAntes.vho);
      expect(resultadoDespues.totalRecargos).toBeGreaterThan(resultadoAntes.totalRecargos);
    });

    it('debe calcular correctamente con múltiples tipos de recargos', () => {
      const resultado = calcularRecargosSalariales(salario, {
        extrasDiurnas: 2,
        festivasDiurnas: 4,
      }, fechaAntes);

      const vho = 9090.91;
      const expectedExtrasDiurnas = 2 * vho * 0.25;
      const expectedFestivas = 4 * vho * 0.8;
      
      expect(resultado.detalle.extrasDiurnas).toBeCloseTo(expectedExtrasDiurnas, 2);
      expect(resultado.detalle.festivasDiurnas).toBeCloseTo(expectedFestivas, 2);
      expect(resultado.totalRecargos).toBeCloseTo(expectedExtrasDiurnas + expectedFestivas, 2);
    });
  });

  describe('Casos extremos', () => {
    it('debe manejar salario 0', () => {
      const resultado = calcularHoraOrdinaria(0);
      expect(resultado).toBe(0);
    });

    it('debe manejar salarios muy altos', () => {
      const salarioAlto = 50000000;
      const resultado = calcularHoraOrdinaria(salarioAlto, fechaAntes);
      expect(resultado).toBeCloseTo(227272.73, 2);
    });

    it('debe calcular recargos con 0 horas', () => {
      const resultado = calcularRecargosSalariales(salario, {
        extrasDiurnas: 0,
        extrasNocturnas: 0,
      }, fechaAntes);

      expect(resultado.totalRecargos).toBe(0);
    });
  });
});
