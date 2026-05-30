import { useState } from 'react';
import categoryOrg from '../../../category_organization.json';
import { MATERIALS, MAT } from './materials';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function MaterialSidebar({ selected, onSelect }) {
  const [search, setSearch] = useState('');

  // Build name -> MAT id map
  const nameToMat = {};
  Object.keys(MATERIALS).forEach((id) => {
    const mat = MATERIALS[id];
    nameToMat[mat.name] = Number(id);
  });

  // Helper to get MAT ids for a category
  const getCategoryMats = (categoryNames) => {
    return categoryNames
      .map((name) => nameToMat[name])
      .filter((id) => id !== undefined);
  };

  // Build category map with MAT ids
  const categories = Object.keys(categoryOrg).map((key) => ({
    name: key,
    mats: getCategoryMats(categoryOrg[key]),
  }));

  // All material IDs for search
  const allMatIds = Object.keys(MATERIALS).map((id) => Number(id));

  // Filter materials by search query (case-insensitive)
  const searchMatIds = allMatIds.filter((id) => {
    const matName = MATERIALS[id].name.toLowerCase();
    return matName.includes(search.toLowerCase());
  });

  // Determine which materials to show: if search is not empty, show search results; else show category materials
  const getMatsToShow = () => {
    if (search.trim() !== '') {
      return searchMatIds;
    }
    // If no search, show all materials
    return allMatIds;
  };

  const matsToShow = getMatsToShow();

  return (
    <div className="flex flex-col h-full w-56 border-r border-[#f5af12] bg-card/80 backdrop-blur-sm font-varela">
      {/* Header */}
      <div className="flex flex-row p-0 border-b border-border items-center gap-2">
        <Input
          placeholder="search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 text-xs px-3 focus-visible:ring-0 border-none bg-transparent"
        />
      </div>

      {/* Tabs and content */}
      <div className="flex-1 overflow-auto p-0">
        {search.trim() !== '' ? (
          // Search results view
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {matsToShow.map((id) => {
              const mat = MATERIALS[id];
              const isSelected = selected === id;
              return (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${isSelected ? 'bg-white/10 ring-1 ring-white/20 scale-105' : 'hover:bg-white/5'}`}
                  title={mat.name}
                >
                  <div
                    className="w-7 h-7 rounded-full border border-white/10 shadow-inner flex items-center justify-center text-[10px]"
                    style={{
                      background: id === MAT.AIR ? 'transparent' : mat.color,
                      border: id === MAT.AIR ? '1px dashed rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                      boxShadow: isSelected ? `0 0 12px ${mat.color || '#fff'}60` : 'none',
                    }}
                  >
                    {id === MAT.AIR && <span className="text-white/40">✕</span>}
                  </div>
                  <span className="text-[9px] text-muted-foreground/80 whitespace-nowrap">{mat.name}</span>
                </button>
              );
            })}
          </div>
        ) : (
          // Tabs view
          <Tabs defaultValue={categories[0]?.name || ''}>
            <TabsList className="grid w-full grid-cols-2 gap-1 mb-0 h-auto p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name}
                  className="aspect-square h-8 w-full rounded-md bg-muted p-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="mt-4 space-y-1">
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-4">
                  {category.mats.map((id) => {
                    const mat = MATERIALS[id];
                    const isSelected = selected === id;
                    return (
                      <button
                        key={id}
                        onClick={() => onSelect(id)}
                        className={`flex-shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${isSelected ? 'bg-white/10 ring-1 ring-white/20 scale-105' : 'hover:bg-white/5'}`}
                        title={mat.name}
                      >
                        <div
                          className="w-7 h-7 rounded-full border border-white/10 shadow-inner flex items-center justify-center text-[10px]"
                          style={{
                            background: id === MAT.AIR ? 'transparent' : mat.color,
                            border: id === MAT.AIR ? '1px dashed rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                            boxShadow: isSelected ? `0 0 12px ${mat.color || '#fff'}60` : 'none',
                          }}
                        >
                          {id === MAT.AIR && <span className="text-white/40">✕</span>}
                        </div>
                        <span className="text-[9px] text-muted-foreground/80 whitespace-nowrap">{mat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
}
