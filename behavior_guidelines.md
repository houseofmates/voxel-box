# Behavior Adaptation Guidelines for Voxel-Box

This document details how to adapt Sandboxels-inspired behaviors to the Voxel-Box `move()` function in `engine.jsx`.

## State Mapping
- **0: SOLID**
- **1: LIQUID**
- **2: GAS**
- **3: POWDER**
- **4: FIRE**
- **5: ELECTRICITY**

---

## 1. LIQUIDS (state=1)
- **Primary Movement**: Fall down if the cell below is `EMPTY`.
- **Sinking/Rising**: If the cell below is another liquid, check densities. If the current liquid is denser, swap with the cell below (50% chance).
- **Horizontal Diffusion**:
  - Check diagonals below (`x-1, y+1` and `x+1, y+1`). If empty, move there.
  - **Standard Spread**: If diagonals are blocked, try moving left or right (`x-1, y` or `x+1, y`).
- **Surface Leveling**: Over time, liquids should attempt to fill any empty spaces below their current horizontal plane.

## 2. GASES (state=2)
- **Primary Movement**: Rise up if the cell above is `EMPTY`.
- **Buoyancy**: If the cell above is another gas, check densities. If the current gas is less dense, swap with the cell above (50% chance).
- **Horizontal Diffusion**:
  - Check diagonals above (`x-1, y-1` and `x+1, y-1`). If empty, move there.
- **Dispersion**: Gases should slowly spread to empty adjacent cells (`left, right, up, down`) to simulate filling a container.

## 3. POWDERS (state=3)
- **Primary Movement**: Fall down if the cell below is `EMPTY`.
- **Sliding**: If the cell below is occupied but the diagonal below (`x-1, y+1` or `x+1, y+1`) is empty, move there. This creates a natural angle of repose (~22-30 degrees).
- **Interaction with Air**: Powders can be displaced or "blown" by gas movement if implemented in the update loop.

## 4. SOLIDS (state=0)
- **Primary Movement**: Stationary by default.
- **Structural Integrity**: Most solids stay in place unless affected by gravity (if they become powders/liquids) or external forces.
- **State Changes**: Monitor temperature to transition to liquid (`meltPoint`) or gas (`boilPoint`).

## 5. FIRE (state=4)
- **Spreading**: Fire moves to adjacent (`up, down, left, right, diagonals`) flammable materials.
- **Consumption**: Reduces the "fuel" (burn time) of the material it occupies.
- **Extinguishing**: If no fuel is left or if smothered by non-gases (like water or sand), the fire state ends.
- **Heat Output**: Increases temperature of all 8 neighboring cells.

## 6. ELECTRICITY (state=5)
- **Conduction**: Moves through materials with `electricalConductivity > 0`.
- **Pathfinding**: Prefers path of least resistance (highest conductivity).
- **Arcing**: Can jump 1-2 pixel gaps to nearby conductive materials based on a voltage/chance calculation.
- **Resistance**: Generates heat in materials based on `(1 - electricalConductivity)`.
