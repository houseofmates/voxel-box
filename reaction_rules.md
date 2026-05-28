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
| MAT.WATER + MAT.FIRE | MAT.STEAM + MAT.EMPTY | 100% | water extinguishes fire |
| MAT.WATER + MAT.LAVA | MAT.STONE + MAT.STEAM | 20% | lava cooling |
| MAT.WATER + MAT.MAGMA | MAT.STONE + MAT.STEAM | 20% | magma cooling |
| MAT.WATER + MAT.PLASMA | MAT.STEAM + MAT.EMPTY | 100% | rapid cooling/quench |
| MAT.WATER + MAT.COLD_FIRE | MAT.ICE + MAT.EMPTY | 50% | water freezing |

### 2. Acidic Reactions (Corrosion)
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| MAT.ACID + MAT.METAL | MAT.SALT + MAT.HYDROGEN | 5% | slow corrosion of metal |
| MAT.ACID + MAT.IRON | MAT.SALT + MAT.HYDROGEN | 5% | slow corrosion of iron |
| MAT.ACID + MAT.STEEL | MAT.SALT + MAT.HYDROGEN | 5% | slow corrosion of steel |
| MAT.ACID + MAT.STONE | MAT.SAND + MAT.CARBON_DIOXIDE | 2% | material breakdown |
| MAT.ACID + MAT.WOOD | MAT.ASH + MAT.SMOKE | 10% | chemical burn |
| MAT.ACID + MAT.PLANT | MAT.POISON_GAS + MAT.WATER | 10% | acid dissolving plant |
| MAT.ACID + MAT.GRASS | MAT.POISON_GAS + MAT.WATER | 10% | acid dissolving grass |
| MAT.ACID + MAT.ALGAE | MAT.POISON_GAS + MAT.WATER | 10% | acid dissolving algae |
| MAT.ACID + MAT.MUSHROOM | MAT.POISON_GAS + MAT.WATER | 10% | acid dissolving mushroom |
| MAT.ACID + MAT.MEAT | MAT.POISON_GAS + MAT.WATER | 10% | acid dissolving meat |

### 3. Combustion & Temperature
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| MAT.FIRE + MAT.WOOD | MAT.FIRE + MAT.FIRE | 10% | fire spread to wood |
| MAT.FIRE + MAT.OIL | MAT.FIRE + MAT.FIRE | 50% | fire spread to oil |
| MAT.FIRE + MAT.METHANE | MAT.EXPLOSIVE + MAT.FIRE | 100% | gas ignition (triggers explosive state) |
| MAT.FIRE + MAT.PROPANE | MAT.EXPLOSIVE + MAT.FIRE | 100% | gas ignition |
| MAT.FIRE + MAT.HYDROGEN | MAT.EXPLOSIVE + MAT.FIRE | 100% | gas ignition |

### 4. Electricity & Electrolysis
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| MAT.ELECTRICITY + MAT.WATER | MAT.HYDROGEN + MAT.OXYGEN | 1% | bubbling water |
| MAT.ELECTRICITY + MAT.SALTWATER | MAT.CHLORINE + MAT.HYDROGEN | 2% | chemical electrolysis |
| MAT.ELECTRICITY + MAT.C4 | MAT.EXPLOSIVE + MAT.SMOKE | 100% | electronic trigger |

### 5. Biological/Growth
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| MAT.SEED + MAT.WATER | MAT.PLANT + MAT.WATER | 5% | germination |
| MAT.PLANT + MAT.WATER | MAT.PLANT + MAT.PLANT | 1% | growth spread |
| MAT.PLANT + MAT.FIRE | MAT.FIRE + MAT.SMOKE | 20% | plant burning |
| MAT.VIRUS + MAT.PLANT | MAT.VIRUS + MAT.VIRUS | 10% | virus infection (plant) |
| MAT.VIRUS + MAT.GRASS | MAT.VIRUS + MAT.VIRUS | 10% | virus infection (grass) |
| MAT.VIRUS + MAT.ALGAE | MAT.VIRUS + MAT.VIRUS | 10% | virus infection (algae) |
| MAT.VIRUS + MAT.MUSHROOM | MAT.VIRUS + MAT.VIRUS | 10% | virus infection (mushroom) |
| MAT.VIRUS + MAT.MEAT | MAT.VIRUS + MAT.VIRUS | 10% | virus infection (meat) |
| MAT.CANCER + MAT.PLANT | MAT.CANCER + MAT.CANCER | 5% | cancer growth (plant) |
| MAT.CANCER + MAT.MEAT | MAT.CANCER + MAT.CANCER | 5% | cancer growth (meat) |

### 6. Mixing & Solutions
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| MAT.WATER + MAT.SALT | MAT.SALTWATER + MAT.SALTWATER | 10% | salt dissolving |
| MAT.WATER + MAT.MUD | MAT.MUD + MAT.MUD | 10% | mud wetting |
| MAT.WATER + MAT.DIRT | MAT.MUD + MAT.MUD | 50% | dirt wetting |
| MAT.WATER + MAT.CONCRETE_POWDER | MAT.CONCRETE + MAT.EMPTY | 100% | concrete hardening |

### 7. Phase 2 & 3 Specific Interactions
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| MAT.SAND + MAT.FIRE | MAT.MOLTEN_GLASS + MAT.EMPTY | 10% | sand melting |
| MAT.SAND + MAT.LAVA | MAT.MOLTEN_GLASS + MAT.LAVA | 10% | sand melting |
| MAT.SAND + MAT.MAGMA | MAT.MOLTEN_GLASS + MAT.MAGMA | 10% | sand melting |
| MAT.SAND + MAT.PLASMA | MAT.MOLTEN_GLASS + MAT.PLASMA | 50% | ionized melting |
| MAT.MUD + MAT.FIRE | MAT.DIRT + MAT.STEAM | 10% | mud drying |
| MAT.MUD + MAT.LAVA | MAT.DIRT + MAT.STEAM | 10% | mud drying |
| MAT.GUNPOWDER + MAT.FIRE | MAT.EXPLOSIVE + MAT.SMOKE | 100% | gunpowder ignition |
| MAT.THERMITE + MAT.FIRE | MAT.MOLTEN_IRON + MAT.SLAG | 100% | intense thermite reaction |
| MAT.THERMITE + MAT.LAVA | MAT.MOLTEN_IRON + MAT.SLAG | 100% | intense thermite reaction |
| MAT.TNT + MAT.FIRE | MAT.EXPLOSIVE + MAT.SMOKE | 100% | tnt detonation |
| MAT.NITROGLYCERIN + MAT.FIRE | MAT.EXPLOSIVE + MAT.FIRE | 100% | nitroglycerin ignition |
| MAT.CHLORINE + MAT.HYDROGEN | MAT.EXPLOSIVE + MAT.FIRE | 20% | photochemical/explosive reaction |
| MAT.SALTWATER + MAT.FIRE | MAT.SALT + MAT.STEAM | 10% | saltwater evaporation |
| MAT.SALTWATER + MAT.LAVA | MAT.SALT + MAT.STEAM | 10% | saltwater evaporation |
| MAT.COLD_FIRE + MAT.OIL | MAT.WAX + MAT.EMPTY | 20% | oil solidification/freezing |

### 8. Special Omni-Interactions (Universal)
| Reactants | Products | Chance | Notes |
| :--- | :--- | :--- | :--- |
| MAT.VOID + [ANY] | MAT.EMPTY + MAT.EMPTY | 100% | void erases all materials (except wall) |
| MAT.ANTIMATTER + [ANY] | MAT.SMOKE + MAT.EMPTY | 100% | antimatter annihilates all materials |
| MAT.PLASMA + [ANY] | MAT.PLASMA + MAT.FIRE | 5% | plasma ionizes and heats all materials |
| MAT.CLF3 + [ANY] | MAT.FIRE + MAT.SMOKE | 100% | clf3 reacts hypergolically with all materials |
