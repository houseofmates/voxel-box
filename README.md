voxel-box
========

A voxel-based falling-sand particle simulation inspired by Sandboxels, designed as a material library and interaction system for integration into the Sensory/voxulation project.

Key differences from Sandboxels:
- Built as a modular material definition system for use in existing Sensory codebase
- Uses Sensory's material state system (solid=0, liquid=1, gas=2, powder=3, fire=4, electricity=5)
- Integrates with Sensory's existing human simulation and rendering pipeline
- Focuses on clean integration without visual streaks or discoloration issues
- Designed to work with Sensory's fixed backfill and drowning mechanics
- Material definitions are formatted for direct consumption by Sensory's engine.jsx
- Reaction system adapted to Sensory's neighborReactions function
- Includes Sensory-specific properties like thermal conductivity, electrical conductivity, flammability, etc.
- Organized into categories for sidebar tab UI (liquids, gases, powders, solids, walls, special)
- Does not include Sandboxels' hidden elements by default (can be enabled via configuration)
- Uses Sensory's rng() function for randomness instead of Math.random()
- Designed for performance within Sensory's existing update loop
- Excludes Sandboxels' complex custom tick functions where they conflict with Sensory's updateCell lifecycle; such behaviors are adapted to Sensory's update mechanisms or implemented as special case handlers

This repository contains:
- Material definition templates for converting Sandboxels elements to Sensory format
- Guidelines for adapting Sandboxels behaviors to Sensory's movement system
- Reaction conversion rules for neighborReactions
- UI implementation notes for sidebar tab material categories
- Special property handling instructions (stain, burnInto, fireColor, etc.)

The goal is to provide a comprehensive library of Sandboxels-style materials and interactions that can be imported into Sensory/voxulation while preserving the project's existing fixes for visual streaks, human swimming/drowning behavior, and water preservation.