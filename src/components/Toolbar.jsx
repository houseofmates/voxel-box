import { MATERIALS, PLACEABLE, MAT } from './sim/materials';
import { Slider } from '@/components/ui/slider';
import { Pause, Play, Trash2 } from 'lucide-react';

export default function Toolbar({ selected, onSelect, brushSize, onBrushSize, paused, onPause, onClear, fps }) {
  return (
    <div className="flex flex-col lg:w-56 lg:h-full w-full lg:border-r border-t lg:border-t-0 border-border bg-card/80 backdrop-blur-sm font-varela">
      {/* Header - desktop only */}
      <div className="hidden lg:block p-4 border-b border-border">
        <h1 className="text-sm text-muted-foreground tracking-wide">sandbox</h1>
        <p className="text-[10px] text-muted-foreground/60 mt-0.5">{fps} fps</p>
      </div>

      {/* Materials grid */}
      <div className="flex-1 overflow-auto p-3 lg:p-4">
        <p className="text-[10px] text-muted-foreground/70 mb-2 hidden lg:block">materials</p>
        <div className="flex lg:flex-wrap gap-2 overflow-x-auto lg:overflow-visible pb-1">
          {PLACEABLE.map((id) => {
            const m = MATERIALS[id];
            const isSelected = selected === id;
            return (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${
                  isSelected ? 'bg-white/10 ring-1 ring-white/20 scale-105' : 'hover:bg-white/5'
                }`}
                title={m.name}
              >
                <div
                  className="w-7 h-7 rounded-full border border-white/10 shadow-inner flex items-center justify-center text-[10px]"
                  style={{
                    background: id === MAT.AIR ? 'transparent' : m.color,
                    border: id === MAT.AIR ? '1px dashed rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isSelected ? `0 0 12px ${m.color || '#fff'}60` : 'none',
                  }}
                >
                  {id === MAT.AIR && <span className="text-white/40">✕</span>}
                </div>
                <span className="text-[9px] text-muted-foreground/80 whitespace-nowrap hidden lg:block">
                  {m.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 lg:p-4 border-t border-border flex lg:flex-col gap-3 items-center lg:items-stretch">
        {/* Mobile fps */}
        <span className="text-[10px] text-muted-foreground/50 lg:hidden">{fps}fps</span>

        {/* Selected name on mobile */}
        <span className="text-[10px] text-muted-foreground lg:hidden flex-1 text-center">
          {MATERIALS[selected]?.name}
        </span>

        {/* Brush size */}
        <div className="hidden lg:block">
          <p className="text-[10px] text-muted-foreground/70 mb-1.5">brush size</p>
          <Slider
            value={[brushSize]}
            onValueChange={([v]) => onBrushSize(v)}
            min={1}
            max={8}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onPause}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={onClear}
            className="p-2 rounded-lg bg-secondary hover:bg-destructive/30 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}