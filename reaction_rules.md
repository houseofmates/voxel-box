# Voxel-Box Reaction System

Reactions are handled in the `neighborReactions()` function. They typically occur between a material and its immediate neighbors.

## Conversion Logic
When converting from Sandboxels format:
`{ react1: "a", react2: "b", elem1: "c", elem2: "d", priority: 10 }`

Implement as:
```javascript
if ((mat === MAT.A && nmat === MAT.B) || (mat === MAT.B && nmat === MAT.A)) {
  if (rng() < 0.1) { // priority 10 = 10% chance
    set(x, y, MAT.C);
    set(nx, ny, MAT.D);
    return;
  }
}
```

---

## Core Reactions

### 1. Water & Extinguishing
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| Water + Fire | Steam + Empty | 100% | Instant douse |
| Water + Lava | Stone + Steam | 20% | Cooling |
| Water + Magma | Basalt + Steam | 20% | Cooling |

### 2. Acidic Reactions (Corrosion)
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| Acid + Metal | Salt + Hydrogen | 5% | Slow corrosion |
| Acid + Stone | Sand + CO2 | 2% | Material Breakdown |
| Acid + Wood | Ash + Smoke | 10% | Chemical burn |

### 3. Combustion & Temperature
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| Fire + Wood | Fire + Fire | 10% | Spread |
| Fire + Oil | Fire + Fire | 50% | High spread |
| Fire + Methane | Explosion + Fire | 100% | Gas ignition |

### 4. Electricity & Electrolysis
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| Electricity + Water | Hydrogen + Oxygen | 1% | Bubbling |
| Electricity + Saltwater | Chlorine + Hydrogen | 2% | Chemical |

### 5. Biological/Growth
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| Seed + Water | Plant + Water | 5% | Germination |
| Plant + Water | Plant + Plant | 1% | Growth (spread) |
| Plant + Fire | Fire + Smoke | 20% | Burning |

### 6. Mixing & Solutions
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| Water + Salt | Saltwater + Saltwater | 10% | Dissolving |
| Water + Mud | Mud + Mud | 10% | Wetting |
