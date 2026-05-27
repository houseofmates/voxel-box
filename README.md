# Voxel-Box

A voxel-based falling-sand particle simulation inspired by Sandboxels, designed as a material library and interaction system for integration into the Voxel-Box project.

## Key Differences from Sandboxels

- Built as a modular material definition system for use in the Voxel-Box codebase.
- Uses Voxel-Box's material state system (solid=0, liquid=1, gas=2, powder=3, fire=4, electricity=5).
- Integrates with Voxel-Box's existing human simulation and rendering pipeline.
- Focuses on clean integration without visual streaks or discoloration issues.
- Designed to work with Voxel-Box's fixed backfill and drowning mechanics.
- Material definitions are formatted for direct consumption by Voxel-Box's engine.jsx.
- Reaction system adapted to Voxel-Box's `neighborReactions` function.
- Includes specific properties like thermal conductivity, electrical conductivity, flammability, etc.
- Organized into categories for sidebar tab UI (liquids, gases, powders, solids, walls, special).
- Does not include Sandboxels' hidden elements by default (can be enabled via configuration).
- Uses Voxel-Box's `rng()` function for randomness instead of `Math.random()`.
- Designed for performance within the existing update loop.
- Excludes Sandboxels' complex custom tick functions where they conflict with the `updateCell` lifecycle; such behaviors are adapted to Voxel-Box's update mechanisms or implemented as special case handlers.

## Repository Contents

- **materials.jsx**: Complete material definition templates for converting Sandboxels elements to Voxel-Box format.
- **behavior_guidelines.md**: Guidelines for adapting Sandboxels behaviors to Voxel-Box's movement system.
- **reaction_rules.md**: Comprehensive list of reaction conversion rules for `neighborReactions`.
- **category_organization.json**: UI implementation notes for sidebar tab material categories.
- **special_properties.md**: Handling instructions for special properties like `stain`, `burnInto`, `fireColor`, etc.
- **temperature_guide.md**: Detailed notes on the temperature system and state change thresholds.
- **implementation_notes.md**: Performance considerations and special case handling.

## License

Refer to the LICENSE file for details.
