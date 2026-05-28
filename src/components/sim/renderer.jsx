import { MAT } from './materials';

function hex(c) {
  const v = parseInt(c.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

const BASE_COLORS = {
  [MAT.SAND]:        hex('#e8c97a'),
  [MAT.LEAVES]:      hex('#4a7c3f'),
  [MAT.OBSIDIAN]:    hex('#1a0a2e'),
  [MAT.IRON]:        hex('#808080'),
  [MAT.ALUMINUM]:    hex('#d4d4d4'),
  [MAT.ASH]:         hex('#555555'),
  [MAT.EMBER]:       hex('#ff6600'),
  [MAT.STONE]:       hex('#888877'),
  [MAT.WOOD]:        hex('#8b4513'),
  [MAT.ICE]:         hex('#b0d8f0'),
  [MAT.COPPER]:      hex('#b87333'),
  [MAT.TNT]:         hex('#cc2200'),
  [MAT.GLASS_SHARD]: hex('#c8e8f8'),
  [MAT.FUMES]:       hex('#99aa22'),
  [MAT.PLASTIC]:     hex('#ff69b4'),
  [MAT.OIL]:         hex('#3d2b1f'),
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