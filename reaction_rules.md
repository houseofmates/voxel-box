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
| Sand + Fire | Glass + Empty | 10% | Melting (requires heat source) |
| Sand + Lava | Glass + Empty | 10% | Melting (high heat source) |
| Concrete Powder + Water | Concrete + Empty | 100% | Hardening |
| Dirt + Water | Mud + Mud | 50% | Wetting |
| Mud + Fire | Dirt + Steam | 10% | Drying (requires heat source) |
| Mud + Lava | Dirt + Steam | 10% | Drying (high heat source) |
| Gunpowder + Fire | Explosive + Smoke | 100% | Ignition |
| Thermite + Fire | Iron + Slag | 100% | Intense Reaction (requires heat source) |
| Thermite + Lava | Iron + Slag | 100% | Intense Reaction (high heat source) |
| Void + Plant | Empty + Empty | 100% | Erasure (biological) |
| Void + Meat | Empty + Empty | 100% | Erasure (biological) |
| Void + Grass | Empty + Empty | 100% | Erasure (biological) |
| Antimatter + Plant | Smoke + Empty | 100% | Annihilation (biological) |
| Antimatter + Meat | Smoke + Empty | 100% | Annihilation (biological) |
| Antimatter + Grass | Smoke + Empty | 100% | Annihilation (biological) |
| Chlorine + Hydrogen | Explosive + Fire | 20% | Photochemical |
| Acid + Plant | Meat + Poison Gas | 20% | Dissolving (organic) |
| Acid + Grass | Meat + Poison Gas | 20% | Dissolving (organic) |
| Virus + Plant | Virus + Virus | 10% | Infection (spreads to organic) |
| Virus + Meat | Virus + Virus | 10% | Infection (spreads to organic) |
| Cancer + Plant | Cancer + Cancer | 5% | Growth (spreads to organic) |
| Cancer + Meat | Cancer + Cancer | 5% | Growth (spreads to organic) |
