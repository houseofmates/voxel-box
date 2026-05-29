import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Pause, Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';
import { MAT, MATERIALS } from './sim/materials';
import { cn } from '@/lib/utils';

export default function ControlBar({ selected, onSelect, brushSize, onBrushSize, paused, onPause, fps, onClear, isMobile, sidebarOpen, setSidebarOpen }) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-1 bg-card/80 backdrop-blur-sm border-b border-[#f5af12]">
      {/* Mobile: Sidebar toggle button */}
      {isMobile && (
        <Button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          variant="ghost"
          size="icon"
          className="h-7 w-7"
        >
          <PanelLeft />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )}

      {/* Brush size control */}
      <div className="flex flex-col gap-1">
        <p className="text-[10px] text-muted-foreground/70">brush size</p>
        <Slider
          value={[brushSize]}
          onValueChange={([v]) => onBrushSize(v)}
          min={1}
          max={8}
          step={1}
          className="w-[100px]"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* FPS display */}
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
        <span>{fps}</span>
        <span className="text-muted-foreground/50">fps</span>
      </div>

      {/* Pause/Play button */}
      <div className="flex items-center gap-1">
        <button
          onClick={onPause}
          className="p-1 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
        >
          {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>

        {/* Clear button */}
        <button
          onClick={onClear}
          className="p-1 rounded-lg bg-secondary hover:bg-destructive/30 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
