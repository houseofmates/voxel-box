import { useState, useRef, useCallback } from 'react';
import { MAT } from '../components/sim/materials';
import SimCanvas from '../components/SimCanvas';
import Toolbar from '../components/Toolbar';

export default function Home() {
  const [selected, setSelected] = useState(MAT.SAND);
  const [brushSize, setBrushSize] = useState(3);
  const [paused, setPaused] = useState(false);
  const [fps, setFps] = useState(0);
  const canvasContainerRef = useRef(null);

  const handleClear = useCallback(() => {
    const canvas = canvasContainerRef.current?.querySelector('canvas');
    canvas?._clear?.();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row bg-[#050505] font-varela text-foreground overflow-hidden">
      {/* Desktop: sidebar left. Mobile: canvas on top, toolbar bottom */}
      <div className="hidden lg:flex">
        <Toolbar
          selected={selected}
          onSelect={setSelected}
          brushSize={brushSize}
          onBrushSize={setBrushSize}
          paused={paused}
          onPause={() => setPaused((p) => !p)}
          onClear={handleClear}
          fps={fps}
        />
      </div>

      <div ref={canvasContainerRef} className="flex-1 relative">
        <SimCanvas
          selectedMat={selected}
          brushSize={brushSize}
          paused={paused}
          onFps={setFps}
        />
        {paused && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-[10px] text-muted-foreground backdrop-blur-sm">
            paused
          </div>
        )}
      </div>

      <div className="lg:hidden">
        <Toolbar
          selected={selected}
          onSelect={setSelected}
          brushSize={brushSize}
          onBrushSize={setBrushSize}
          paused={paused}
          onPause={() => setPaused((p) => !p)}
          onClear={handleClear}
          fps={fps}
        />
      </div>
    </div>
  );
}