# Voxel-Box Implementation Notes

This document provides additional technical details for integrating the material system into Voxel-Box.

## 1. Performance Considerations
- **Neighbor Checks**: Many reactions and thermal exchanges require checking 4-8 neighbors. To optimize, use a "dirty" flag or "active" chunk system to skip processing for stable, unchanging regions of the simulation.
- **RNG Calls**: Minimize calls to `rng()` where possible. Use a single random value for multiple low-probability checks within a single tick if they are independent.
- **State Lookup**: Cache material property lookups. Instead of `MATERIALS[getMaterial(x, y)]` multiple times, store the material definition in a local variable at the start of `updateCell`.

## 2. Potential Conflicts
- **Drowning vs. Backfill**: Ensure that the `move()` logic for liquids doesn't conflict with existing drowning mechanics for human agents. Liquids should have higher priority for "backfilling" empty spaces than solid-state powders.
- **Electricity Arcing**: Arcing can cause performance spikes if too many potential paths are checked. Limit the search radius for arcing to 2 pixels.

## 3. Special Case Handlers
- **Life Elements (Plants)**: These require a custom tick handler to grow (spread) into neighboring `EMPTY` or `DIRT` cells when `WATER` is present.
- **Explosives**: When ignited, they should not just turn to fire but trigger a recursive "explosion" function that converts a radius of non-explosion-resistant materials into `FIRE`, `SMOKE`, or `EMPTY`.
- **Slime/Viscous Liquids**: These should have a modified diffusion logic that only allows movement 10-25% of the time to simulate high viscosity.

## 4. Rendering
- **Fire Rendering**: If `fireColor` is present, the fragment shader should use it as the base tint for the fire animation.
- **Stain Application**: Stains should be rendered as a temporary color overlay rather than a permanent change to the material's identity.

## 5. Summary of Naming
All references to "Sensory", "Voxulation", or "Erosion Engine" have been replaced with **Voxel-Box** to maintain project consistency as a standalone material library.
