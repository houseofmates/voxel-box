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

### 7. Phase 2 Specific Interactions
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| Sand + Heat | Molten Glass + Empty | 10% | Melting |
| Concrete Powder + Water | Concrete + Empty | 100% | Hardening |
| Dirt + Water | Mud + Mud | 50% | Wetting |
| Mud + Heat | Dirt + Steam | 10% | Drying |
| Gunpowder + Fire | Explosion + Smoke | 100% | Ignition |
| Thermite + Heat | Molten Iron + Slag | 100% | Intense Reaction |
| Void + Any | Empty + Empty | 100% | Erasure |
| Antimatter + Any | Smoke + Empty | 100% | Annihilation |
| Chlorine + Hydrogen | Explosion + Fire | 20% | Photochemical |
| Acid + Life | Meat + Poison Gas | 20% | Dissolving |
| Virus + Life | Virus + Virus | 10% | Infection |
| Cancer + Life | Cancer + Cancer | 5% | Growth |

### 8. Part 3 Additional Interaction Chains
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| Water + Plasma | Steam + Empty | 100% | Rapid cooling/quench |
| Water + Cold Fire | Ice + Empty | 50% | Freezing |
| Salt Water + Heat | Salt + Steam | 10% | Evaporation |
| Sand + Lava | Molten Glass + Lava | 10% | High heat melting |
| Sand + Plasma | Molten Glass + Plasma | 50% | Ionized melting |
| TNT + Fire | Explosion + Smoke | 100% | Detonation |
| C4 + Electricity | Explosion + Smoke | 100% | Electronic trigger |
| Nitroglycerin + Impact | Explosion + Fire | 50% | Shock sensitive |
| Acid + Metal | Salt + Hydrogen | 5% | Corrosion |
| Acid + Meat | Poison Gas + Water | 10% | Decomposition |
| Acid + Plant | Poison Gas + Water | 10% | Dissolving |
| Plasma + Any | Plasma + Fire | 5% | Ionization/Heating |
| Cold Fire + Oil | Wax + Empty | 20% | Solidification |
| CLF3 + Any | Fire + Smoke | 100% | Hypergolic reaction |
