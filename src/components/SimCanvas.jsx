import { useRef, useEffect, useCallback } from 'react';
import { createEngine } from './sim/engine';
import { render } from './sim/renderer';

const CELL_SIZE = 3;

export default function SimCanvas({ selectedMat, brushSize, paused, onFps }) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPosRef = useRef(null);
  const fpsRef = useRef({ frames: 0, last: performance.now() });

  const getGridPos = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width * (canvas.width / CELL_SIZE)) | 0;
    const y = ((clientY - rect.top) / rect.height * (canvas.height / CELL_SIZE)) | 0;
    return { x, y };
  }, []);

  const drawLine = useCallback((x0, y0, x1, y1) => {
    const eng = engineRef.current;
    if (!eng) return;
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (true) {
      eng.place(x0, y0, selectedMat, brushSize);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }, [selectedMat, brushSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      canvas.width = w;
      canvas.height = h;
      const gw = (w / CELL_SIZE) | 0;
      const gh = (h / CELL_SIZE) | 0;
      if (!engineRef.current || engineRef.current.width !== gw || engineRef.current.height !== gh) {
        engineRef.current = createEngine(gw, gh);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const ctx = canvas.getContext('2d');
    let animId;
    const loop = () => {
      const eng = engineRef.current;
      if (eng) {
        eng.paused = paused;
        eng.step();
        render(ctx, eng, canvas.width, canvas.height);
      }
      // FPS
      fpsRef.current.frames++;
      const now = performance.now();
      if (now - fpsRef.current.last >= 1000) {
        onFps?.(fpsRef.current.frames);
        fpsRef.current.frames = 0;
        fpsRef.current.last = now;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
    };
  }, [paused, onFps]);

  const handleStart = useCallback((e) => {
    e.preventDefault();
    drawingRef.current = true;
    const pos = getGridPos(e, canvasRef.current);
    lastPosRef.current = pos;
    engineRef.current?.place(pos.x, pos.y, selectedMat, brushSize);
  }, [selectedMat, brushSize, getGridPos]);

  const handleMove = useCallback((e) => {
    e.preventDefault();
    if (!drawingRef.current) return;
    const pos = getGridPos(e, canvasRef.current);
    const last = lastPosRef.current || pos;
    drawLine(last.x, last.y, pos.x, pos.y);
    lastPosRef.current = pos;
  }, [drawLine, getGridPos]);

  const handleEnd = useCallback(() => {
    drawingRef.current = false;
    lastPosRef.current = null;
  }, []);

  const clearCanvas = useCallback(() => {
    engineRef.current?.clear();
  }, []);

  // Expose clear to parent
  useEffect(() => {
    if (canvasRef.current) canvasRef.current._clear = clearCanvas;
  }, [clearCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block cursor-crosshair touch-none"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    />
  );
}