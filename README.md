# Tributos-CO 🇨🇴

Paquete npm para calcular recargos salariales, horas extras, prestaciones sociales, seguridad social y otros tributos aplicables en Colombia (Actualizado a normativa 2026).

## Características
- ✅ **Cálculo de Recargos:** Horas extras diurnas, nocturnas, recargos nocturnos, dominicales y festivos.
- ✅ **Prestaciones Sociales:** Cesantías, prima, intereses sobre cesantías y vacaciones.
- ✅ **Seguridad Social:** Salud, pensión, ARL, caja de compensación y parafiscales.
- ✅ **Validaciones:** Salario mínimo, auxilio de transporte, salario integral y deducciones.
- ✅ **Jornada Flexible:** Ajuste automático de horas mensuales según la Ley 2101 de 2021 (Reducción de jornada a partir del 15 de julio 2026).
- ✅ **Todas las combinaciones:** Extra diurna, extra nocturna, dominical, extra diurna dominical, extra nocturna dominical.
- ✅ **TypeScript:** Tipado fuerte para evitar errores en cálculos financieros.
- ✅ **Normativa actualizada 2026:** Recargo dominical/festivo del 80%.

## Instalación
```bash
npm install tributos-co
```

## Uso Rápido

### Calcular Hora Ordinaria

```typescript
import { calcularHoraOrdinaria } from 'tributos-co'

const salario = 1750905; // SMLMV 2026
const valorHora = calcularHoraOrdinaria(salario)
console.log(valorHora); // 7958.66
```

### Calcular Horas con Recargos

```typescript
import {
  calcularHoraExtraDiurna,
  calcularHoraExtraNocturna,
  calcularHoraOrdinariaNocturna,
  calcularHoraDominicalFestiva,
  calcularHoraExtraDiurnaDominical,
  calcularHoraExtraNocturnaDominical
} from 'tributos-co';

const salario = 2000000;

// Hora extra diurna (6am - 7pm): +25%
const horaExtraDiurna = calcularHoraExtraDiurna(salario)

// Hora extra nocturna (7pm - 6am): +75%
const horaExtraNocturna = calcularHoraExtraNocturna(salario)

// Hora ordinaria nocturna: +35%
const horaOrdinariaNocturna = calcularHoraOrdinariaNocturna(salario)

// Hora dominical/festiva: +80%
const horaDominical = calcularHoraDominicalFestiva(salario)

// Hora extra diurna dominical: +105%
const horaExtraDiurnaDominical = calcularHoraExtraDiurnaDominical(salario)

// Hora extra nocturna dominical: +155%
const horaExtraNocturnaDominical = calcularHoraExtraNocturnaDominical(salario)
```

### Calcular Recargos Totales

```typescript
import { calcularRecargosSalariales } from 'tributos-co';

const resultado = calcularRecargosSalariales(2000000, {
  extrasDiurnas: 5,           // 5 horas extras diurnas
  extrasNocturnas: 3,         // 3 horas extras nocturnas
  recargoNocturno: 4,         // 4 horas ordinarias nocturnas
  festivasDiurnas: 8,         // 8 horas ordinarias en domingo
  extrasDiurnasDominicales: 2,   // 2 horas extras diurnas en domingo
  extrasNocturnasDominicales: 1  // 1 hora extra nocturna en domingo
});

console.log(resultado);
/*
{
  vho: 9090.91,              // Valor hora ordinaria
  detalle: {
    extrasDiurnas: 11363.64,
    extrasNocturnas: 20454.55,
    recargoNocturno: 12727.27,
    festivasDiurnas: 58181.82,
    extrasDiurnasDominicales: 37272.73,
    extrasNocturnasDominicales: 23181.82
  },
  totalRecargos: 163181.83,
  totalNomina: 2163181.83
}
*/
```

### Constantes Disponibles

```typescript
import { CONSTANTES, TASAS_RECARGO } from 'tributos-co';

console.log(CONSTANTES.SMLMV);              // 1750905
console.log(CONSTANTES.AUX_TRANSPORTE);     // 249095
console.log(CONSTANTES.UVT);                // 52374
console.log(CONSTANTES.MINIMO_INTEGRAL);    // 22761765 (13 SMLMV)
console.log(CONSTANTES.DOS_MINIMOS);        // 3501810
console.log(CONSTANTES.CUATRO_MINIMOS);     // 7003620

console.log(TASAS_RECARGO.EXTRA_DIURNA);              // 0.25
console.log(TASAS_RECARGO.EXTRA_NOCTURNA);            // 0.75
console.log(TASAS_RECARGO.RECARGO_NOCTURNO);          // 0.35
console.log(TASAS_RECARGO.DOMINICAL_FESTIVO);         // 0.8
console.log(TASAS_RECARGO.EXTRA_DIURNA_DOMINICAL);    // 2.05
console.log(TASAS_RECARGO.EXTRA_NOCTURNA_DOMINICAL);  // 2.55
```

### Calcular Prestaciones Sociales

```typescript
import { calcularPrestacionesSociales } from 'tributos-co';

const salario = 2000000;
const prestaciones = calcularPrestacionesSociales(salario);

console.log(prestaciones);
/*
{
  cesantias: 166666.67,      // 8.33% mensual
  prima: 166666.67,          // 8.33% mensual
  interesesCesantias: 240000, // 12% anual sobre cesantías
  vacaciones: 83333.33,      // 4.17% mensual
  totalMensual: 416666.67,
  totalAnual: 5240000
}
*/
```

### Calcular Seguridad Social

```typescript
import { calcularSeguridadSocial, calcularParafiscales } from 'tributos-co';

const salario = 2000000;

// Seguridad Social
const seguridadSocial = calcularSeguridadSocial(salario, 1); // Riesgo ARL tipo 1

console.log(seguridadSocial);
/*
{
  ibc: 2000000,
  saludEmpleado: 80000,      // 4%
  saludEmpleador: 170000,    // 8.5%
  totalSalud: 250000,        // 12.5%
  pensionEmpleado: 80000,    // 4%
  pensionEmpleador: 240000,  // 12%
  totalPension: 320000,      // 16%
  arl: 10440,                // 0.522% (Riesgo I)
  totalEmpleado: 160000,     // Descuento al empleado
  totalEmpleador: 420440,    // Costo para empleador
  totalSeguridadSocial: 580440
}
*/

// Parafiscales
const parafiscales = calcularParafiscales(salario);

console.log(parafiscales);
/*
{
  cajaCompensacion: 80000,   // 4%
  icbf: 60000,               // 3% (si salario > 10 SMLMV, sino 0)
  sena: 40000,               // 2% (si salario > 10 SMLMV, sino 0)
  totalParafiscales: 180000,
  exentoIcbfSena: false
}
*/
```

### Validaciones y Deducciones

```typescript
import { 
  validarSalarioMinimo,
  tieneDerechoAuxilioTransporte,
  esSalarioIntegral,
  calcularDeducciones,
  puedeRecibirValesExentos
} from 'tributos-co';

const salario = 2000000;

// Validaciones
console.log(validarSalarioMinimo(salario));          // true
console.log(tieneDerechoAuxilioTransporte(salario)); // true (si <= 2 SMLMV)
console.log(esSalarioIntegral(salario));             // false (< 13 SMLMV)
console.log(puedeRecibirValesExentos(salario));      // true (si anual <= 310 UVT)

// Deducciones
const deducciones = calcularDeducciones({
  numeroDependientes: 2,
  gastosSalud: 2000000,
  pagosVivienda: 6000000
});

console.log(deducciones);
/*
{
  dependientes: 3352000,     // 32 UVT x 2
  salud: 1676000,            // máximo 32 UVT
  vivienda: 5237000,         // máximo 100 UVT
  totalDeducciones: 10265000
}
*/
```

#### ℹ️ ¿Por qué están incluidas las deducciones de salud y vivienda?

Estas deducciones están incluidas porque afectan el **costo total de nómina** y ayudan a estimar el **salario neto real** del empleado:

**Deducción por Salud (máximo 32 UVT = $1,676,000 anuales):**
- Gastos médicos, medicamentos, seguros de salud
- Incluye pagos por medicina prepagada
- Reduce la base para cálculo de retención en la fuente
- **Uso en nómina:** Permite estimar cuánto recibirá efectivamente el empleado

**Deducción por Vivienda (máximo 100 UVT = $5,237,400 anuales):**
- Intereses de crédito hipotecario
- Arrendamiento de vivienda de habitación
- Impuesto predial
- **Uso en nómina:** Ayuda a calcular el salario neto disponible para el empleado

> **Nota:** Estas deducciones son **informativas** y sirven para estimar el impacto de retención en la fuente en el salario del empleado. Este paquete NO calcula directamente la retención en la fuente, ya que su enfoque principal es el **cálculo de costos laborales para el empleador** (prestaciones, seguridad social y recargos salariales).

## Reforma Laboral 2026

El paquete tiene en cuenta la reforma laboral que entra en vigencia el 15 de julio de 2026, la cual reduce la jornada laboral de 48 a 42 horas semanales:

- Antes del 15 de julio de 2026: 220 horas mensuales
- Desde el 15 de julio de 2026: 210 horas mensuales

```typescript
const fechaAntes = new Date('2026-07-10');
const fechaDespues = new Date('2026-07-20');

const horaAntes = calcularHoraOrdinaria(2000000, fechaAntes);   // 9090.91
const horaDespues = calcularHoraOrdinaria(2000000, fechaDespues); // 9523.81
```

## Tipos de Recargos según Normativa Colombiana

| Tipo de Hora | Horario | Recargo | Función |
|--------------|---------|---------|---------|
| Extra Diurna | 6am - 7pm | +25% | `calcularHoraExtraDiurna` |
| Extra Nocturna | 7pm - 6am | +75% | `calcularHoraExtraNocturna` |
| Ordinaria Nocturna | 7pm - 6am | +35% | `calcularHoraOrdinariaNocturna` |
| Dominical/Festiva | Domingo/Festivo | +80% | `calcularHoraDominicalFestiva` |
| Extra Diurna Dominical - 1/ene al 30/jun 2026 | Domingo/Festivo 6am-7pm | +105% | `calcularHoraExtraDiurnaDominical` |
 Extra Nocturna Dominical - 1/ene al 30/jun 2026 | Domingo/Festivo 7pm-6am | +115% | `calcularHoraExtraNocturnaDominical` |
| Extra Diurna Dominical - 1/jul al 31/dic 2026| Domingo/Festivo 6am-7pm | +155% | `calcularHoraExtraDiurnaDominical` |
| Extra Nocturna Dominical - 1/jul al 31/dic 2026 | Domingo/Festivo 7pm-6am | +165% | `calcularHoraExtraNocturnaDominical` |

## API Completa

### Funciones de Horas y Recargos

#### `calcularHoraOrdinaria(salario, fecha?)`
Calcula el valor de la hora ordinaria.

**Parámetros:**
- `salario`: Salario mensual del trabajador
- `fecha`: (Opcional) Fecha de referencia (default: hoy)

**Retorna:** `number` - Valor de la hora ordinaria

#### `calcularHoraExtraDiurna(salario, fecha?)`
Calcula el valor de la hora extra diurna (+25%).

#### `calcularHoraExtraNocturna(salario, fecha?)`
Calcula el valor de la hora extra nocturna (+75%).

#### `calcularHoraOrdinariaNocturna(salario, fecha?)`
Calcula el valor de la hora ordinaria nocturna (+35%).

#### `calcularHoraDominicalFestiva(salario, fecha?)`
Calcula el valor de la hora dominical/festiva (+80%).

#### `calcularHoraExtraDiurnaDominical(salario, fecha?)`
Calcula el valor de la hora extra diurna dominical (+105%).

#### `calcularHoraExtraNocturnaDominical(salario, fecha?)`
Calcula el valor de la hora extra nocturna dominical (+155%).

#### `calcularRecargosSalariales(salario, items, fecha?)`
Calcula todos los recargos salariales.

**Parámetros:**
- `salario`: Salario mensual base
- `items`: Objeto `RecargosInput` con las horas trabajadas
- `fecha`: (Opcional) Fecha de referencia

**Retorna:** Objeto con:
- `vho`: Valor hora ordinaria
- `detalle`: Desglose de cada recargo
- `totalRecargos`: Suma de todos los recargos
- `totalNomina`: Salario + recargos

### Funciones de Prestaciones Sociales

#### `calcularCesantias(salario)`
Calcula las cesantías mensuales (8.33%).

#### `calcularPrima(salario)`
Calcula la prima de servicios mensual (8.33%).

#### `calcularInteresesCesantias(salario, meses?)`
Calcula los intereses sobre cesantías (12% anual).

#### `calcularVacaciones(salario)`
Calcula las vacaciones mensuales (4.17% - 15 días por año).

#### `calcularPrestacionesSociales(salario, mesesTrabajados?)`
Calcula todas las prestaciones sociales.

**Retorna:** Objeto `PrestacionesSociales` con cesantías, prima, intereses, vacaciones y totales.

#### `calcularSalarioBasePrestaciones(salario)`
Calcula el salario base para prestaciones (incluye auxilio de transporte si aplica).

### Funciones de Seguridad Social

#### `calcularIBC(salario)`
Calcula el Ingreso Base de Cotización para seguridad social.

#### `obtenerTasaARL(riesgo)`
Obtiene la tasa de ARL según el tipo de riesgo (1-5).

#### `calcularSeguridadSocial(salario, riesgoARL?)`
Calcula todos los aportes a seguridad social.

**Parámetros:**
- `salario`: Salario mensual base
- `riesgoARL`: Tipo de riesgo (1-5, default: 1)

**Retorna:** Objeto `SeguridadSocial` con detalle de salud, pensión, ARL y totales.

#### `calcularParafiscales(salario)`
Calcula los aportes parafiscales (Caja Compensación, ICBF, SENA).

**Retorna:** Objeto `Parafiscales` con detalle de cada aporte.

#### `calcularCostoTotalSeguridadSocial(salario, riesgoARL?)`
Calcula el costo total de seguridad social y parafiscales para el empleador.

#### `calcularSalarioNeto(salario, riesgoARL?)`
Calcula el salario neto después de deducciones de seguridad social.

### Funciones de Validaciones y Deducciones

#### `validarSalarioMinimo(salario)`
Valida si un salario cumple con el mínimo legal.

#### `tieneDerechoAuxilioTransporte(salario)`
Verifica si el trabajador tiene derecho a auxilio de transporte (≤ 2 SMLMV).

#### `estaExentoIcbfSena(salario)`
Verifica si está exento de ICBF y SENA (≤ 10 SMLMV).

#### `esSalarioIntegral(salario)`
Verifica si es salario integral (≥ 13 SMLMV).

#### `puedeRecibirValesExentos(salario)`
Verifica si puede recibir vales de alimentación exentos (anual ≤ 310 UVT).

#### `requiereDotacion(salario)`
Verifica si el trabajador requiere dotación (≤ 2 SMLMV).

#### `calcularDeducciones(params)`
Calcula todas las deducciones fiscales permitidas.

**Parámetros:**
- `params.numeroDependientes`: Número de dependientes
- `params.gastosSalud`: Gastos en salud
- `params.pagosVivienda`: Pagos por vivienda

**Retorna:** Objeto `Deducciones` con detalle de cada deducción.

#### `calcularDeduccionDependientes(numeroDependientes)`
Calcula deducción por dependientes (32 UVT por dependiente).

#### `calcularDeduccionSalud(gastosSalud)`
Calcula deducción por salud (máximo 32 UVT).

#### `calcularDeduccionVivienda(pagosVivienda)`
Calcula deducción por vivienda (máximo 100 UVT).

#### `calcularMontoMaximoVales(salario)`
Calcula el monto máximo mensual de vales exentos (41 UVT anuales).

### Tipos

#### `RecargosInput`
```typescript
interface RecargosInput {
  extrasDiurnas?: number;              // Horas extras diurnas
  extrasNocturnas?: number;            // Horas extras nocturnas
  recargoNocturno?: number;            // Horas ordinarias nocturnas
  festivasDiurnas?: number;            // Horas ordinarias dominicales/festivas
  extrasDiurnasDominicales?: number;   // Horas extras diurnas dominicales
  extrasNocturnasDominicales?: number; // Horas extras nocturnas dominicales
}
```

#### `PrestacionesSociales`
```typescript
interface PrestacionesSociales {
  cesantias: number;
  prima: number;
  interesesCesantias: number;
  vacaciones: number;
  totalMensual: number;
  totalAnual: number;
}
```

#### `SeguridadSocial`
```typescript
interface SeguridadSocial {
  ibc: number;
  saludEmpleado: number;
  saludEmpleador: number;
  totalSalud: number;
  pensionEmpleado: number;
  pensionEmpleador: number;
  totalPension: number;
  arl: number;
  totalEmpleado: number;
  totalEmpleador: number;
  totalSeguridadSocial: number;
}
```

#### `Parafiscales`
```typescript
interface Parafiscales {
  cajaCompensacion: number;
  icbf: number;
  sena: number;
  totalParafiscales: number;
  exentoIcbfSena: boolean;
}
```

#### `Deducciones`
```typescript
interface Deducciones {
  dependientes: number;
  salud: number;
  vivienda: number;
  totalDeducciones: number;
}
```

#### `TipoRiesgoARL`
```typescript
type TipoRiesgoARL = 1 | 2 | 3 | 4 | 5;
```

## Licencia

ISC

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request en el repositorio.
