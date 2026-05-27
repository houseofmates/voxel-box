# Sandboxels to Voxel-Box Material Conversion Prompt for Gemini 3 Flash (via Google Jules)

You are tasked with implementing a complete Sandboxels-inspired material system for the Voxel-Box project, which will be integrated into the Voxel-Box/Voxel-Box project. You do NOT have access to the Sandboxels repository - all information must come from this prompt.

## PROJECT OVERVIEW
Voxel-Box is a voxel-based falling-sand particle simulation designed as a material library for integration into Voxel-Box/Voxel-Box. It aims to replicate Sandboxels' material definitions and interactions while adapting to Voxel-Box's existing systems.

## CORE REQUIREMENTS

### 1. MATERIAL STATE SYSTEM
Voxel-Box uses Voxel-Box's material state numbering:
- 0 = solid
- 1 = liquid  
- 2 = gas
- 3 = powder
- 4 = fire
- 5 = electricity

### 2. MATERIAL DEFINITION FORMAT
All materials must be defined in this format for `materials.jsx`:
```javascript
[MAT.MATERIAL_NAME]: {
  name: 'display name',
  color: '#hexcode',
  state: 0-5 (see above),
  density: number (kg/m³, affects sinking/rising),
  stain: number (0-1, how much it colors adjacent elements),
  thermalConductivity: number (0-1),
  electricalConductivity: number (0-1),
  flammable: boolean,
  meltPoint: number (celsius),
  boilPoint: number (celsius),
  ignitePoint: number (celsius),
  baseTemp: number (starting temperature),
  explosionResistant: boolean,
  // Voxel-Box-specific:
  sandbucketMovable: boolean,
  reactionProduct: object // maps to reaction results
}
```

### 3. CATEGORIES (for sidebar tabs)
Organize materials into these categories:
- liquids
- gases  
- powders
- solids
- walls
- special

### 4. MOVEMENT/BEHAVIOR ADAPTATIONS
Adapt Sandboxels behaviors to Voxel-Box's `move()` function in `engine.jsx`:

**LIQUIDS (state=1)**:
- Try to fall down if empty below
- Density-based sinking/rising: if below is liquid AND less dense, swap (50% chance)
- Horizontal diffusion: check diagonals below, move if both empty
- Standard liquid spread: try left/right, then up/down

**GASES (state=2)**:
- Try to rise up if empty above  
- Density-based rising/sinking: if above is gas AND more dense, swap (50% chance)
- Horizontal diffusion: similar to liquids but upward
- Dispersion: spread to empty adjacent cells

**POWDERS (state=3)**:
- Fall down if empty below
- Slide left/right if blocked below but empty diagonally
- Pile up: create slopes at angle of repose (~22-30 degrees)
- Can be blown by air currents/gas movement

**SOLIDS (state=0)**:
- Generally stationary
- Can be melted/vaporized by heat
- May conduct heat/electricity
- Some may have special properties (slippery, sticky, etc.)

**FIRE (state=4)**:
- Spread to adjacent flammable materials
- Consumes fuel over time
- Extinguishes when no fuel or smothered
- Can heat adjacent materials
- Has fireColor property for rendering

**ELECTRICITY (state=5)**:
- Travels through conductive materials
- Can arc gaps based on voltage
- Heats resistive materials
- Can trigger reactions in certain elements
- Follows path of least resistance

### 5. REACTION SYSTEM
Convert Sandboxels reactions to Voxel-Box's `neighborReactions()` function:

**Sandboxels reaction format**:
```javascript
{ react1: "element1", react2: "element2", elem1: "product1", elem2: "product2", priority: 10 }
```

**Voxel-Box conversion**:
```javascript
if ((mat === MAT.ELEMENT1 && nmat === MAT.ELEMENT2) || 
    (mat === MAT.ELEMENT2 && nmat === MAT.ELEMENT1)) {
  if (rng() < priority / 100) { // priority 10 = 10% chance
    set(x, y, MAT.PRODUCT1);
    set(nx, ny, MAT.PRODUCT2);
    // Optional: handle special effects (heat, sound, etc.)
    return;
  }
}
```

### 6. SPECIAL PROPERTIES HANDLING
Handle these Sandboxels-specific properties:

**stain**: 
- In `neighborReactions()`, if material has stain > 0, there's a chance to temporarily change neighbor's color
- Implementation: if (rng() < material.stain) { apply temporary color tint }

**burnInto**:
- In `checkStateTransition()`, when temp >= ignitePoint and flammable
- Instead of just setting to fire, set to burnInto material
- May require tracking burn time

**fireColor**:
- Used in `renderer.jsx` when drawing fire state
- Override default fire color with this value

**hidden**: 
- Do NOT include in default material palette
- Can be enabled via configuration/cheat mode

**conduct** (electrical):
- Map to electricalConductivity in material definition
- Used in electricity spread logic

**tempLow/tempHigh**:
- Define temperature ranges for state changes
- tempLow: below this, solidifies (if applicable)
- tempHigh: above this, vaporizes (if applicable)

**tick functions**:
- For elements with custom per-pixel logic, create special case handlers in `updateCell()`
- Examples: life-like elements, complex machines, etc.
- If too complex, note as "requires special implementation"

### 7. TEMPERATURE SYSTEM
Voxel-Box uses Voxel-Box's temperature system:
- Each material has baseTemp
- Materials exchange heat with neighbors based on thermalConductivity
- State changes occur at meltPoint/boilPoint/ignitePoint
- Heat sources: fire, electricity, reactions, external heaters

### 8. IMPLEMENTATION APPROACH
Work through these Sandboxels element categories systematically:

**LIQUIDS** (start here for testing):
- water, saltwater, acid, alkali, oil, lava, magma, mercury, bromine, fluorine, chlorine, etc.
- Focus on: density differences, miscibility, reactions with metals/bases/acids

**GASES**:
- air, oxygen, hydrogen, nitrogen, chlorine, fluorine, carbon dioxide, methane, propane, etc.
- Focus on: buoyancy, combustion support, dispersion, toxicity

**POWDERS/SOLIDS**:
- sand, stone, metal powders, chemicals, salts, sugars, etc.
- Focus on: solubility, melting points, reactions with liquids/acids

**WALLS/SOLIDS**:
- wall, earth, rock, metal, glass, concrete, etc.
- Focus on: hardness, conductivity, heat resistance

**SPECIAL**:
- life elements (plant, seed, root, leaf, etc.)
- complex compounds (explosives, batteries, etc.)
- unique behaviors (light, laser, etc.)

### 9. EXAMPLE CONVERSIONS

**Water (Sandboxels)**:
```javascript
// Sandboxels equivalent:
elements.water = {
  color: "#45aaf2",
  behavior: behaviors.LIQUID,
  state: "liquid",
  category: "liquids",
  density: 1000,
  stain: 0,
  burn: 9999,
  temp: 20,
  tempLow: 0,
  tempHigh: [100],
  conductivity: 0.58,
  reactions: {/* many reactions */}
};

// Voxel-Box conversion:
[MAT.WATER]: {
  name: 'water',
  color: '#45aaf2',
  state: 1, // liquid
  density: 1000,
  stain: 0,
  thermalConductivity: 0.58,
  electricalConductivity: 0,
  flammable: false,
  meltPoint: 0,
  boilPoint: 100,
  ignitePoint: 99999,
  baseTemp: 20,
  explosionResistant: true,
  sandbucketMovable: true
}
```

**Fire (Sandboxels)**:
```javascript
// Sandboxels equivalent:
elements.fire = {
  color: "#ff6a00",
  behavior: behaviors.FIRE,
  state: "fire",
  category: "fire",
  temp: 9999,
  fireColor: "#ff6a00",
  burn: 1,
  // ... etc
};

// Voxel-Box conversion:
[MAT.FIRE]: {
  name: 'fire',
  color: '#ff6a00',
  state: 4, // fire
  density: 0, // negligible
  stain: 0,
  thermalConductivity: 0.1,
  electricalConductivity: 0,
  flammable: true, // can spread
  meltPoint: 99999,
  boilPoint: 99999,
  ignitePoint: 99999, // already ignited
  baseTemp: 9999,
  explosionResistant: false,
  // Special: fireColor property for renderer
  fireColor: '#ff6a00'
}
```

**Acid (Sandboxels)**:
```javascript
// Would react with metals, carbonates, etc.
// Voxel-Box needs reaction rules like:
if ((mat === MAT.ACID && nmat === MAT.METAL) || 
    (mat === MAT.METAL && nmat === MAT.ACID)) {
  if (rng() < 0.05) { // 5% chance per tick
    set(x, y, MAT.SALT); // metal + acid -> salt + hydrogen
    set(nx, ny, MAT.HYDROGEN_GAS);
    return;
  }
}
```

### 10. FILE STRUCTURE EXPECTATIONS
Create these files in the voxel-box repository:

**`materials.jsx`** - Complete material definitions for ALL Sandboxels elements
**`behavior_guidelines.md`** - Detailed notes on adapting each behavior type to Voxel-Box's move() function
**`reaction_rules.md`** - Comprehensive list of reaction conversions for neighborReactions()
**`special_properties.md`** - How to handle stain, burnInto, fireColor, hidden, conduct, etc.
**`temperature_guide.md`** - Notes on melt/boil/ignite points and thermal properties
**`category_organization.json`** - Mapping of each element to its sidebar tab category
**`implementation_notes.md** - General notes on performance, conflicts, and special cases

### 11. QUALITY REQUIREMENTS
- Aim for completeness: convert as many Sandboxels elements as reasonable
- Maintain accuracy: preserve Sandboxels' intended behaviors and reactions where possible
- Ensure compatibility: all definitions must work with Voxel-Box's existing systems
- Document assumptions: when Sandboxels behavior can't be directly adapted, explain the approach
- Prioritize stability: avoid definitions that would cause crashes or infinite loops
- Include testing guidance: suggest which elements to test first for basic functionality

### 12. GETTING STARTED
Begin by creating the basic framework:
1. Set up the MAT constants (you'll need to define these based on Voxel-Box's existing system)
2. Create material definitions for core elements: water, sand, stone, fire
3. Implement basic movement for liquids and powders
4. Add simple reaction rules (e.g., acid + metal)
5. Then expand to the full library

Remember: Your output will be used by someone who cannot see the Sandboxels repo, so your documentation must be complete and self-contained. Focus on creating clear, actionable material definitions and conversion guidelines that can be implemented directly into the Voxel-Box/Voxel-Box system.

Start by creating the repository structure and basic files, then work toward the complete material library.