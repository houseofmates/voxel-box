// Material type constants
export const MAT = {
  EMPTY: 0, SAND: 1, GLASS: 2, LEAVES: 3, FIRE: 4, LIQUID_METAL: 5,
  CORIUM: 6, LAVA: 7, OBSIDIAN: 8, IRON: 9, ALUMINUM: 10, WATER: 11,
  ACID: 12, PLASTIC: 13, OIL: 14, SMOKE: 15, STEAM: 16, ASH: 17,
  EMBER: 18, STONE: 19, WOOD: 20, ICE: 21, COPPER: 22, NITROGEN: 23,
  TNT: 24, OXYGEN: 25, HYDROGEN: 26, TOXIC_SMOKE: 27, GLASS_SHARD: 28,
  HUMAN: 29, FUMES: 30, HUMAN_BODY: 31, AIR: 32, ELECTRICITY: 33, MELTED_PLASTIC: 34, BUBBLE: 35, DEAD_HUMAN: 36,
};

// state: 0=solid, 1=liquid, 2=gas, 3=powder, 4=fire, 5=electricity
export const MATERIALS = {
  [MAT.EMPTY]:          { name: 'air',            color: null,      state: 2, density: 0,    thermalConductivity: 0.01, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.SAND]:           { name: 'sand',            color: '#e8c97a', state: 3, density: 4,    thermalConductivity: 0.08, electricalConductivity: 0,    flammable: false, meltPoint: 1700,  boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.GLASS]:          { name: 'glass',           color: '#a8d4e6', state: 0, density: 5,    thermalConductivity: 0.02, electricalConductivity: 0,    flammable: false, meltPoint: 1500,  boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.LEAVES]:         { name: 'leaves',          color: '#4a7c3f', state: 3, density: 0.5,  thermalConductivity: 0.04, electricalConductivity: 0,    flammable: true,  meltPoint: 99999, boilPoint: 99999, ignitePoint: 200,   baseTemp: 20,   explosionResistant: false },
  [MAT.FIRE]:           { name: 'fire',            color: '#ff4500', state: 4, density: -1,   thermalConductivity: 0.3,  electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 800,  explosionResistant: false },
  [MAT.LIQUID_METAL]:   { name: 'liquid metal',    color: '#c0c0c0', state: 1, density: 10,   thermalConductivity: 0.7,  electricalConductivity: 0.7,  flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 1500, explosionResistant: false },
  [MAT.CORIUM]:         { name: 'corium',          color: '#7fff00', state: 1, density: 12,   thermalConductivity: 0.5,  electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 2800, explosionResistant: false },
  [MAT.LAVA]:           { name: 'lava',            color: '#ff4500', state: 1, density: 8,    thermalConductivity: 0.3,  electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 1200, explosionResistant: false },
  [MAT.OBSIDIAN]:       { name: 'obsidian',        color: '#1a0a2e', state: 0, density: 6,    thermalConductivity: 0.02, electricalConductivity: 0,    flammable: false, meltPoint: 2000,  boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: true  },
  [MAT.IRON]:           { name: 'iron',            color: '#808080', state: 0, density: 9,    thermalConductivity: 0.4,  electricalConductivity: 0.5,  flammable: false, meltPoint: 1538,  boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.ALUMINUM]:       { name: 'aluminum',        color: '#d4d4d4', state: 0, density: 6,    thermalConductivity: 0.5,  electricalConductivity: 0.6,  flammable: false, meltPoint: 660,   boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.WATER]:          { name: 'water',           color: '#1e90ff', state: 1, density: 2,    thermalConductivity: 0.15, electricalConductivity: 0.1,  flammable: false, meltPoint: 99999, boilPoint: 100,   ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.ACID]:           { name: 'acid',            color: '#39ff14', state: 1, density: 2.5,  thermalConductivity: 0.12, electricalConductivity: 0.2,  flammable: false, meltPoint: 99999, boilPoint: 80,    ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.PLASTIC]:        { name: 'plastic',         color: '#ff69b4', state: 0, density: 1.5,  thermalConductivity: 0.03, electricalConductivity: 0,    flammable: true,  meltPoint: 170,   boilPoint: 99999, ignitePoint: 450,   baseTemp: 20,   explosionResistant: false },
  [MAT.OIL]:            { name: 'oil',             color: '#3d2b1f', state: 1, density: 1.5,  thermalConductivity: 0.05, electricalConductivity: 0,    flammable: true,  meltPoint: 99999, boilPoint: 300,   ignitePoint: 250,   baseTemp: 20,   explosionResistant: false },
  [MAT.SMOKE]:          { name: 'smoke',           color: '#888888', state: 2, density: -0.5, thermalConductivity: 0.01, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 200,  explosionResistant: false },
  [MAT.STEAM]:          { name: 'steam',           color: '#e0e0e0', state: 2, density: -0.3, thermalConductivity: 0.02, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 100,  explosionResistant: false },
  [MAT.ASH]:            { name: 'ash',             color: '#555555', state: 3, density: 2,    thermalConductivity: 0.04, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 40,   explosionResistant: false },
  [MAT.EMBER]:          { name: 'ember',           color: '#ff6600', state: 3, density: 2,    thermalConductivity: 0.2,  electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 600,  explosionResistant: false },
  [MAT.STONE]:          { name: 'stone',           color: '#888877', state: 0, density: 7,    thermalConductivity: 0.06, electricalConductivity: 0,    flammable: false, meltPoint: 2500,  boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.WOOD]:           { name: 'wood',            color: '#8b4513', state: 0, density: 3,    thermalConductivity: 0.05, electricalConductivity: 0,    flammable: true,  meltPoint: 99999, boilPoint: 99999, ignitePoint: 300,   baseTemp: 20,   explosionResistant: false },
  [MAT.ICE]:            { name: 'ice',             color: '#b0d8f0', state: 0, density: 2,    thermalConductivity: 0.1,  electricalConductivity: 0,    flammable: false, meltPoint: 0,     boilPoint: 99999, ignitePoint: 99999, baseTemp: -10,  explosionResistant: false },
  [MAT.COPPER]:         { name: 'copper',          color: '#b87333', state: 0, density: 7,    thermalConductivity: 0.8,  electricalConductivity: 0.95, flammable: false, meltPoint: 1085,  boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.NITROGEN]:       { name: 'nitrogen',        color: '#99ccff', state: 1, density: 1.5,  thermalConductivity: 0.1,  electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: -196,  ignitePoint: 99999, baseTemp: -196, explosionResistant: false },
  [MAT.TNT]:            { name: 'tnt',             color: '#cc2200', state: 0, density: 5,    thermalConductivity: 0.05, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 200,   baseTemp: 20,   explosionResistant: false },
  [MAT.OXYGEN]:         { name: 'oxygen',          color: '#ccecff', state: 2, density: -0.4, thermalConductivity: 0.01, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.HYDROGEN]:       { name: 'hydrogen',        color: '#ffe066', state: 2, density: -0.6, thermalConductivity: 0.01, electricalConductivity: 0,    flammable: true,  meltPoint: 99999, boilPoint: 99999, ignitePoint: 500,   baseTemp: 20,   explosionResistant: false },
  [MAT.TOXIC_SMOKE]:    { name: 'toxic smoke',     color: '#556b2f', state: 2, density: -0.4, thermalConductivity: 0.01, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 200,  explosionResistant: false },
  [MAT.GLASS_SHARD]:    { name: 'glass shard',     color: '#c8e8f8', state: 3, density: 5,    thermalConductivity: 0.02, electricalConductivity: 0,    flammable: false, meltPoint: 1500,  boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.HUMAN]:          { name: 'human',           color: '#f5c5a0', state: 0, density: 2,    thermalConductivity: 0.1,  electricalConductivity: 0.1,  flammable: true,  meltPoint: 99999, boilPoint: 99999, ignitePoint: 300,   baseTemp: 37,   explosionResistant: false },
  [MAT.HUMAN_BODY]:     { name: 'human body',      color: '#4466cc', state: 0, density: 2,    thermalConductivity: 0.1,  electricalConductivity: 0.1,  flammable: true,  meltPoint: 99999, boilPoint: 99999, ignitePoint: 300,   baseTemp: 37,   explosionResistant: false },
  [MAT.FUMES]:          { name: 'fumes',           color: '#99aa22', state: 2, density: -0.3, thermalConductivity: 0.01, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 50,   explosionResistant: false },
  [MAT.AIR]:            { name: 'air (erase)',      color: '#c8e0ff', state: 2, density: 0,    thermalConductivity: 0.01, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.ELECTRICITY]:    { name: 'electricity',     color: '#ffff00', state: 5, density: -1,   thermalConductivity: 0.01, electricalConductivity: 1.0,  flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.MELTED_PLASTIC]: { name: 'melted plastic',  color: '#ff88cc', state: 1, density: 1.3,  thermalConductivity: 0.04, electricalConductivity: 0,    flammable: true,  meltPoint: 99999, boilPoint: 99999, ignitePoint: 450,   baseTemp: 200,  explosionResistant: false },
  [MAT.BUBBLE]:         { name: 'bubble',          color: '#d0f0ff', state: 2, density: -3,   thermalConductivity: 0.01, electricalConductivity: 0,    flammable: false, meltPoint: 99999, boilPoint: 99999, ignitePoint: 99999, baseTemp: 20,   explosionResistant: false },
  [MAT.DEAD_HUMAN]:     { name: 'dead human',      color: '#b09070', state: 1, density: 0.4,  thermalConductivity: 0.08, electricalConductivity: 0.05, flammable: true,  meltPoint: 99999, boilPoint: 99999, ignitePoint: 300,   baseTemp: 20,   explosionResistant: false },
};

// Acid-immune materials
export const ACID_IMMUNE = new Set([MAT.GLASS, MAT.PLASTIC, MAT.MELTED_PLASTIC, MAT.OBSIDIAN, MAT.EMPTY, MAT.ACID, MAT.ASH, MAT.BUBBLE]);

// Placeable by user — liquid metal grouped with metals
export const PLACEABLE = [
  MAT.AIR, MAT.SAND, MAT.WATER, MAT.ICE, MAT.STONE, MAT.WOOD,
  MAT.IRON, MAT.ALUMINUM, MAT.LIQUID_METAL, MAT.COPPER,
  MAT.GLASS, MAT.PLASTIC, MAT.LEAVES, MAT.OIL,
  MAT.FIRE, MAT.LAVA, MAT.CORIUM, MAT.ACID,
  MAT.NITROGEN, MAT.TNT, MAT.ELECTRICITY, MAT.HUMAN,
];

// Electrical conductors (ELECTRICITY itself is a conductor so it can charge neighbors)
export const CONDUCTORS = new Set([MAT.IRON, MAT.ALUMINUM, MAT.COPPER, MAT.LIQUID_METAL, MAT.WATER, MAT.ELECTRICITY]);

// Dangerous materials (trigger human panic)
export const DANGEROUS = new Set([MAT.FIRE, MAT.LAVA, MAT.ACID, MAT.CORIUM, MAT.EMBER, MAT.LIQUID_METAL, MAT.ELECTRICITY]);