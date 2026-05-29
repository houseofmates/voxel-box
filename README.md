<h1 align="center">voxel-box</h1>

<p align="center">
  <strong>a voxel-based falling-sand particle simulation inspired by sandboxels</strong><br>
  built as a material library and interaction system for the voxel-box project.
</p>

<p align="center">
  <a href="#key-differences-from-sandboxels">key differences</a> •
  <a href="#repository-contents">repository contents</a> •
  <a href="#license">license</a>
</p>

<hr>

<h2 align="center" id="key-differences-from-sandboxels">key differences from sandboxels</h2>

- built as a modular material definition system for use in the voxel-box codebase
- uses voxel-box's material state system (solid=0, liquid=1, gas=2, powder=3, fire=4, electricity=5)
- integrates with voxel-box's existing human simulation and rendering pipeline
- focuses on clean integration without visual streaks or discoloration issues
- designed to work with voxel-box's fixed backfill and drowning mechanics
- material definitions are formatted for direct consumption by voxel-box's `engine.jsx`
- reaction system adapted to voxel-box's `neighborReactions` function
- includes specific properties like thermal conductivity, electrical conductivity, flammability, etc.
- organized into categories for sidebar tab ui (liquids, gases, powders, solids, walls, special)
- does not include sandboxels' hidden elements by default (can be enabled via configuration)
- uses voxel-box's `rng()` function for randomness instead of `Math.random()`
- designed for performance within the existing update loop
- excludes sandboxels' complex custom tick functions where they conflict with the `updateCell` lifecycle; such behaviors are adapted to voxel-box's update mechanisms or implemented as special case handlers

<hr>

<h2 align="center" id="repository-contents">repository contents</h2>

- **materials.jsx** — complete material definition templates for converting sandboxels elements to voxel-box format
- **behavior_guidelines.md** — guidelines for adapting sandboxels behaviors to voxel-box's movement system
- **reaction_rules.md** — comprehensive list of reaction conversion rules for `neighborReactions`
- **category_organization.json** — ui implementation notes for sidebar tab material categories
- **special_properties.md** — handling instructions for special properties like `stain`, `burnInto`, `fireColor`, etc.
- **temperature_guide.md** — detailed notes on the temperature system and state change thresholds
- **implementation_notes.md** — performance considerations and special case handling

<hr>

<h2 align="center" id="license">license</h2>

<div align="center">
  <p>this software incorporates code from r74n <a href="https://github.com/r74ncom/sandboxels">https://github.com/r74ncom/sandboxels</a>, which is governed by the r74n content license and must be credited and adhered to as a condition of use for these specific components, however, this particular project is licensed under <a href="./LICENSE">mates license</a> with that particular caveat.</p>
</div>