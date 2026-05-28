import { MAT, MATERIALS, ACID_IMMUNE, CONDUCTORS, DANGEROUS } from './materials';

const rng = Math.random;

export function createEngine(width, height) {
  const size = width * height;
  const grid = new Uint8Array(size);
  const temp = new Float32Array(size);
  const charge = new Float32Array(size);   // electrical charge
  const life = new Int16Array(size);
  const colorVar = new Uint8Array(size);   // also encodes human panic/state
  const updated = new Uint8Array(size);
  let _paused = false;
  let frameCount = 0;

  // ─── Accessors ───────────────────────────────────────────────────────────────
  function idx(x, y) { return y * width + x; }
  function inBounds(x, y) { return x >= 0 && x < width && y >= 0 && y < height; }
  function get(x, y) { return inBounds(x, y) ? grid[idx(x, y)] : -1; }
  function isEmpty(x, y) { return inBounds(x, y) && grid[idx(x, y)] === MAT.EMPTY; }
  function getTemp(x, y) { return inBounds(x, y) ? temp[idx(x, y)] : 20; }
  function getDef(mat) { return MATERIALS[mat] || MATERIALS[MAT.EMPTY]; }

  function set(x, y, mat, t, l) {
    if (!inBounds(x, y)) return;
    const i = idx(x, y);
    grid[i] = mat;
    const def = getDef(mat);
    temp[i] = t !== undefined ? t : def.baseTemp;
    life[i] = l !== undefined ? l : defaultLife(mat);
    colorVar[i] = (rng() * 40) | 0;
    charge[i] = 0;
  }

  function defaultLife(mat) {
    if (mat === MAT.FIRE) return 50 + (rng() * 40) | 0;
    if (mat === MAT.ELECTRICITY) return 4 + (rng() * 4) | 0;
    if (mat === MAT.SMOKE || mat === MAT.TOXIC_SMOKE || mat === MAT.FUMES) return 80 + (rng() * 80) | 0;
    if (mat === MAT.STEAM) return 100 + (rng() * 60) | 0;
    if (mat === MAT.EMBER) return 30 + (rng() * 30) | 0;
    if (mat === MAT.OXYGEN || mat === MAT.HYDROGEN) return 120 + (rng() * 80) | 0;
    return -1;
  }

  function swap(x1, y1, x2, y2) {
    const i1 = idx(x1, y1), i2 = idx(x2, y2);
    [grid[i1], grid[i2]] = [grid[i2], grid[i1]];
    [temp[i1], temp[i2]] = [temp[i2], temp[i1]];
    [life[i1], life[i2]] = [life[i2], life[i1]];
    [colorVar[i1], colorVar[i2]] = [colorVar[i2], colorVar[i1]];
    [charge[i1], charge[i2]] = [charge[i2], charge[i1]];
  }

  function clear() {
    grid.fill(0); temp.fill(20); life.fill(-1); charge.fill(0);
  }

  function spawnHuman(x, y) {
    if (!inBounds(x, y) || !inBounds(x, y + 1)) return;
    if (grid[idx(x, y)] !== MAT.EMPTY || grid[idx(x, y + 1)] !== MAT.EMPTY) return;
    const speed = (rng() * 4) | 0;
    const canSwim = rng() < 0.6 ? 1 : 0;  // ~40% of people can't swim (real-world stat)
    const shirtCol = (rng() * 32) | 0;    // bits 0-4 (32 shirt hues)
    const dir = rng() < 0.5 ? 0 : 128;
    const hi = idx(x, y), bi = idx(x, y + 1);
    grid[hi] = MAT.HUMAN; temp[hi] = 37; life[hi] = 100; colorVar[hi] = dir; charge[hi] = 0;
    grid[bi] = MAT.HUMAN_BODY; temp[bi] = 37; life[bi] = -1; colorVar[bi] = (speed << 6) | (canSwim << 5) | shirtCol;
  }

  function place(cx, cy, mat, brushSize) {
    // AIR = eraser
    if (mat === MAT.AIR) {
      const r = brushSize;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (dx * dx + dy * dy > r * r) continue;
          const x = cx + dx, y = cy + dy;
          if (!inBounds(x, y)) continue;
          const m = grid[idx(x, y)];
          if (m === MAT.HUMAN || m === MAT.HUMAN_BODY) continue;
          const ii = idx(x, y);
          // In a liquid: create a visible bubble instead of instantly erasing
          if (MATERIALS[m] && MATERIALS[m].state === 1) {
            grid[ii] = MAT.BUBBLE; temp[ii] = 20; life[ii] = -1; colorVar[ii] = (rng() * 40) | 0; charge[ii] = 0;
          } else {
            grid[ii] = MAT.EMPTY; temp[ii] = 20;
          }
        }
      }
      return;
    }
    // HUMAN: spawn scattered individuals, not a dense brush fill
    if (mat === MAT.HUMAN) {
      const count = 1 + Math.round(brushSize * 0.6);
      for (let n = 0; n < count; n++) {
        const ox = Math.round((rng() * 2 - 1) * brushSize * 2.5);
        spawnHuman(cx + ox, cy);
      }
      return;
    }
    const r = brushSize;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy > r * r) continue;
        const x = cx + dx, y = cy + dy;
        if (!inBounds(x, y)) continue;
        const cur = grid[idx(x, y)];
        if (cur === MAT.EMPTY || rng() < 0.3) {
          set(x, y, mat);
          if (mat === MAT.COPPER && rng() < 0.1) charge[idx(x, y)] = 800;
          if (mat === MAT.ELECTRICITY) charge[idx(x, y)] = 1000;
        }
      }
    }
  }

  // ─── Explosion ───────────────────────────────────────────────────────────────
  function explode(cx, cy, radius) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius) continue;
        const x = cx + dx, y = cy + dy;
        if (!inBounds(x, y)) continue;
        const i = idx(x, y);
        const mat = grid[i];
        if (MATERIALS[mat]?.explosionResistant) continue;
        // Inner core = fire, outer ring = smoke, edges = ash
        if (dist < radius * 0.4) {
          set(x, y, MAT.FIRE);
          temp[i] = 1200;
        } else if (dist < radius * 0.7) {
          if (rng() < 0.6) { set(x, y, MAT.FIRE); temp[i] = 900; }
          else { set(x, y, MAT.SMOKE); }
        } else {
          if (rng() < 0.3) set(x, y, MAT.ASH);
          else { grid[i] = MAT.EMPTY; temp[i] = 20; }
        }
      }
    }
  }

  // ─── Thermal diffusion pass ───────────────────────────────────────────────────
  function thermalPass() {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = idx(x, y);
        const mat = grid[i];
        if (mat === MAT.EMPTY) continue;
        const tc = getDef(mat).thermalConductivity;
        for (const [dx, dy] of dirs) {
          const nx = x + dx, ny = y + dy;
          if (!inBounds(nx, ny)) continue;
          const ni = idx(nx, ny);
          const nmat = grid[ni];
          const ntc = getDef(nmat).thermalConductivity;
          const conductance = (tc + ntc) * 0.5;
          // Heat rises: upward transfer is boosted, downward is resisted
          const vertBias = (dx === 0 && dy === -1) ? 2.5 : (dx === 0 && dy === 1) ? 0.3 : 1.0;
          const diff = (temp[i] - temp[ni]) * conductance * 0.25 * vertBias;
          temp[i] -= diff;
          temp[ni] += diff;
        }
        // Ambient cooling (once per cell per frame)
        temp[i] -= (temp[i] - 20) * 0.0003;
      }
    }
  }

  // ─── Electrical pass ─────────────────────────────────────────────────────────
  function electricalPass() {
    if (frameCount % 3 !== 0) return;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = idx(x, y);
        if (charge[i] <= 0) continue;
        const mat = grid[i];
        if (!CONDUCTORS.has(mat)) { charge[i] *= 0.9; continue; }
        const ec = getDef(mat).electricalConductivity;
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
        for (const [dx, dy] of dirs) {
          const nx = x + dx, ny = y + dy;
          if (!inBounds(nx, ny)) continue;
          const ni = idx(nx, ny);
          const nmat = grid[ni];
          // Electrolysis: electricity through water → O2 + H2
          if (nmat === MAT.WATER && charge[i] > 100) {
            if (rng() < 0.05) {
              set(nx, ny, rng() < 0.5 ? MAT.OXYGEN : MAT.HYDROGEN);
              charge[ni] = 0;
            }
            continue;
          }
          // TNT detonation by electricity
          if (nmat === MAT.TNT && charge[i] > 50) {
            explode(nx, ny, 8);
            continue;
          }
          // Ignite flammable gas
          if ((nmat === MAT.HYDROGEN || nmat === MAT.OIL) && charge[i] > 50) {
            set(nx, ny, MAT.FIRE);
            continue;
          }
          if (CONDUCTORS.has(nmat)) {
            const transfer = charge[i] * ec * 0.4;
            charge[i] -= transfer;
            charge[ni] += transfer * getDef(nmat).electricalConductivity;
          }
        }
        // Arcing: high charge can jump 1-2 empty cells to reach conductor
        if (charge[i] > 400) {
          const arcDirs = [[2,0],[-2,0],[0,2],[0,-2],[1,1],[1,-1],[-1,1],[-1,-1]];
          for (const [dx, dy] of arcDirs) {
            const nx = x + dx, ny = y + dy;
            if (!inBounds(nx, ny)) continue;
            const nmat = grid[idx(nx, ny)];
            if (CONDUCTORS.has(nmat) && rng() < 0.05) {
              charge[idx(nx, ny)] += charge[i] * 0.2;
              charge[i] *= 0.5;
            }
          }
        }
        // Decay
        charge[i] *= 0.85;
        if (charge[i] < 1) charge[i] = 0;
      }
    }
  }

  // ─── Human logic (HEAD drives 2-cell entity) ────────────────────────────────
  function killHuman(hx, hy, cause) {
    const bi = idx(hx, hy + 1);
    if (cause === 'burn') {
      set(hx, hy, MAT.ASH);
      if (inBounds(hx, hy + 1)) set(hx, hy + 1, MAT.ASH);
    } else if (cause === 'acid') {
      grid[idx(hx, hy)] = MAT.EMPTY; temp[idx(hx, hy)] = 20;
      if (inBounds(hx, hy + 1)) { grid[bi] = MAT.FUMES; life[bi] = 60; }
    } else if (cause === 'drown') {
      // Clear cells cleanly — no debris or bubbles to leave streaks
      grid[idx(hx, hy)] = MAT.EMPTY; temp[idx(hx, hy)] = 20;
      if (inBounds(hx, hy + 1)) { grid[bi] = MAT.EMPTY; temp[bi] = 20; }
    } else {
      grid[idx(hx, hy)] = MAT.EMPTY; temp[idx(hx, hy)] = 20;
      if (inBounds(hx, hy + 1)) { grid[bi] = MAT.EMPTY; temp[bi] = 20; }
    }
  }

  function moveHumanTo(hx, hy, nx, ny) {
    const hi = idx(hx, hy), hbi = idx(hx, hy + 1);
    const hcv = colorVar[hi], hch = charge[hi], hl = life[hi], htemp = temp[hi];
    const bcv = inBounds(hx, hy + 1) ? colorVar[hbi] : 0;

    // Save destination materials BEFORE writing (for proper liquid displacement)
    const save = (x, y) => inBounds(x, y) ? { m: grid[idx(x,y)], t: temp[idx(x,y)], cv: colorVar[idx(x,y)] } : { m: MAT.EMPTY, t: 20, cv: 0 };
    const dh = save(nx, ny);
    const db = save(nx, ny + 1);

    // Old/new cell sets to figure out which cells are freed vs overlapped
    const oldCells = [[hx, hy], [hx, hy + 1]];
    const newCells = [[nx, ny], [nx, ny + 1]];
    const inNew = (x, y) => newCells.some(([cx,cy]) => cx===x && cy===y);
    const inOld = (x, y) => oldCells.some(([cx,cy]) => cx===x && cy===y);

    // Displaced = new cells not overlapping old (these hold the liquid to backfill)
    const displaced = newCells
      .map(([x,y], i) => inOld(x,y) ? null : (i===0 ? dh : db))
      .filter(Boolean);
    // Freed = old cells not covered by new position
    const freed = oldCells.filter(([x,y]) => !inNew(x,y));

    // Write human to new position first
    if (inBounds(nx, ny)) {
      const ni = idx(nx, ny);
      grid[ni] = MAT.HUMAN; colorVar[ni] = hcv; life[ni] = hl; temp[ni] = htemp; charge[ni] = hch; updated[ni] = 1;
    }
    if (inBounds(nx, ny + 1)) {
      const nbi = idx(nx, ny + 1);
      grid[nbi] = MAT.HUMAN_BODY; colorVar[nbi] = bcv; life[nbi] = -1; temp[nbi] = htemp; updated[nbi] = 1;
    }

    // Backfill freed cells — never inherit colorVar from displaced data, always
    // assign a fresh one to prevent human color data leaking into the world
    freed.forEach(([x, y], i) => {
      if (!inBounds(x, y)) return;
      const fill = displaced[i] || { m: MAT.EMPTY, t: 20, cv: 0 };
      let m = (fill.m === MAT.HUMAN || fill.m === MAT.HUMAN_BODY) ? MAT.EMPTY : fill.m;
      // Don't destroy water when moving into empty air — preserve submerged liquids
      if (m === MAT.EMPTY) {
        const curMat = grid[idx(x, y)];
        if (curMat !== MAT.EMPTY && getDef(curMat).state === 1) {
          m = curMat;
        }
      }
      const ii = idx(x, y);
      grid[ii] = m;
      temp[ii] = m === MAT.EMPTY ? 20 : fill.t;
      colorVar[ii] = (rng() * 40) | 0; // always fresh — never inherit human values
      updated[ii] = 1;
    });
  }

  function canHumanOccupy(tx, ty, fromX, fromY) {
    // Can a human whose current head is at (fromX,fromY) move head to (tx,ty)?
    if (!inBounds(tx, ty) || !inBounds(tx, ty + 1)) return false;
    const own = (x, y) => (x === fromX && (y === fromY || y === fromY + 1));
    const passable = (x, y) => {
      if (own(x, y)) return true;  // own cells will be vacated
      const m = grid[idx(x, y)];
      if (m === MAT.EMPTY) return true;
      const st = getDef(m).state;
      return st === 1 || st === 2 || st === 4 || st === 5; // liquid, gas, fire, electricity are passable
    };
    return passable(tx, ty) && passable(tx, ty + 1);
  }

  function isSolid(x, y) {
    if (!inBounds(x, y)) return true;
    const m = grid[idx(x, y)];
    if (m === MAT.EMPTY) return false;
    const st = getDef(m).state;
    // Only true solids (state=0) and powders (state=3) count as ground; liquids/gases/fire/electricity do not
    return (st === 0 || st === 3) && m !== MAT.HUMAN && m !== MAT.HUMAN_BODY;
  }

  function updateHuman(x, y) {
    const i = idx(x, y);
    // Verify body is below
    const bodyMat = get(x, y + 1);
    if (bodyMat !== MAT.HUMAN_BODY) {
      // Detached — die
      grid[i] = MAT.EMPTY; temp[i] = 20;
      return;
    }

    // colorVar: bits 0-6 = panic, bit 7 = direction
    let panic = colorVar[i] & 0x7F;
    let dir = (colorVar[i] >> 7) & 1 ? 1 : -1;
    let health = life[i] > 0 ? life[i] : 100;

    // Check surrounding 5-cell radius for danger
    let nearDanger = false;
    for (let dy = -5; dy <= 5 && !nearDanger; dy++) {
      for (let dx = -5; dx <= 5 && !nearDanger; dx++) {
        if (dx * dx + dy * dy > 25) continue;
        if (DANGEROUS.has(get(x + dx, y + dy))) nearDanger = true;
      }
    }
    panic = nearDanger ? Math.min(100, panic + 10) : Math.max(0, panic - 3);

    // Damage from adjacent cells (check head AND body neighbors)
    const checkPositions = [[x,y],[x,y+1]];
    for (const [px, py] of checkPositions) {
      for (const [dx,dy] of [[0,1],[0,-1],[1,0],[-1,0]]) {
        const nm = get(px+dx, py+dy);
        if (nm === MAT.HUMAN || nm === MAT.HUMAN_BODY) continue;
        if (nm === MAT.FIRE || nm === MAT.LAVA || nm === MAT.CORIUM) { health -= 20; temp[i] += 50; panic = 100; }
        if (nm === MAT.ACID) { health -= 40; panic = 100; }
        if (nm === MAT.LIQUID_METAL) { health -= 25; temp[i] += 80; panic = 100; }
      }
    }

    // Death
    if (health <= 0) { killHuman(x, y, 'normal'); return; }
    if (temp[i] > 350) { killHuman(x, y, 'burn'); return; }
    // Check if acid adjacent
    const acided = [[x,y],[x,y+1]].some(([px,py]) =>
      [[0,1],[0,-1],[1,0],[-1,0]].some(([dx,dy]) => get(px+dx,py+dy) === MAT.ACID));
    if (acided && health < 30) { killHuman(x, y, 'acid'); return; }

    life[i] = health;

    // Read swim traits from body colorVar before any swim logic
    const bodyCv = inBounds(x, y + 1) ? colorVar[idx(x, y + 1)] : 0;
    const speedTier = (bodyCv >> 6) & 3;  // 0=slowest, 3=fastest
    const canSwim   = (bodyCv >> 5) & 1;  // 0=can't swim (~40%), 1=can swim
    const drownThreshold = canSwim ? 150 + speedTier * 75 : 45;

    // Always tick drowning clock every frame (not gated by tickRate)
    const liquidAboveHead = getDef(get(x, y - 1)).state === 1;
    const liquidBelowBody = getDef(get(x, y + 2)).state === 1;
    // Non-swimmers panic and tire twice as fast
    if (liquidAboveHead) charge[i] = Math.min(450, charge[i] + (canSwim ? 1 : 2));
    const baseRate = 5 - speedTier;       // 5,4,3,2 frames per step
    const tickRate = panic > 70 ? 1 : panic > 40 ? Math.max(1, baseRate - 1) : baseRate;
    if (frameCount % tickRate !== 0) {
      colorVar[i] = (panic & 0x7F) | ((dir === 1 ? 1 : 0) << 7);
      return;
    }

    // Erratic direction change when panicking
    if (panic > 50 && rng() < 0.35) dir = rng() < 0.5 ? 1 : -1;

    const groundY = y + 2;
    const swimFatigue = charge[i]; // read after pre-gate update
    // ── DROWNING CLOCK ──
    // atSurface: head above water, body touching liquid, already been submerged
    const atSurface = !liquidAboveHead && liquidBelowBody && swimFatigue > 3;

    if (liquidAboveHead) {
      // charge[i] is already incremented pre-gate above
      if (swimFatigue < 3) {
        // Brief sinking phase: initial inertia of falling in
        // Add horizontal drift to prevent straight vertical plumes
        if (rng() < 0.3) {
          const driftDir = rng() < 0.5 ? 1 : -1;
          if (canHumanOccupy(x + driftDir, y + 1, x, y)) { moveHumanTo(x, y, x + driftDir, y + 1); return; }
        }
        if (canHumanOccupy(x, y + 1, x, y)) { moveHumanTo(x, y, x, y + 1); return; }
      } else if (canSwim && swimFatigue < drownThreshold) {
        // Buoyancy phase: push head toward surface
        // Random diagonal ascent to prevent straight vertical plumes
        if (canHumanOccupy(x, y - 1, x, y)) {
          if (rng() < 0.2) {
            const driftDir = rng() < 0.5 ? 1 : -1;
            if (canHumanOccupy(x + driftDir, y - 1, x, y)) { moveHumanTo(x, y, x + driftDir, y - 1); return; }
          }
          moveHumanTo(x, y, x, y - 1); return;
        }
        const sdir = rng() < 0.5 ? 1 : -1;
        if (canHumanOccupy(x + sdir, y, x, y)) { moveHumanTo(x, y, x + sdir, y); return; }
        if (canHumanOccupy(x - sdir, y, x, y)) { moveHumanTo(x, y, x - sdir, y); return; }
      } else {
        // Exhausted or can't swim — drown
        // Non-swimmers get an extended panicked flailing phase (they thrash
        // upward trying to reach the surface before their breath runs out)
        if (!canSwim && swimFatigue < 45 && rng() < 0.5) {
          if (canHumanOccupy(x, y - 1, x, y)) { moveHumanTo(x, y, x, y - 1); return; }
          // Also try diagonally
          const flailDir = rng() < 0.5 ? 1 : -1;
          if (canHumanOccupy(x + flailDir, y - 1, x, y)) { moveHumanTo(x, y, x + flailDir, y - 1); return; }
          if (canHumanOccupy(x + flailDir, y, x, y)) { moveHumanTo(x, y, x + flailDir, y); return; }
        }
        panic = 100;
        health -= canSwim ? 3 : 4; // slower drown damage for non-swimmers too
        life[i] = health;
        if (health <= 0) { killHuman(x, y, 'drown'); return; }
        if (canHumanOccupy(x, y + 1, x, y)) { moveHumanTo(x, y, x, y + 1); }
      }
    } else if (atSurface) {
      // ── AT SURFACE: catching breath ──
      const recoveryRate = canSwim ? 3 + speedTier * 2 : 2;
      charge[i] = Math.max(0, swimFatigue - recoveryRate);
      // Bob up 1 cell so the head is clearly above the water surface
      if (swimFatigue > 20 && canHumanOccupy(x, y - 1, x, y)) {
        moveHumanTo(x, y, x, y - 1);
        charge[idx(x, y - 1)] = 12; // cap fatigue to prevent re-bobbing
        return;
      }
      const snx = x + dir;
      if (canHumanOccupy(snx, y, x, y)) { moveHumanTo(x, y, snx, y); return; }
      dir = -dir;
      const snx2 = x + dir;
      if (canHumanOccupy(snx2, y, x, y)) { moveHumanTo(x, y, snx2, y); return; }
    } else {
      // ── ON LAND / ENTERING WATER ──
      charge[i] = Math.max(0, swimFatigue - 2);
      if (!isSolid(x, groundY)) {
        // Fall (or sink into water from above)
        // Random horizontal drift while falling to prevent straight vertical lines
        if (rng() < 0.15) {
          const driftDir = rng() < 0.5 ? 1 : -1;
          if (canHumanOccupy(x + driftDir, y + 1, x, y)) { moveHumanTo(x, y, x + driftDir, y + 1); return; }
        }
        if (canHumanOccupy(x, y + 1, x, y)) { moveHumanTo(x, y, x, y + 1); return; }
      } else {
        // ── HUMANLIKE BEHAVIOR ON LAND ──
        // When calm, humans stand still and look around sometimes
        const isPanicking = panic > 30;
        const standStillChance = isPanicking ? 0.05 : 0.35;
        const turnChance = isPanicking ? 0.08 : 0.15;

        if (rng() < standStillChance) {
          // Just stand there — maybe look around
          if (rng() < turnChance) dir = -dir;
          colorVar[i] = (panic & 0x7F) | ((dir === 1 ? 1 : 0) << 7);
          return;
        }

        // Check for danger ahead/below to jump
        const dangerAhead = DANGEROUS.has(get(x + dir, y)) || DANGEROUS.has(get(x + dir, y + 1));
        const dangerBelow = DANGEROUS.has(get(x, groundY));
        if ((dangerAhead || dangerBelow || (panic > 80 && rng() < 0.12)) && canHumanOccupy(x, y - 1, x, y)) {
          moveHumanTo(x, y, x, y - 1);
        } else {
          // Walk: flat, step-up, or step-down for diagonal terrain
          const nx = x + dir;
          if (canHumanOccupy(nx, y, x, y) && isSolid(nx, groundY)) {
            moveHumanTo(x, y, nx, y);
          } else if (canHumanOccupy(nx, y - 1, x, y) && isSolid(nx, y + 1)) {
            moveHumanTo(x, y, nx, y - 1); // step up
          } else if (canHumanOccupy(nx, y + 1, x, y) && isSolid(nx, y + 3)) {
            moveHumanTo(x, y, nx, y + 1); // step down diagonal
          } else {
            dir = -dir;
            const nx2 = x + dir;
            if (canHumanOccupy(nx2, y, x, y) && isSolid(nx2, groundY)) {
              moveHumanTo(x, y, nx2, y);
            } else if (canHumanOccupy(nx2, y - 1, x, y) && isSolid(nx2, y + 1)) {
              moveHumanTo(x, y, nx2, y - 1);
            } else if (canHumanOccupy(nx2, y + 1, x, y) && isSolid(nx2, y + 3)) {
              moveHumanTo(x, y, nx2, y + 1);
            }
          }
        }
      }
    }

    colorVar[i] = (panic & 0x7F) | ((dir === 1 ? 1 : 0) << 7);
  }

  // ─── State transitions ────────────────────────────────────────────────────────
  function checkStateTransition(x, y) {
    const i = idx(x, y);
    const mat = grid[i];
    const t = temp[i];
    const def = getDef(mat);

    // ICE → WATER
    if (mat === MAT.ICE && t > 0) { set(x, y, MAT.WATER, t); return true; }
    // WATER → STEAM
    if (mat === MAT.WATER && t > 100) { set(x, y, MAT.STEAM, t); return true; }
    // WATER → ICE
    if (mat === MAT.WATER && t < 0) { set(x, y, MAT.ICE, t); return true; }
    // STEAM condenses
    if (mat === MAT.STEAM && t < 80) { grid[i] = MAT.WATER; temp[i] = 60; return true; }
    // IRON melts
    if (mat === MAT.IRON && t > 1538) { set(x, y, MAT.LIQUID_METAL, t); return true; }
    // ALUMINUM melts
    if (mat === MAT.ALUMINUM && t > 660) { set(x, y, MAT.LIQUID_METAL, t); return true; }
    // COPPER melts
    if (mat === MAT.COPPER && t > 1085) { set(x, y, MAT.LIQUID_METAL, t); return true; }
    // LIQUID METAL solidifies
    if (mat === MAT.LIQUID_METAL && t < 500) { set(x, y, MAT.IRON, t); return true; }
    // PLASTIC: becomes pink liquid at melt point, then ignites
    if (mat === MAT.PLASTIC) {
      if (t > def.ignitePoint) { set(x, y, MAT.FIRE); return true; }
      if (t > def.meltPoint) { set(x, y, MAT.MELTED_PLASTIC, t); return true; }
    }
    // LAVA hardens
    if (mat === MAT.LAVA && t < 600) { set(x, y, MAT.OBSIDIAN, t); return true; }
    // SAND melts at extreme heat
    if (mat === MAT.SAND && t > 1700) { set(x, y, MAT.GLASS, t); return true; }
    // GLASS melts back to liquid sand-like (lava)
    if (mat === MAT.GLASS && t > 1500) { set(x, y, MAT.LAVA, t); return true; }
    // NITROGEN boils (very low boiling point)
    if (mat === MAT.NITROGEN && t > -196) {
      if (rng() < 0.02) { set(x, y, MAT.STEAM, -100); return true; }
    }
    // TNT ignites
    if (mat === MAT.TNT && t > 200) { explode(x, y, 8); return true; }
    // Flammable materials ignite
    if (def.flammable && t > def.ignitePoint) {
      if (mat === MAT.PLASTIC) { set(x, y, MAT.FIRE); }
      else if (mat === MAT.WOOD || mat === MAT.LEAVES) { set(x, y, MAT.FIRE); }
      else if (mat === MAT.OIL) { set(x, y, MAT.FIRE); }
      return true;
    }
    // Wood/organic → ash after prolonged heat
    if (mat === MAT.WOOD && t > 400) { set(x, y, rng() < 0.5 ? MAT.ASH : MAT.EMBER); return true; }
    // Human burns
    if ((mat === MAT.HUMAN || mat === MAT.HUMAN_BODY) && t > 300) {
      if (mat === MAT.HUMAN) updateHuman(x, y);
      return true;
    }
    return false;
  }

  // ─── Neighbor reactions ───────────────────────────────────────────────────────
  function neighborReactions(x, y) {
    const i = idx(x, y);
    const mat = grid[i];
    const dirs4 = [[0,1],[0,-1],[1,0],[-1,0]];

    for (const [dx, dy] of dirs4) {
      const nx = x + dx, ny = y + dy;
      if (!inBounds(nx, ny)) continue;
      const ni = idx(nx, ny);
      const nmat = grid[ni];

      // FIRE interactions
      if (mat === MAT.FIRE) {
        if (nmat === MAT.WATER) { set(x, y, MAT.STEAM, 150); return; }
        if (nmat === MAT.ICE) { set(nx, ny, MAT.WATER, 40); }
        if (nmat === MAT.HYDROGEN && rng() < 0.6) { explode(nx, ny, 6); return; }
        if (nmat === MAT.OIL && rng() < 0.4) { set(nx, ny, MAT.FIRE); temp[ni] = 800; }
        if (MATERIALS[nmat]?.flammable && temp[ni] > MATERIALS[nmat].ignitePoint * 0.7 && rng() < 0.06) {
          set(nx, ny, MAT.FIRE);
        }
        temp[ni] = Math.min(temp[ni] + 30, 1200);
      }

      // LAVA interactions
      if (mat === MAT.LAVA) {
        if (nmat === MAT.WATER) { set(x, y, MAT.OBSIDIAN, 400); set(nx, ny, MAT.STEAM, 200); return; }
        if (nmat === MAT.GLASS || nmat === MAT.GLASS_SHARD) {
          temp[ni] = Math.min(temp[ni] + 120, 2000);
          if (temp[ni] > 1500 && rng() < 0.3) { set(nx, ny, MAT.LAVA, temp[ni]); }
        }
        // Lava + sand → glass (lava vitrifies sand directly)
        if (nmat === MAT.SAND && rng() < 0.025) { set(nx, ny, MAT.GLASS, temp[ni]); }
        // Lava flows over / reacts with liquid metal — superheated mix produces obsidian shards + smoke
        if (nmat === MAT.LIQUID_METAL) {
          if (rng() < 0.008) { set(nx, ny, MAT.OBSIDIAN, 900); }
          else { temp[ni] = Math.min(temp[ni] + 60, 3000); } // heat up liquid metal
        }
        if (MATERIALS[nmat]?.flammable && rng() < 0.15) { set(nx, ny, MAT.FIRE); }
        temp[ni] = Math.min(temp[ni] + 80, 1500);
      }

      // ELECTRICITY: charge conductors, zap flammables, explode TNT, electrolysis
      if (mat === MAT.ELECTRICITY) {
        if (nmat === MAT.TNT) { explode(nx, ny, 8); return; }
        if (nmat === MAT.HYDROGEN && rng() < 0.9) { explode(nx, ny, 5); return; }
        if ((nmat === MAT.OIL || nmat === MAT.LEAVES || nmat === MAT.WOOD) && rng() < 0.5) { set(nx, ny, MAT.FIRE); }
        if (nmat === MAT.WATER && rng() < 0.08) { set(nx, ny, rng() < 0.5 ? MAT.OXYGEN : MAT.HYDROGEN); }
        if (CONDUCTORS.has(nmat) && nmat !== MAT.ELECTRICITY) {
          // Surge charge into adjacent conductor
          charge[ni] = Math.min(charge[ni] + charge[i] * 0.6, 1200);
          temp[ni] = Math.min(temp[ni] + 40, 1500); // resistive heating
        }
      }

      // CORIUM melts everything
      if (mat === MAT.CORIUM && nmat !== MAT.EMPTY && nmat !== MAT.CORIUM) {
        if (rng() < 0.07) {
          grid[ni] = rng() < 0.4 ? MAT.SMOKE : MAT.EMPTY;
          temp[ni] = 20;
        }
        temp[ni] = Math.min(temp[ni] + 100, 3000);
      }

      // ACID dissolves (not glass, not plastic, not obsidian)
      if (mat === MAT.ACID && nmat !== MAT.EMPTY && !ACID_IMMUNE.has(nmat)) {
        if (rng() < 0.04) {
          grid[ni] = MAT.FUMES;
          life[ni] = defaultLife(MAT.FUMES);
          // Acid consumes itself too
          if (rng() < 0.2) { grid[i] = MAT.FUMES; life[i] = defaultLife(MAT.FUMES); return; }
        }
      }
      // ACID + WATER = diluted (slower)
      if (mat === MAT.ACID && nmat === MAT.WATER && rng() < 0.001) {
        grid[i] = MAT.WATER; temp[i] = 20; return;
      }

      // LIQUID METAL + WATER = violent steam
      if (mat === MAT.LIQUID_METAL && nmat === MAT.WATER) {
        if (rng() < 0.2) { set(nx, ny, MAT.STEAM, 500); }
      }

      // NITROGEN rapidly cools neighbors
      if (mat === MAT.NITROGEN) {
        temp[ni] = Math.max(-200, temp[ni] - 80);
        temp[i] = Math.max(-196, temp[i] - 5);
      }

      // EMBER ignites
      if (mat === MAT.EMBER && MATERIALS[nmat]?.flammable && rng() < 0.08) {
        set(nx, ny, MAT.FIRE);
      }

      // PLASTIC produces toxic smoke when burning nearby
      if (mat === MAT.FIRE && nmat === MAT.PLASTIC && rng() < 0.05) {
        // spawn toxic smoke above
        if (inBounds(x, y - 1) && isEmpty(x, y - 1)) set(x, y - 1, MAT.TOXIC_SMOKE);
      }
    }
  }

  // ─── Movement ─────────────────────────────────────────────────────────────────
  function move(x, y) {
    const i = idx(x, y);
    const mat = grid[i];
    const def = getDef(mat);
    const st = def.state;

    // Powder
    if (st === 3) {
      if (isEmpty(x, y + 1)) { swap(x, y, x, y + 1); return; }
      const bl = get(x - 1, y + 1), br = get(x + 1, y + 1);
      if (bl === MAT.EMPTY && br === MAT.EMPTY) { swap(x, y, rng() < 0.5 ? x - 1 : x + 1, y + 1); return; }
      if (bl === MAT.EMPTY) { swap(x, y, x - 1, y + 1); return; }
      if (br === MAT.EMPTY) { swap(x, y, x + 1, y + 1); return; }
      // Sink through lighter liquids
      const below = get(x, y + 1);
      if (below > 0 && MATERIALS[below]?.state === 1 && MATERIALS[below].density < def.density) {
        swap(x, y, x, y + 1);
      }
    }

    // Liquid
    if (st === 1) {
      if (isEmpty(x, y + 1)) { swap(x, y, x, y + 1); return; }
      const below = get(x, y + 1);
      if (below > 0 && MATERIALS[below]?.state === 1 && MATERIALS[below].density < def.density && rng() < 0.5) {
        swap(x, y, x, y + 1); return;
      }
      const bl = get(x - 1, y + 1), br = get(x + 1, y + 1);
      if (bl === MAT.EMPTY && br === MAT.EMPTY) { swap(x, y, rng() < 0.5 ? x - 1 : x + 1, y + 1); return; }
      if (bl === MAT.EMPTY) { swap(x, y, x - 1, y + 1); return; }
      if (br === MAT.EMPTY) { swap(x, y, x + 1, y + 1); return; }
      const sdir = rng() < 0.5 ? -1 : 1;
      if (isEmpty(x + sdir, y)) { swap(x, y, x + sdir, y); return; }
      if (isEmpty(x - sdir, y)) { swap(x, y, x - sdir, y); }
    }

    // Gas
    if (st === 2) {
      if (isEmpty(x, y - 1)) { swap(x, y, x, y - 1); return; }
      const sdir = rng() < 0.5 ? -1 : 1;
      if (isEmpty(x + sdir, y - 1)) { swap(x, y, x + sdir, y - 1); return; }
      if (isEmpty(x + sdir, y)) { swap(x, y, x + sdir, y); }
    }

    // Fire rises
    if (st === 4) {
      if (rng() < 0.4 && isEmpty(x, y - 1)) { swap(x, y, x, y - 1); return; }
      const sdir = rng() < 0.5 ? -1 : 1;
      if (rng() < 0.3 && isEmpty(x + sdir, y - 1)) { swap(x, y, x + sdir, y - 1); return; }
      if (rng() < 0.03 && isEmpty(x, y - 1)) set(x, y - 1, MAT.SMOKE);
    }

    // Bubble: rise through liquids, pop when reaching air
    if (mat === MAT.BUBBLE) {
      const above = get(x, y - 1);
      if (above === MAT.EMPTY) { grid[i] = MAT.EMPTY; temp[i] = 20; return; } // pop
      if (MATERIALS[above]?.state === 1) { swap(x, y, x, y - 1); return; }
      const sdir = rng() < 0.5 ? -1 : 1;
      if (MATERIALS[get(x + sdir, y - 1)]?.state === 1) { swap(x, y, x + sdir, y - 1); return; }
      if (MATERIALS[get(x + sdir, y)]?.state === 1) { swap(x, y, x + sdir, y); }
      return;
    }

    // Electricity: arc visually, let lifetime system handle deletion
    if (st === 5) {
      const above = get(x, y - 1);
      if (above >= 0 && MATERIALS[above] && MATERIALS[above].state === 1) {
        swap(x, y, x, y - 1); return;
      }
      // Spawn arc sparks in random adjacent empty cells (visual effect)
      const numArcs = 1 + (rng() < 0.4 ? 1 : 0);
      const arcDirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
      for (let a = 0; a < numArcs; a++) {
        const ad = arcDirs[(rng() * arcDirs.length) | 0];
        const ax = x + ad[0], ay = y + ad[1];
        const ai = idx(ax, ay);
        if (inBounds(ax, ay) && grid[ai] === MAT.EMPTY) {
          grid[ai] = MAT.ELECTRICITY; life[ai] = 2 + (rng() * 3) | 0;
          colorVar[ai] = 0; charge[ai] = 50; updated[ai] = 1;
        }
      }
      // Do NOT self-destruct: lifetime counter in updateCell handles deletion
    }
  }

  // ─── Main cell update ─────────────────────────────────────────────────────────
  function updateCell(x, y) {
    const i = idx(x, y);
    if (updated[i]) return;
    const mat = grid[i];
    if (mat === MAT.EMPTY) return;
    updated[i] = 1;

    // Lifetime decay
    if (life[i] > 0) {
      life[i]--;
      if (life[i] <= 0) {
        if (mat === MAT.FIRE) { set(x, y, rng() < 0.4 ? MAT.ASH : MAT.SMOKE); }
        else if (mat === MAT.EMBER) { set(x, y, MAT.ASH); }
        else if (mat === MAT.ELECTRICITY) { grid[i] = MAT.EMPTY; temp[i] = 20; }
        else if (mat === MAT.SMOKE || mat === MAT.TOXIC_SMOKE || mat === MAT.FUMES || mat === MAT.STEAM || mat === MAT.OXYGEN || mat === MAT.HYDROGEN) {
          grid[i] = MAT.EMPTY; temp[i] = 20;
        }
        return;
      }
    }

    // Human body — skip (head drives it), but handle damage propagation
    if (mat === MAT.HUMAN_BODY) {
      // If head above is gone, die
      const headMat = get(x, y - 1);
      if (headMat !== MAT.HUMAN) { grid[i] = MAT.EMPTY; temp[i] = 20; }
      return;
    }
    // Human head — full logic
    if (mat === MAT.HUMAN) { updateHuman(x, y); return; }

    // State transitions based on temperature
    if (checkStateTransition(x, y)) return;

    // Neighbor reactions
    neighborReactions(x, y);

    // Movement if still the same cell
    if (grid[i] === mat) move(x, y);
  }

  // ─── Step ─────────────────────────────────────────────────────────────────────
  function step() {
    if (_paused) return;
    frameCount++;
    thermalPass();
    electricalPass();
    updated.fill(0);
    const lr = frameCount % 2 === 0;
    for (let y = height - 1; y >= 0; y--) {
      if (lr) { for (let x = 0; x < width; x++) updateCell(x, y); }
      else    { for (let x = width - 1; x >= 0; x--) updateCell(x, y); }
    }
  }

  const api = { grid, temp, charge, life, colorVar, width, height, step, place, clear };
  Object.defineProperty(api, 'paused', { get() { return _paused; }, set(v) { _paused = v; } });
  return api;
}