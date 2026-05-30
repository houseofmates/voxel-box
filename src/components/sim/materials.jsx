// Voxel-Box Material Definitions
// Adapted for integration into Voxel-Box

export const MAT = {
  EMPTY: 0,
  WALL: 1,
  SAND: 2,
  WATER: 3,
  STONE: 4,
  FIRE: 5,
  GAS: 6,
  STEAM: 7,
  ACID: 8,
  METAL: 9,
  LAVA: 10,
  DIRT: 11,
  WOOD: 12,
  OIL: 13,
  SMOKE: 14,
  OXYGEN: 15,
  HYDROGEN: 16,
  IRON: 17,
  GOLD: 18,
  COPPER: 19,
  GLASS: 20,
  ICE: 21,
  SNOW: 22,
  PLANT: 23,
  SEED: 24,
  LEAF: 25,
  NITROGEN: 26,
  METHANE: 27,
  ELECTRICITY: 28,
  EXPLOSIVE: 29,
  SALT: 30,
  SALTWATER: 31,
  ALKALICE: 32,
  MERCURY: 33,
  BROMINE: 34,
  FLUORINE: 35,
  CHLORINE: 36,
  MAGMA: 37,
  CARBON_DIOXIDE: 38,
  PROPANE: 39,
  CONCRETE: 40,
  EARTH: 41,
  ROCK: 42,
  ASH: 43,
  DUST: 44,
  POWDER_METAL: 45,
  CHARCOAL: 46,
  CLAY: 47,
  MUD: 48,
  SLIME: 49,
  SUGAR_WATER: 50,
  ALCOHOL: 51,
  SELTZER: 52,
  BLOOD: 53,
  GLUE: 54,
  MILK: 55,
  HONEY: 56,
  POISON_GAS: 57,
  RAD_STEAM: 58,
  SUGAR: 59,
  FLOUR: 60,
  GUNPOWDER: 61,
  CONCRETE_POWDER: 62,
  SLAG: 63,
  SULFUR: 64,
  DRY_ICE: 65,
  WAX: 66,
  PLASTIC: 67,
  STEEL: 68,
  DIAMOND: 69,
  BRICK: 70,
  FENCE: 71,
  PORCELAIN: 72,
  PLASMA: 73,
  COLD_FIRE: 74,
  ANTIMATTER: 75,
  VOID: 76,
  VIRUS: 77,
  CANCER: 78,
  GRASS: 79,
  TREE_BRANCH: 80,
  ALGAE: 81,
  MUSHROOM: 82,
  MEAT: 83,
  BONE: 84,
  TNT: 85,
  C4: 86,
  NITROGLYCERIN: 87,
  THERMITE: 88,
  CLF3: 89,
  NEUTRON: 90,
  PROTON: 91,
  ELECTRON: 92,
  MOLTEN_GLASS: 93,
  MOLTEN_IRON: 94,
  AIR: 0,
  OBSIDIAN: 95,
  ALUMINUM: 96,
  EMBER: 97,
  FUMES: 98,
  GLASS_SHARD: 100,
  CORIUM: 101,
  LIQUID_METAL: 102,
  TOXIC_SMOKE: 103,
  DEAD_HUMAN: 104,
  BUBBLE: 105,
  MELTED_PLASTIC: 106,
  HUMAN: 107,
  HUMAN_BODY: 108,
  LEAVES: 25,
  RUST: 109,
};

export const MATERIALS = {
  [MAT.EMPTY]: {
    name: 'empty',
    color: '#000000',
    state: 2, // gas (air)
    density: 1.2,
    stain: 0,
    thermalConductivity: 0.02,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -273,
    boilPoint: -273,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.WALL]: {
    name: 'wall',
    color: '#444444',
    state: 0, // solid
    density: 100000,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.SAND]: {
    name: 'sand',
    color: '#c2b280',
    state: 3, // powder
    density: 1600,
    stain: 0,
    thermalConductivity: 0.27,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1650,
    boilPoint: 2230,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.WATER]: {
    name: 'water',
    color: '#45aaf2',
    state: 1, // liquid
    density: 1000,
    stain: 0,
    thermalConductivity: 0.58,
    electricalConductivity: 0.01,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true,
    reactionProduct: {
      [MAT.FIRE]: MAT.STEAM,
      [MAT.LAVA]: MAT.OBSIDIAN
    }
  },
  [MAT.STONE]: {
    name: 'stone',
    color: '#7a7a7a',
    state: 0, // solid
    density: 2500,
    stain: 0,
    thermalConductivity: 1.5,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1200,
    boilPoint: 2500,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.FIRE]: {
    name: 'fire',
    color: '#ff6a00',
    state: 4, // fire
    density: 0.5,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0.05,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 900,
    explosionResistant: false,
    fireColor: '#ff6a00',
    sandbucketMovable: false
  },
  [MAT.ACID]: {
    name: 'acid',
    color: '#a0ff00',
    state: 1, // liquid
    density: 1100,
    stain: 0.1,
    thermalConductivity: 0.5,
    electricalConductivity: 0.8,
    flammable: false,
    meltPoint: -10,
    boilPoint: 110,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.IRON]: {
    name: 'iron',
    color: '#a19d94',
    state: 0, // solid
    density: 7874,
    stain: 0,
    thermalConductivity: 80,
    electricalConductivity: 1.0,
    flammable: false,
    meltPoint: 1538,
    boilPoint: 2862,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.WOOD]: {
    name: 'wood',
    color: '#74512d',
    state: 0, // solid
    density: 700,
    stain: 0,
    thermalConductivity: 0.15,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 300,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false,
    burnInto: MAT.CHARCOAL
  },
  [MAT.OIL]: {
    name: 'oil',
    color: '#3b3b3b',
    state: 1, // liquid
    density: 800,
    stain: 0.05,
    thermalConductivity: 0.13,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: -20,
    boilPoint: 200,
    ignitePoint: 150,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.SMOKE]: {
    name: 'smoke',
    color: '#888888',
    state: 2, // gas
    density: 0.8,
    stain: 0,
    thermalConductivity: 0.02,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -200,
    boilPoint: -200,
    ignitePoint: 99999,
    baseTemp: 100,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.LAVA]: {
    name: 'lava',
    color: '#ff4500',
    state: 1, // liquid
    density: 3100,
    stain: 0,
    thermalConductivity: 2.0,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 800,
    boilPoint: 2500,
    ignitePoint: 99999,
    baseTemp: 1000,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.STEAM]: {
    name: 'steam',
    color: '#f0f8ff',
    state: 2, // gas
    density: 0.6,
    stain: 0,
    thermalConductivity: 0.02,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 100,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.GAS]: {
    name: 'gas',
    color: '#cccccc',
    state: 2, // gas
    density: 1.0,
    stain: 0,
    thermalConductivity: 0.02,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -273,
    boilPoint: -273,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.METAL]: {
    name: 'metal',
    color: '#888888',
    state: 0, // solid
    density: 7000,
    stain: 0,
    thermalConductivity: 50,
    electricalConductivity: 1.0,
    flammable: false,
    meltPoint: 1500,
    boilPoint: 2800,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.MAGMA]: {
    name: 'magma',
    color: '#ff6347',
    state: 1, // liquid
    density: 2800,
    stain: 0,
    thermalConductivity: 2.5,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 800,
    boilPoint: 2500,
    ignitePoint: 99999,
    baseTemp: 1100,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.ALKALICE]: {
    name: 'alkalice',
    color: '#add8e6',
    state: 0, // solid
    density: 920,
    stain: 0,
    thermalConductivity: 2.0,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -10,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: -15,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.FLUORINE]: {
    name: 'fluorine',
    color: '#ffffcc',
    state: 2, // gas
    density: 1.7,
    stain: 0.1,
    thermalConductivity: 0.025,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -219,
    boilPoint: -188,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  }
};

// Liquids Expansion
Object.assign(MATERIALS, {
  [MAT.SALTWATER]: {
    name: 'saltwater',
    color: '#3498db',
    state: 1, // liquid
    density: 1025,
    stain: 0,
    thermalConductivity: 0.6,
    electricalConductivity: 0.5, // Brine is conductive
    flammable: false,
    meltPoint: -2,
    boilPoint: 102,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.MERCURY]: {
    name: 'mercury',
    color: '#bdc3c7',
    state: 1, // liquid
    density: 13534, // Extremely dense
    stain: 0,
    thermalConductivity: 8.3,
    electricalConductivity: 1.0,
    flammable: false,
    meltPoint: -38.8,
    boilPoint: 356.7,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.BROMINE]: {
    name: 'bromine',
    color: '#a32a2a',
    state: 1, // liquid
    density: 3102,
    stain: 0.2,
    thermalConductivity: 0.12,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -7.2,
    boilPoint: 58.8,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.SLIME]: {
    name: 'slime',
    color: '#2ecc71',
    state: 1, // liquid (viscous)
    density: 1200,
    stain: 0.1,
    thermalConductivity: 0.4,
    electricalConductivity: 0.1,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.MUD]: {
    name: 'mud',
    color: '#6b4423',
    state: 1, // liquid (viscous)
    density: 1600,
    stain: 0.15,
    thermalConductivity: 0.5,
    electricalConductivity: 0.05,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  }
});

// Gases Expansion
Object.assign(MATERIALS, {
  [MAT.OXYGEN]: {
    name: 'oxygen',
    color: '#e0ffff',
    state: 2, // gas
    density: 1.4,
    stain: 0,
    thermalConductivity: 0.024,
    electricalConductivity: 0,
    flammable: false, // Supports combustion but doesn't burn itself
    meltPoint: -218,
    boilPoint: -183,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.HYDROGEN]: {
    name: 'hydrogen',
    color: '#ffffff',
    state: 2, // gas
    density: 0.09, // Very light
    stain: 0,
    thermalConductivity: 0.18,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: -259,
    boilPoint: -252,
    ignitePoint: 500,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.METHANE]: {
    name: 'methane',
    color: '#f1c40f',
    state: 2, // gas
    density: 0.65,
    stain: 0,
    thermalConductivity: 0.03,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: -182,
    boilPoint: -161,
    ignitePoint: 537,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.CARBON_DIOXIDE]: {
    name: 'carbon_dioxide',
    color: '#7f8c8d',
    state: 2, // gas
    density: 1.9, // Denser than air
    stain: 0,
    thermalConductivity: 0.014,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -78, // Sublimates
    boilPoint: -78,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.CHLORINE]: {
    name: 'chlorine',
    color: '#d4efdf',
    state: 2, // gas
    density: 3.2, // Heavy gas
    stain: 0.05,
    thermalConductivity: 0.008,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -101,
    boilPoint: -34,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.NITROGEN]: {
    name: 'nitrogen',
    color: '#b0c4de',
    state: 2, // gas
    density: 1.25,
    stain: 0,
    thermalConductivity: 0.026,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -210,
    boilPoint: -196,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.PROPANE]: {
    name: 'propane',
    color: '#ffebcd',
    state: 2, // gas
    density: 1.9,
    stain: 0,
    thermalConductivity: 0.015,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: -187,
    boilPoint: -42,
    ignitePoint: 470,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  }
});

// Powders Expansion
Object.assign(MATERIALS, {
  [MAT.DIRT]: {
    name: 'dirt',
    color: '#5d4037',
    state: 3, // powder
    density: 1200,
    stain: 0,
    thermalConductivity: 0.2,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1200,
    boilPoint: 2500,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.SALT]: {
    name: 'salt',
    color: '#ffffff',
    state: 3, // powder
    density: 2160,
    stain: 0,
    thermalConductivity: 0.5,
    electricalConductivity: 0.1,
    flammable: false,
    meltPoint: 801,
    boilPoint: 1465,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.SNOW]: {
    name: 'snow',
    color: '#f0f8ff',
    state: 3, // powder
    density: 100, // Very low density
    stain: 0,
    thermalConductivity: 0.05,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: -5,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.ASH]: {
    name: 'ash',
    color: '#4a4a4a',
    state: 3, // powder
    density: 700,
    stain: 0.05,
    thermalConductivity: 0.07,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1000,
    boilPoint: 2000,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.DUST]: {
    name: 'dust',
    color: '#b8a080',
    state: 3, // powder
    density: 400,
    stain: 0.02,
    thermalConductivity: 0.05,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1200,
    boilPoint: 2000,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.POWDER_METAL]: {
    name: 'powder_metal',
    color: '#a0a0a0',
    state: 3, // powder
    density: 5000,
    stain: 0,
    thermalConductivity: 10,
    electricalConductivity: 0.5,
    flammable: false,
    meltPoint: 1400,
    boilPoint: 2700,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.CLAY]: {
    name: 'clay',
    color: '#a0522d',
    state: 3, // powder
    density: 1900,
    stain: 0.05,
    thermalConductivity: 0.3,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1000,
    boilPoint: 2000,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  }
});

// Solids Expansion
Object.assign(MATERIALS, {
  [MAT.GOLD]: {
    name: 'gold',
    color: '#ffd700',
    state: 0, // solid
    density: 19300,
    stain: 0,
    thermalConductivity: 310,
    electricalConductivity: 1.0,
    flammable: false,
    meltPoint: 1064,
    boilPoint: 2856,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.COPPER]: {
    name: 'copper',
    color: '#b87333',
    state: 0, // solid
    density: 8960,
    stain: 0,
    thermalConductivity: 400,
    electricalConductivity: 1.0,
    flammable: false,
    meltPoint: 1085,
    boilPoint: 2562,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.GLASS]: {
    name: 'glass',
    color: '#a9d0d5',
    state: 0, // solid
    density: 2500,
    stain: 0,
    thermalConductivity: 1.0,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1500,
    boilPoint: 2200,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.ICE]: {
    name: 'ice',
    color: '#e0ffff',
    state: 0, // solid
    density: 917,
    stain: 0,
    thermalConductivity: 2.1,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: -10,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.CHARCOAL]: {
    name: 'charcoal',
    color: '#262626',
    state: 0, // solid
    density: 200,
    stain: 0.1,
    thermalConductivity: 0.05,
    electricalConductivity: 0.01,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 250,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.ROCK]: {
    name: 'rock',
    color: '#808080',
    state: 0, // solid
    density: 2700,
    stain: 0,
    thermalConductivity: 2.0,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1300,
    boilPoint: 2600,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  }
});

// Walls Expansion
Object.assign(MATERIALS, {
  [MAT.CONCRETE]: {
    name: 'concrete',
    color: '#95a5a6',
    state: 0, // solid
    density: 2400,
    stain: 0,
    thermalConductivity: 1.1,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1500,
    boilPoint: 3000,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.EARTH]: {
    name: 'earth',
    color: '#3e2723',
    state: 0, // solid
    density: 1500,
    stain: 0,
    thermalConductivity: 1.0,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1200,
    boilPoint: 2500,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  }
});

// Special and Life Elements Expansion
Object.assign(MATERIALS, {
  [MAT.PLANT]: {
    name: 'plant',
    color: '#27ae60',
    state: 0, // solid
    density: 600,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0.05,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 250,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false,
    burnInto: MAT.ASH
  },
  [MAT.SEED]: {
    name: 'seed',
    color: '#d35400',
    state: 3, // powder
    density: 700,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 300,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.LEAF]: {
    name: 'leaf',
    color: '#2ecc71',
    state: 3, // powder (lightweight)
    density: 100,
    stain: 0,
    thermalConductivity: 0.05,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 200,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true,
    burnInto: MAT.FIRE
  },
  [MAT.ELECTRICITY]: {
    name: 'electricity',
    color: '#f1c40f',
    state: 5, // electricity
    density: 0,
    stain: 0,
    thermalConductivity: 0,
    electricalConductivity: 1.0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 1000,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.EXPLOSIVE]: {
    name: 'explosive',
    color: '#e74c3c',
    state: 0, // solid
    density: 1600,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0.2,
    flammable: true,
    meltPoint: 100,
    boilPoint: 200,
    ignitePoint: 150,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  }
});

// Additional Liquids
Object.assign(MATERIALS, {
  [MAT.SUGAR_WATER]: {
    name: 'sugar_water',
    color: '#a0d8f1',
    state: 1, // liquid
    density: 1050,
    stain: 0,
    thermalConductivity: 0.5,
    electricalConductivity: 0.1,
    flammable: false,
    meltPoint: -2,
    boilPoint: 105,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.ALCOHOL]: {
    name: 'alcohol',
    color: '#e0e0ff',
    state: 1, // liquid
    density: 789,
    stain: 0,
    thermalConductivity: 0.17,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: -114,
    boilPoint: 78,
    ignitePoint: 365,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.SELTZER]: {
    name: 'seltzer',
    color: '#d0f0ff',
    state: 1, // liquid
    density: 1000,
    stain: 0,
    thermalConductivity: 0.5,
    electricalConductivity: 0.1,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.BLOOD]: {
    name: 'blood',
    color: '#8a0303',
    state: 1, // liquid
    density: 1060,
    stain: 0.1,
    thermalConductivity: 0.5,
    electricalConductivity: 0.3,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 37,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.GLUE]: {
    name: 'glue',
    color: '#f0f0f0',
    state: 1, // liquid
    density: 1100,
    stain: 0.2,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.MILK]: {
    name: 'milk',
    color: '#f5f5f5',
    state: 1, // liquid
    density: 1030,
    stain: 0.05,
    thermalConductivity: 0.5,
    electricalConductivity: 0.2,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.HONEY]: {
    name: 'honey',
    color: '#d4af37',
    state: 1, // liquid
    density: 1420,
    stain: 0.1,
    thermalConductivity: 0.5,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 15,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  }
});

// Additional Gases
Object.assign(MATERIALS, {
  [MAT.POISON_GAS]: {
    name: 'poison_gas',
    color: '#9b59b6',
    state: 2, // gas
    density: 1.5,
    stain: 0.05,
    thermalConductivity: 0.02,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -100,
    boilPoint: -50,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.RAD_STEAM]: {
    name: 'rad_steam',
    color: '#bfff00',
    state: 2, // gas
    density: 0.6,
    stain: 0.2,
    thermalConductivity: 0.03,
    electricalConductivity: 0.1,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 100,
    explosionResistant: true,
    sandbucketMovable: false
  }
});

// Additional Powders
Object.assign(MATERIALS, {
  [MAT.SUGAR]: {
    name: 'sugar',
    color: '#ffffff',
    state: 3, // powder
    density: 1590,
    stain: 0,
    thermalConductivity: 0.2,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 186,
    boilPoint: 99999,
    ignitePoint: 350,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.FLOUR]: {
    name: 'flour',
    color: '#f5f5dc',
    state: 3, // powder
    density: 593,
    stain: 0.02,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 400,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.GUNPOWDER]: {
    name: 'gunpowder',
    color: '#2c3e50',
    state: 3, // powder
    density: 960,
    stain: 0.05,
    thermalConductivity: 0.2,
    electricalConductivity: 0.5,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 160,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.CONCRETE_POWDER]: {
    name: 'concrete_powder',
    color: '#bdc3c7',
    state: 3, // powder
    density: 1500,
    stain: 0,
    thermalConductivity: 0.3,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1500,
    boilPoint: 3000,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.SLAG]: {
    name: 'slag',
    color: '#34495e',
    state: 3, // powder
    density: 2800,
    stain: 0,
    thermalConductivity: 0.5,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1200,
    boilPoint: 2500,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.SULFUR]: {
    name: 'sulfur',
    color: '#f1c40f',
    state: 3, // powder
    density: 2070,
    stain: 0.05,
    thermalConductivity: 0.2,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 115,
    boilPoint: 444,
    ignitePoint: 190,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  }
});

// Additional Solids
Object.assign(MATERIALS, {
  [MAT.DRY_ICE]: {
    name: 'dry_ice',
    color: '#f0ffff',
    state: 0, // solid
    density: 1560,
    stain: 0,
    thermalConductivity: 0.05,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -78,
    boilPoint: -78,
    ignitePoint: 99999,
    baseTemp: -78,
    explosionResistant: true,
    sandbucketMovable: true
  },
  [MAT.WAX]: {
    name: 'wax',
    color: '#fff8dc',
    state: 0, // solid
    density: 900,
    stain: 0,
    thermalConductivity: 0.2,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 60,
    boilPoint: 370,
    ignitePoint: 240,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.PLASTIC]: {
    name: 'plastic',
    color: '#3498db',
    state: 0, // solid
    density: 950,
    stain: 0,
    thermalConductivity: 0.15,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 150,
    boilPoint: 400,
    ignitePoint: 300,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.STEEL]: {
    name: 'steel',
    color: '#7f8c8d',
    state: 0, // solid
    density: 7850,
    stain: 0,
    thermalConductivity: 50,
    electricalConductivity: 0.9,
    flammable: false,
    meltPoint: 1510,
    boilPoint: 2730,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.DIAMOND]: {
    name: 'diamond',
    color: '#e0ffff',
    state: 0, // solid
    density: 3510,
    stain: 0,
    thermalConductivity: 2000,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 3550,
    boilPoint: 4827,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.BRICK]: {
    name: 'brick',
    color: '#b22222',
    state: 0, // solid
    density: 1900,
    stain: 0,
    thermalConductivity: 0.6,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1200,
    boilPoint: 2000,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.FENCE]: {
    name: 'fence',
    color: '#8b4513',
    state: 0, // solid
    density: 700,
    stain: 0,
    thermalConductivity: 0.15,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 250,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.PORCELAIN]: {
    name: 'porcelain',
    color: '#fdf5e6',
    state: 0, // solid
    density: 2400,
    stain: 0,
    thermalConductivity: 1.5,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1400,
    boilPoint: 2500,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  }
});

// Special, Energy and Life Elements
Object.assign(MATERIALS, {
  [MAT.PLASMA]: {
    name: 'plasma',
    color: '#8e44ad',
    state: 2, // gas (ionized)
    density: 0.01,
    stain: 0.1,
    thermalConductivity: 1.0,
    electricalConductivity: 1.0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 5000,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.COLD_FIRE]: {
    name: 'cold_fire',
    color: '#00ffff',
    state: 4, // fire
    density: 0,
    stain: 0,
    thermalConductivity: 1.0,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: -100,
    explosionResistant: true,
    sandbucketMovable: false,
    fireColor: '#00ffff'
  },
  [MAT.ANTIMATTER]: {
    name: 'antimatter',
    color: '#2e0854',
    state: 3, // powder-like
    density: 5000,
    stain: 0.5,
    thermalConductivity: 0,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.VOID]: {
    name: 'void',
    color: '#000000',
    state: 0, // solid
    density: 1000000,
    stain: 0,
    thermalConductivity: 0,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 0,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.VIRUS]: {
    name: 'virus',
    color: '#00ff00',
    state: 1, // liquid-like spread
    density: 1000,
    stain: 0.2,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.CANCER]: {
    name: 'cancer',
    color: '#ff69b4',
    state: 0, // solid-like spread
    density: 1000,
    stain: 0.2,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.GRASS]: {
    name: 'grass',
    color: '#2ecc71',
    state: 0, // solid
    density: 400,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 200,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false,
    burnInto: MAT.ASH
  },
  [MAT.TREE_BRANCH]: {
    name: 'tree_branch',
    color: '#5d4037',
    state: 0, // solid
    density: 700,
    stain: 0,
    thermalConductivity: 0.15,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 250,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false,
    burnInto: MAT.CHARCOAL
  },
  [MAT.ALGAE]: {
    name: 'algae',
    color: '#006400',
    state: 1, // liquid-like spread
    density: 1010,
    stain: 0,
    thermalConductivity: 0.5,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 0,
    boilPoint: 100,
    ignitePoint: 200,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false,
    burnInto: MAT.ASH
  },
  [MAT.MUSHROOM]: {
    name: 'mushroom',
    color: '#f4a460',
    state: 0, // solid
    density: 500,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 200,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true,
    burnInto: MAT.ASH
  },
  [MAT.MEAT]: {
    name: 'meat',
    color: '#ffb6c1',
    state: 0, // solid
    density: 1060,
    stain: 0.1,
    thermalConductivity: 0.4,
    electricalConductivity: 0.1,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 200,
    baseTemp: 37,
    explosionResistant: false,
    sandbucketMovable: true,
    burnInto: MAT.ASH
  },

  [MAT.OBSIDIAN]: {
    name: 'obsidian',
    color: '#1a0a2e',
    state: 0, // solid
    density: 2600,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 700,
    boilPoint: 2000,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.ALUMINUM]: {
    name: 'aluminum',
    color: '#d4d4d4',
    state: 0, // solid
    density: 2700,
    stain: 0,
    thermalConductivity: 235,
    electricalConductivity: 0.6,
    flammable: false,
    meltPoint: 660,
    boilPoint: 2470,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.EMBER]: {
    name: 'ember',
    color: '#ff6600',
    state: 3, // powder-like
    density: 500,
    stain: 0.2,
    thermalConductivity: 0.5,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 800,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.FUMES]: {
    name: 'fumes',
    color: '#99aa22',
    state: 2, // gas
    density: 1.5,
    stain: 0.5,
    thermalConductivity: 0.05,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: -200,
    boilPoint: -50,
    ignitePoint: 400,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.GLASS_SHARD]: {
    name: 'glass_shard',
    color: '#c8e8f8',
    state: 3, // powder-like
    density: 2500,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1200,
    boilPoint: 2000,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.CORIUM]: {
    name: 'corium',
    color: '#ffff00',
    state: 1, // liquid
    density: 10000,
    stain: 0.8,
    thermalConductivity: 10.0,
    electricalConductivity: 0.1,
    flammable: false,
    meltPoint: 2500,
    boilPoint: 3500,
    ignitePoint: 99999,
    baseTemp: 2800,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.LIQUID_METAL]: {
    name: 'liquid_metal',
    color: '#b0b0b0',
    state: 1, // liquid
    density: 7000,
    stain: 0.2,
    thermalConductivity: 40,
    electricalConductivity: 0.8,
    flammable: false,
    meltPoint: 500,
    boilPoint: 2000,
    ignitePoint: 99999,
    baseTemp: 800,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.TOXIC_SMOKE]: {
    name: 'toxic_smoke',
    color: '#556b2f',
    state: 2, // gas
    density: 1.2,
    stain: 0.3,
    thermalConductivity: 0.05,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -200,
    boilPoint: -100,
    ignitePoint: 99999,
    baseTemp: 60,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.DEAD_HUMAN]: {
    name: 'dead_human',
    color: '#a0a0a0',
    state: 3, // powder-like (ragdoll)
    density: 1050,
    stain: 0.2,
    thermalConductivity: 0.4,
    electricalConductivity: 0.1,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 200,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.BUBBLE]: {
    name: 'bubble',
    color: '#ffffff',
    state: 2, // gas
    density: 0.1,
    stain: 0,
    thermalConductivity: 0.01,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: -273,
    boilPoint: -273,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.MELTED_PLASTIC]: {
    name: 'melted_plastic',
    color: '#ffb6c1',
    state: 1, // liquid
    density: 900,
    stain: 0.2,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 50,
    boilPoint: 300,
    ignitePoint: 400,
    baseTemp: 200,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.HUMAN]: {
    name: 'human',
    color: '#f5deb3',
    state: 0, // special handling
    density: 1000,
    stain: 0.1,
    thermalConductivity: 0.5,
    electricalConductivity: 0.1,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 200,
    baseTemp: 37,
    explosionResistant: false,
    sandbucketMovable: false
  },
  [MAT.HUMAN_BODY]: {
    name: 'human_body',
    color: '#f5deb3',
    state: 0, // special
    density: 1000,
    stain: 0,
    thermalConductivity: 0.5,
    electricalConductivity: 0.1,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 200,
    baseTemp: 37,
    explosionResistant: false,
    sandbucketMovable: false
  },

  [MAT.RUST]: {
    name: 'rust',
    color: '#8b4513',
    state: 3, // powder
    density: 5000,
    stain: 0.1,
    thermalConductivity: 0.2,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1500,
    boilPoint: 3000,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: true
  },  [MAT.BONE]: {
    name: 'bone',
    color: '#f5f5f5',
    state: 0, // solid
    density: 1900,
    stain: 0,
    thermalConductivity: 0.3,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 800,
    baseTemp: 37,
    explosionResistant: true,
    sandbucketMovable: false
  }
});

// Explosives and Advanced Reactive Elements
Object.assign(MATERIALS, {
  [MAT.TNT]: {
    name: 'tnt',
    color: '#c0392b',
    state: 0, // solid
    density: 1650,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 80,
    boilPoint: 240,
    ignitePoint: 160,
    baseTemp: 20,
    explosionResistant: false,
    explosive: true,
    sandbucketMovable: true
  },
  [MAT.C4]: {
    name: 'c4',
    color: '#ecf0f1',
    state: 0, // solid
    density: 1600,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0.2,
    flammable: true,
    meltPoint: 100,
    boilPoint: 200,
    ignitePoint: 230,
    baseTemp: 20,
    explosionResistant: false,
    explosive: true,
    sandbucketMovable: true
  },
  [MAT.NITROGLYCERIN]: {
    name: 'nitroglycerin',
    color: '#f1c40f',
    state: 1, // liquid
    density: 1600,
    stain: 0,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: true,
    meltPoint: 13,
    boilPoint: 50,
    ignitePoint: 170,
    baseTemp: 20,
    explosionResistant: false,
    explosive: true,
    sandbucketMovable: true
  },
  [MAT.THERMITE]: {
    name: 'thermite',
    color: '#e67e22',
    state: 3, // powder
    density: 2500,
    stain: 0,
    thermalConductivity: 0.5,
    electricalConductivity: 0.1,
    flammable: true,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 1500,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.CLF3]: {
    name: 'clf3',
    color: '#90ee90',
    state: 1, // liquid
    density: 1800,
    stain: 0.5,
    thermalConductivity: 0.1,
    electricalConductivity: 0,
    flammable: true,
    hypergolic: true,
    meltPoint: -76,
    boilPoint: 12,
    ignitePoint: -100,
    baseTemp: 20,
    explosionResistant: false,
    sandbucketMovable: true
  },
  [MAT.NEUTRON]: {
    name: 'neutron',
    color: '#bdc3c7',
    state: 2, // gas-like
    density: 0,
    stain: 0.1,
    thermalConductivity: 100,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.PROTON]: {
    name: 'proton',
    color: '#e74c3c',
    state: 2, // gas-like
    density: 0,
    stain: 0.1,
    thermalConductivity: 100,
    electricalConductivity: 1.0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.ELECTRON]: {
    name: 'electron',
    color: '#3498db',
    state: 2, // gas-like
    density: 0,
    stain: 0.1,
    thermalConductivity: 100,
    electricalConductivity: 1.0,
    flammable: false,
    meltPoint: 99999,
    boilPoint: 99999,
    ignitePoint: 99999,
    baseTemp: 20,
    explosionResistant: true,
    sandbucketMovable: false
  }
});

// Molten states for accurate transitions
Object.assign(MATERIALS, {
  [MAT.MOLTEN_GLASS]: {
    name: 'molten_glass',
    color: '#ff4500',
    state: 1, // liquid
    density: 2400,
    stain: 0.1,
    thermalConductivity: 0.8,
    electricalConductivity: 0,
    flammable: false,
    meltPoint: 1500,
    boilPoint: 2200,
    ignitePoint: 99999,
    baseTemp: 1600,
    explosionResistant: true,
    sandbucketMovable: false
  },
  [MAT.MOLTEN_IRON]: {
    name: 'molten_iron',
    color: '#ff6600',
    state: 1, // liquid
    density: 7000,
    stain: 0.1,
    thermalConductivity: 40,
    electricalConductivity: 0.8,
    flammable: false,
    meltPoint: 1538,
    boilPoint: 2862,
    ignitePoint: 99999,
    baseTemp: 1600,
    explosionResistant: true,
    sandbucketMovable: false
  }
});

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
