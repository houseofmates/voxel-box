import { MAT } from './materials';

function hex(c) {
  const v = parseInt(c.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

const BASE_COLORS = {
  [MAT.SAND]: [232, 201, 122],
  [MAT.LEAF]: [74, 124, 63],
  [MAT.LEAVES]: [74, 124, 63],
  [MAT.OBSIDIAN]: [26, 10, 46],
  [MAT.IRON]: [128, 128, 128],
  [MAT.ALUMINUM]: [212, 212, 212],
  [MAT.ASH]: [85, 85, 85],
  [MAT.STONE]: [136, 136, 119],
  [MAT.WOOD]: [139, 69, 19],
  [MAT.ICE]: [176, 216, 240],
  [MAT.COPPER]: [184, 115, 51],
  [MAT.TNT]: [204, 34, 0],
  [MAT.GLASS_SHARD]: [200, 232, 248],
  [MAT.FUMES]: [153, 170, 34],
  [MAT.PLASTIC]: [255, 105, 180],
  [MAT.OIL]: [61, 43, 31],
  [MAT.AIR]: [5, 5, 5],
  [MAT.ALCOHOL]: [224, 224, 255],
  [MAT.ALGAE]: [0, 100, 0],
  [MAT.ALKALICE]: [173, 216, 230],
  [MAT.ANTIMATTER]: [46, 8, 84],
  [MAT.BLOOD]: [138, 3, 3],
  [MAT.BONE]: [245, 245, 245],
  [MAT.BRICK]: [178, 34, 34],
  [MAT.BROMINE]: [163, 42, 42],
  [MAT.CANCER]: [255, 105, 180],
  [MAT.CARBON_DIOXIDE]: [127, 140, 141],
  [MAT.CHLORINE]: [212, 239, 223],
  [MAT.CLAY]: [160, 82, 45],
  [MAT.CLF3]: [144, 238, 144],
  [MAT.COLD_FIRE]: [0, 255, 255],
  [MAT.CONCRETE]: [149, 165, 166],
  [MAT.CONCRETE_POWDER]: [189, 195, 199],
  [MAT.DIAMOND]: [224, 255, 255],
  [MAT.DIRT]: [93, 64, 55],
  [MAT.DRY_ICE]: [240, 248, 255],
  [MAT.EARTH]: [62, 39, 35],
  [MAT.FLOUR]: [245, 245, 220],
  [MAT.GOLD]: [255, 215, 0],
  [MAT.GRASS]: [46, 204, 113],
  [MAT.HONEY]: [212, 175, 55],
  [MAT.METHANE]: [241, 196, 15],
  [MAT.MUD]: [107, 68, 35],
  [MAT.NEUTRON]: [189, 195, 199],
  [MAT.OXYGEN]: [224, 255, 255],
  [MAT.PLANT]: [39, 174, 96],
  [MAT.PLASMA]: [142, 68, 173],
  [MAT.PROPANE]: [255, 235, 205],
  [MAT.RAD_STEAM]: [191, 255, 0],
  [MAT.ROCK]: [128, 128, 128],
  [MAT.SALT]: [255, 255, 255],
  [MAT.SALTWATER]: [52, 152, 219],
  [MAT.SEED]: [211, 84, 0],
  [MAT.SELTZER]: [208, 240, 255],
  [MAT.SLAG]: [52, 73, 94],
  [MAT.SNOW]: [240, 248, 255],
  [MAT.STEEL]: [127, 140, 141],
  [MAT.SUGAR]: [255, 255, 255],
  [MAT.SUGAR_WATER]: [160, 216, 241],
  [MAT.SULFUR]: [241, 196, 15],
  [MAT.TREE_BRANCH]: [93, 64, 55],
  [MAT.VIRUS]: [0, 255, 0],
  [MAT.VOID]: [0, 0, 0],
  [MAT.WAX]: [255, 248, 220],
  [MAT.CHARCOAL]: [51, 51, 51],
  [MAT.DUST]: [187, 170, 153],
  [MAT.ELECTRON]: [0, 255, 255],
  [MAT.EXPLOSIVE]: [255, 68, 0],
  [MAT.FENCE]: [139, 69, 19],
  [MAT.FLUORINE]: [204, 255, 204],
  [MAT.GAS]: [224, 224, 224],
  [MAT.GLUE]: [240, 240, 240],
  [MAT.GUNPOWDER]: [68, 68, 68],
  [MAT.MAGMA]: [255, 51, 0],
  [MAT.MEAT]: [255, 182, 193],
  [MAT.MERCURY]: [176, 176, 176],
  [MAT.METAL]: [160, 160, 160],
  [MAT.MILK]: [255, 255, 255],
  [MAT.MOLTEN_GLASS]: [255, 69, 0],
  [MAT.MOLTEN_IRON]: [255, 102, 0],
  [MAT.MUSHROOM]: [244, 164, 96],
  [MAT.NITROGLYCERIN]: [241, 196, 15],
  [MAT.POISON_GAS]: [128, 0, 128],
  [MAT.PORCELAIN]: [253, 245, 230],
  [MAT.POWDER_METAL]: [153, 153, 153],
  [MAT.PROTON]: [255, 0, 0],
  [MAT.SLIME]: [50, 205, 50],
  [MAT.THERMITE]: [230, 126, 34],
  [MAT.WALL]: [51, 51, 51],
  [MAT.RUST]: [139, 69, 19],
};

export function render(ctx, engine, canvasW, canvasH) {
  const { grid, temp, charge, life, colorVar, width, height } = engine;
  const img = ctx.createImageData(width, height);
  const d = img.data;
  const t = performance.now() * 0.003;

  for (let i = 0; i < grid.length; i++) {
    const mat = grid[i];
    const pi = i * 4;

    if (mat === MAT.EMPTY) {
      d[pi] = 5; d[pi+1] = 5; d[pi+2] = 5; d[pi+3] = 255;
      continue;
    }

    const cv = colorVar[i];
    const lf = life[i];
    let r = 0, g = 0, b = 0, a = 255;

    switch (mat) {
      case MAT.FIRE: {
        const fl = Math.sin(t * 3 + i * 0.11) * 0.3 + 0.7;
        r = 255 * fl;
        g = Math.max(0, (80 + (lf > 0 ? lf : 30) * 2)) * fl;
        b = cv * 0.15;
        break;
      }
      case MAT.LAVA: {
        const p = Math.sin(t * 2 + i * 0.05) * 0.15 + 0.85;
        r = (200 + cv * 0.5) * p; g = (50 + cv * 0.8) * p; b = 10 * p;
        break;
      }
      case MAT.CORIUM: {
        const g2 = Math.sin(t * 4 + i * 0.2) * 0.3 + 0.7;
        r = 100 + 80 * g2; g = 255 * g2; b = 20;
        break;
      }
      case MAT.LIQUID_METAL: {
        const s = Math.sin(t * 5 + i * 0.3) * 20;
        r = Math.min(255, 180 + s + cv * 0.3);
        g = Math.min(255, 180 + s + cv * 0.3);
        b = Math.min(255, 195 + s);
        break;
      }
      case MAT.GLASS: {
        r = 168 + cv * 0.4; g = 212 + cv * 0.2; b = 230; a = 160;
        break;
      }
      case MAT.GLASS_SHARD: {
        r = 190 + cv * 0.3; g = 225 + cv * 0.2; b = 240; a = 180;
        break;
      }
      case MAT.WATER: {
        const w = Math.sin(t * 2 + i * 0.07) * 8;
        r = 20 + cv * 0.2; g = 100 + w + cv * 0.4; b = 220 + w * 0.5; a = 200;
        break;
      }
      case MAT.ICE: {
        const ic = Math.sin(t + i * 0.05) * 5;
        r = 176 + ic; g = 216 + ic; b = 240 + ic; a = 220;
        break;
      }
      case MAT.ACID: {
        const p2 = Math.sin(t * 3 + i * 0.15) * 15;
        r = 50 + p2; g = 240; b = 20; a = 200;
        break;
      }
      case MAT.SMOKE: {
        const lifeRatio = Math.max(0, (lf > 0 ? lf : 40) / 160);
        r = g = b = 100 + cv; a = (lifeRatio * 200) | 0;
        break;
      }
      case MAT.TOXIC_SMOKE: {
        const lifeRatio = Math.max(0, (lf > 0 ? lf : 40) / 160);
        r = 80; g = 110 + cv * 0.3; b = 30; a = (lifeRatio * 220) | 0;
        break;
      }
      case MAT.STEAM: {
        const lifeRatio = Math.max(0, (lf > 0 ? lf : 40) / 160);
        r = g = b = 210 + cv * 0.2; a = (lifeRatio * 160) | 0;
        break;
      }
      case MAT.NITROGEN: {
        const n = Math.sin(t * 4 + i * 0.2) * 10;
        r = 130 + n; g = 180 + n; b = 255; a = 210;
        break;
      }
      case MAT.COPPER: {
        // Show charge as bright spark
        const c2 = charge[i];
        if (c2 > 50) {
          const spark = Math.min(1, c2 / 400);
          r = Math.min(255, 184 + spark * 71); g = Math.min(255, 115 + spark * 140); b = Math.min(255, 51 + spark * 204);
        } else {
          r = 184 + cv * 0.2; g = 115 + cv * 0.3; b = 51 + cv * 0.2;
        }
        break;
      }
      case MAT.IRON: {
        // Rust: colorVar > 50 shifts toward red-brown
        const rust = cv / 200;
        r = 128 + rust * 60; g = 128 - rust * 40; b = 128 - rust * 50;
        break;
      }
      case MAT.TNT: {
        const flicker = Math.sin(t * 2 + i * 0.3) * 0.1 + 0.9;
        r = 200 * flicker; g = 30 * flicker; b = 20 * flicker;
        break;
      }
      case MAT.OXYGEN: {
        const lifeRatio = Math.max(0, (lf > 0 ? lf : 80) / 200);
        r = 180; g = 220; b = 255; a = (lifeRatio * 140) | 0;
        break;
      }
      case MAT.HYDROGEN: {
        const lifeRatio = Math.max(0, (lf > 0 ? lf : 80) / 200);
        r = 255; g = 240; b = 100; a = (lifeRatio * 140) | 0;
        break;
      }
      case MAT.HUMAN: {
        // HEAD: skin tone, flushes red when panicking
        const panicLevel = cv & 0x7F;
        const panicT = panicLevel / 100;
        r = Math.min(255, 240 + panicT * 15);
        g = Math.max(80, 190 - panicT * 100);
        b = Math.max(50, 155 - panicT * 100);
        a = 255;
        break;
      }
      case MAT.HUMAN_BODY: {
        const shirtSeed = cv & 0x3F; // bottom 6 bits = shirt color (0-63)
        const hue = (shirtSeed * 5.625) % 360;
        const h6 = hue / 60;
        const q = 0.81, p2 = 0.09;
        if (h6 < 1)      { r = q * 255; g = (p2 + (q - p2) * h6) * 255; b = p2 * 255; }
        else if (h6 < 2) { r = (p2 + (q - p2) * (2 - h6)) * 255; g = q * 255; b = p2 * 255; }
        else if (h6 < 3) { r = p2 * 255; g = q * 255; b = (p2 + (q - p2) * (h6 - 2)) * 255; }
        else if (h6 < 4) { r = p2 * 255; g = (p2 + (q - p2) * (4 - h6)) * 255; b = q * 255; }
        else if (h6 < 5) { r = (p2 + (q - p2) * (h6 - 4)) * 255; g = p2 * 255; b = q * 255; }
        else             { r = q * 255; g = p2 * 255; b = (p2 + (q - p2) * (6 - h6)) * 255; }
        a = 255;
        break;
      }
      case MAT.ELECTRICITY: {
        // Intense electric yellow, sporadic white-hot snaps
        const lifeRatio = lf > 0 ? Math.min(1, lf / 6) : 1;
        const flicker = Math.sin(t * 40 + i * 1.7) * 0.35 + 0.65;
        const snap = Math.sin(t * 60 + i * 2.9) > 0.4 ? 1 : 0;
        r = 255;
        g = Math.min(255, (210 + snap * 45) * flicker);
        b = Math.min(255, snap * 120 * flicker);
        a = Math.min(255, (lifeRatio * 255) | 0);
        break;
      }
      case MAT.MELTED_PLASTIC: {
        // Gooey translucent warm pink-orange
        const wobble = Math.sin(t * 2 + i * 0.08) * 10;
        r = Math.min(255, 255 + wobble * 0.5);
        g = Math.min(255, 100 + cv * 0.5 + wobble);
        b = Math.min(255, 150 + wobble);
        a = 220;
        break;
      }
      case MAT.DEAD_HUMAN: {
        // Pale floating corpse — waterlogged brownish-grey
        r = 160 + cv * 0.3; g = 120 + cv * 0.2; b = 100 + cv * 0.15; a = 230;
        break;
      }
      case MAT.BUBBLE: {
        // Translucent rising bubble with shimmer
        const bShimmer = Math.sin(t * 6 + i * 0.4) * 15;
        r = 160 + (bShimmer | 0); g = 210 + (bShimmer * 0.5 | 0); b = 255; a = 90 + (Math.abs(bShimmer) | 0);
        break;
      }


      case MAT.SAND:
      case MAT.DIRT:
      case MAT.DUST:
      case MAT.POWDER_METAL:
      case MAT.ASH:
      case MAT.GUNPOWDER:
      case MAT.SALT:
      case MAT.SUGAR:
      case MAT.FLOUR:
      case MAT.CONCRETE_POWDER:
      case MAT.THERMITE:
      case MAT.RUST: {
        const base = BASE_COLORS[mat];
        const noise = (cv - 20) * 0.8;
        r = base[0] + noise;
        g = base[1] + noise;
        b = base[2] + noise;
        break;
      }
      case MAT.IRON:
      case MAT.GOLD:
      case MAT.COPPER:
      case MAT.STEEL:
      case MAT.ALUMINUM:
      case MAT.METAL:
      case MAT.LIQUID_METAL:
      case MAT.MOLTEN_IRON: {
        const base = BASE_COLORS[mat];
        const shimmer = Math.sin(t * 3 + cv * 0.5) * 15;
        r = base[0] + shimmer + (cv - 20) * 0.3;
        g = base[1] + shimmer + (cv - 20) * 0.3;
        b = base[2] + shimmer + (cv - 20) * 0.5;
        break;
      }
      case MAT.WOOD:
      case MAT.TREE_BRANCH:
      case MAT.FENCE: {
        const grain = Math.sin(i * 0.7) * 12;
        r = 139 + grain + (cv - 20) * 0.4;
        g = 69 + grain + (cv - 20) * 0.2;
        b = 19 + grain;
        break;
      }
      case MAT.STONE:
      case MAT.ROCK:
      case MAT.BRICK:
      case MAT.CONCRETE:
      case MAT.WALL:
      case MAT.OBSIDIAN:
      case MAT.PORCELAIN: {
        const base = BASE_COLORS[mat] || [128, 128, 128];
        const speckle = (i % 7 === 0) ? -20 : (i % 13 === 0) ? 15 : 0;
        r = base[0] + speckle + (cv - 20) * 0.4;
        g = base[1] + speckle + (cv - 20) * 0.4;
        b = base[2] + speckle + (cv - 20) * 0.4;
        break;
      }
      case MAT.GRASS:
      case MAT.PLANT:
      case MAT.LEAF:
      case MAT.LEAVES:
      case MAT.ALGAE:
      case MAT.MUSHROOM: {
        const sway = Math.sin(t + i * 0.03) * 10;
        const base = BASE_COLORS[mat] || [39, 174, 96];
        r = base[0] + sway;
        g = base[1] + sway * 1.5 + (cv - 20) * 0.5;
        b = base[2] + sway * 0.5;
        break;
      }
      case MAT.MERCURY: {
        const shine = Math.sin(t * 4 + i * 0.1) * 25 + 200;
        r = g = b = shine;
        break;
      }
      case MAT.SLIME: {
        const goo = Math.sin(t * 2 + i * 0.05) * 10;
        r = 50 + goo; g = 205 + goo; b = 50 + goo; a = 210;
        break;
      }
      case MAT.HONEY: {
        r = 212 + (cv - 20) * 0.2; g = 175 + (cv - 20) * 0.3; b = 55; a = 230;
        break;
      }
      case MAT.MILK: {
        r = g = b = 255 - (cv % 10); a = 255;
        break;
      }
      case MAT.BLOOD: {
        const pulse = Math.sin(t * 1.5 + i * 0.02) * 5;
        r = 138 + pulse; g = 3; b = 3; a = 230;
        break;
      }
      case MAT.POISON_GAS: {
        const drift = Math.sin(t + i * 0.1) * 20;
        r = 128 + drift; g = 0; b = 128 + drift; a = 140;
        break;
      }
      default: {
        const base = BASE_COLORS[mat];
        if (base) {
          r = base[0] + (cv - 20) * 0.5;
          g = base[1] + (cv - 20) * 0.4;
          b = base[2] + (cv - 20) * 0.3;
        } else { r = g = b = 128; }
      }
    }

    d[pi]   = Math.max(0, Math.min(255, r));
    d[pi+1] = Math.max(0, Math.min(255, g));
    d[pi+2] = Math.max(0, Math.min(255, b));
    d[pi+3] = a;
  }

  // Blit scaled to canvas
  const tmp = document.createElement('canvas');
  tmp.width = width; tmp.height = height;
  tmp.getContext('2d').putImageData(img, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(tmp, 0, 0, canvasW, canvasH);
}