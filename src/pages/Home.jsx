import { useState, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MAT } from '../components/sim/materials';
import SimCanvas from '../components/SimCanvas';
import MaterialSidebar from '../components/sim/MaterialSidebar';
import ControlBar from '../components/ControlBar';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function Home() {
  const [selected, setSelected] = useState(MAT.SAND);
  const [brushSize, setBrushSize] = useState(3);
  const [paused, setPaused] = useState(false);
  const [fps, setFps] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const canvasContainerRef = useRef(null);

  const handleClear = useCallback(() => {
    const canvas = canvasContainerRef.current?.querySelector('canvas');
    canvas?._clear?.();
  }, []);

  if (!isMobile) {
    // Desktop layout
    return (
      <div className="h-screen w-screen flex flex-row bg-[#050505] font-varela text-foreground overflow-hidden">
        <MaterialSidebar selected={selected} onSelect={setSelected} />
        <div className="flex-1 relative flex flex-col">
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
          <ControlBar 
            selected={selected} 
            onSelect={setSelected} 
            brushSize={brushSize} 
            onBrushSize={setBrushSize} 
            paused={paused} 
            onPause={() => setPaused((p) => !p)} 
            fps={fps} 
            onClear={handleClear}
          />
        </div>
      </div>
    );
  }

  // Mobile layout
  return (
    <>
      <div className="h-screen w-screen flex flex-col bg-[#050505] font-varela text-foreground overflow-hidden">
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
        <ControlBar 
          selected={selected} 
          onSelect={setSelected} 
          brushSize={brushSize} 
          onBrushSize={setBrushSize} 
          paused={paused} 
          onPause={() => setPaused((p) => !p)} 
          fps={fps} 
          onClear={handleClear}
          isMobile={true}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Mobile sidebar modal */}
      {sidebarOpen && (
        <Sheet onOpenChange={setSidebarOpen}>
          <SheetContent 
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={{ '--sidebar-width': '16rem' }}
          >
            <div className="flex h-full w-full flex-col">
              <MaterialSidebar 
                selected={selected} 
                onSelect={id => { 
                  setSelected(id); 
                  setSidebarOpen(false); 
                }} 
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
