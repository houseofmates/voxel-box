<h1 align="center">voxel-box</h1>

<p align="center">a voxel-based falling-sand particle simulation inspired by sandboxels, designed as a material library and interaction system for integration into the sensory/voxulation project.</p>

<h2 align="center">key differences from sandboxels</h2>

- built as a modular material definition system for use in existing sensory codebase
- uses sensory's material state system (solid=0, liquid=1, gas=2, powder=3, fire=4, electricity=5)
- integrates with sensory's existing human simulation and rendering pipeline
- focuses on clean integration without visual streaks or discoloration issues
- designed to work with sensory's fixed backfill and drowning mechanics
- material definitions are formatted for direct consumption by sensory's engine.jsx
- reaction system adapted to sensory's neighborReactions function
- includes sensory-specific properties like thermal conductivity, electrical conductivity, flammability, etc.
- organized into categories for sidebar tab ui (liquids, gases, powders, solids, walls, special)
- does not include sandboxels' hidden elements by default (can be enabled via configuration)
- uses sensory's rng() function for randomness instead of Math.random()
- designed for performance within sensory's existing update loop
- excludes sandboxels' complex custom tick functions where they conflict with sensory's updateCell lifecycle; such behaviors are adapted to sensory's update mechanisms or implemented as special case handlers

<h2 align="center">this repository contains</h2>

- material definition templates for converting sandboxels elements to sensory format
- guidelines for adapting sandboxels behaviors to sensory's movement system
- reaction conversion rules for neighborReactions
- ui implementation notes for sidebar tab material categories
- special property handling instructions (stain, burnInto, fireColor, etc.)

<h2 align="center">license</h2>

<div align="center">
  <a href="./license">mates license (with related r74n caveat)</a>
</div>

