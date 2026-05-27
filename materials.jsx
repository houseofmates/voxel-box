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
      [MAT.LAVA]: MAT.STONE
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
