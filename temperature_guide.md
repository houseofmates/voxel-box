# Voxel-Box Temperature System

Voxel-Box uses a temperature-based state transition system. All temperatures are in Celsius.

## Core Principles
1. **baseTemp**: The starting temperature of a material when spawned.
2. **Thermal Exchange**: Materials exchange heat with their 4 cardinal neighbors based on their `thermalConductivity`.
3. **Equilibrium**: The system moves toward thermal equilibrium with the environment (`EMPTY` cells at `baseTemp`).

## State Change Thresholds
- **meltPoint**: Solid (`state 0, 3`) -> Liquid (`state 1`).
- **boilPoint**: Liquid (`state 1`) -> Gas (`state 2`).
- **ignitePoint**: Material (`flammable: true`) -> Fire (`state 4`).

## Temperature Constants (Reference)
- **Absolute Zero**: -273.15°C
- **Freezing Water**: 0°C
- **Room Temp**: 20°C
- **Boiling Water**: 100°C
- **Fire**: 600°C - 1000°C
- **Lava**: 800°C - 1200°C

## Thermal Conductivity Examples
| Material | Conductivity |
| :--- | :--- |
| Empty (Air) | 0.02 |
| Wood | 0.15 |
| Water | 0.58 |
| Stone | 1.5 |
| Iron | 80.0 |
| Copper | 400.0 |

## Implementation Logic (per tick)
```javascript
function updateTemperature(x, y) {
  let mat = getMaterial(x, y);
  let temp = getTemp(x, y);

  // 1. Heat exchange with neighbors
  for (let neighbor of getNeighbors(x, y)) {
    let nMat = getMaterial(neighbor);
    let nTemp = getTemp(neighbor);
    let conductivity = (mat.thermalConductivity + nMat.thermalConductivity) / 2;
    let diff = (nTemp - temp) * conductivity * dt;
    adjustTemp(x, y, diff);
  }

  // 2. State transitions
  if (temp >= mat.boilPoint && mat.state !== 2) {
    set(x, y, getGasForm(mat));
  } else if (temp >= mat.meltPoint && (mat.state === 0 || mat.state === 3)) {
    set(x, y, getLiquidForm(mat));
  } else if (temp >= mat.ignitePoint && mat.flammable) {
    set(x, y, MAT.FIRE);
  }
}
```
