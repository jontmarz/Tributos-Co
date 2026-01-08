# Tributos-CO 🇨🇴

Paquete npm para calcular recargos salariales, horas extras y otros tributos aplicables en Colombia (Actualizado a normativa 2026).

## Características
- ✅ **Cálculo de Recargos:** Horas extras diurnas, nocturnas, recargos nocturnos, dominicales y festivos.
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
import { calcularHoraOrdinaria } from 'tributos-co';

const salario = 1750905; // SMLMV 2026
const valorHora = calcularHoraOrdinaria(salario);
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
const horaExtraDiurna = calcularHoraExtraDiurna(salario);

// Hora extra nocturna (7pm - 6am): +75%
const horaExtraNocturna = calcularHoraExtraNocturna(salario);

// Hora ordinaria nocturna: +35%
const horaOrdinariaNocturna = calcularHoraOrdinariaNocturna(salario);

// Hora dominical/festiva: +80%
const horaDominical = calcularHoraDominicalFestiva(salario);

// Hora extra diurna dominical: +105%
const horaExtraDiurnaDominical = calcularHoraExtraDiurnaDominical(salario);

// Hora extra nocturna dominical: +155%
const horaExtraNocturnaDominical = calcularHoraExtraNocturnaDominical(salario);
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

console.log(TASAS_RECARGO.EXTRA_DIURNA);              // 0.25
console.log(TASAS_RECARGO.EXTRA_NOCTURNA);            // 0.75
console.log(TASAS_RECARGO.RECARGO_NOCTURNO);          // 0.35
console.log(TASAS_RECARGO.DOMINICAL_FESTIVO);         // 0.8
console.log(TASAS_RECARGO.EXTRA_DIURNA_DOMINICAL);    // 2.05
console.log(TASAS_RECARGO.EXTRA_NOCTURNA_DOMINICAL);  // 2.55
```

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
| Extra Diurna | 6am - 9pm | +25% | `calcularHoraExtraDiurna` |
| Extra Nocturna | 9pm - 6am | +75% | `calcularHoraExtraNocturna` |
| Ordinaria Nocturna | 9pm - 6am | +35% | `calcularHoraOrdinariaNocturna` |
| Dominical/Festiva | Domingo/Festivo | +80% | `calcularHoraDominicalFestiva` |
| Extra Diurna Dominical | Domingo/Festivo 6am-9pm | +105% | `calcularHoraExtraDiurnaDominical` |
| Extra Nocturna Dominical | Domingo/Festivo 9pm-6am | +155% | `calcularHoraExtraNocturnaDominical` |

## API Completa

### Funciones

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

## Licencia

ISC

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request en el repositorio.
