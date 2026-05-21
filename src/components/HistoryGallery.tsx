import React from "react";
import { GeneratedWallpaper } from "../types";
import { 
  Heart, 
  Trash2, 
  Download, 
  Sparkles,
  Layers,
  Monitor,
  Calendar,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HistoryGalleryProps {
  wallpapers: GeneratedWallpaper[];
  activeId: string;
  onSelect: (wp: GeneratedWallpaper) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export default function HistoryGallery({
  wallpapers,
  activeId,
  onSelect,
  onToggleFavorite,
  onDelete
}: HistoryGalleryProps) {

  const handleDownload = (wp: GeneratedWallpaper, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create actual browser download anchor
    const link = document.createElement("a");
    link.href = wp.url;
    link.download = `Wallpaper-${wp.style}-${wp.aspectRatio.replace(":", "x")}-${wp.id.slice(0, 5) || "ai"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      
      {/* Gallery Header Row */}
      <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            وال پیپرز گیلری <span className="text-xs text-gray-400 font-mono font-normal">/ Wallpaper Collection</span>
          </h3>
          <p className="text-xs text-gray-500">
            تخلیق کردہ اور پہلے سے موجود ڈیزائنز۔ کسی پر بھی کلک کر کے اوپر سکرین پر لائیو پریویو دیکھیں۔
          </p>
        </div>
        
        {/* Indicators of size */}
        <div className="px-3 py-1 bg-gray-950 border border-gray-850 rounded-lg text-[10px] font-mono text-blue-400">
          {wallpapers.length} Wallpapers Available
        </div>
      </div>

      {/* Grid displays items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {wallpapers.map((wp, index) => {
            const isActive = wp.id === activeId;
            const isPreset = wp.id.startsWith("preset-");

            return (
              <motion.div
                layout
                key={wp.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => onSelect(wp)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-950/40 border transition-all hover:shadow-xl ${
                  isActive 
                    ? "border-blue-500 ring-2 ring-blue-500/20 shadow-blue-500/10 scale-[0.98]" 
                    : "border-gray-850 hover:border-gray-700 hover:scale-[1.01]"
                }`}
              >
                {/* Visual Image container with aspect ratio alignment */}
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={wp.url} 
                    alt={wp.prompt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glassmorphic indicators at top of thumbnail */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
                    {/* Style Tag */}
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-black/55 backdrop-blur-md rounded-full text-blue-300 font-sans tracking-wide border border-white/5 uppercase">
                      {wp.style}
                    </span>
                    
                    {/* Aspect aspect ratios label */}
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-black/55 backdrop-blur-md rounded-md text-emerald-400 border border-white/5">
                      {wp.aspectRatio}
                    </span>
                  </div>

                  {/* Absolute visual active eye check indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="p-3 bg-blue-600 shadow-lg text-white rounded-full">
                        <Eye className="w-5 h-5 animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* Hover Action toolbar panel overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-2.5 z-20">
                    {/* Favorite toggler */}
                    <button
                      onClick={(e) => onToggleFavorite(wp.id, e)}
                      className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                        wp.isFavorite 
                          ? "bg-red-500 text-white fill-red-500 hover:bg-red-600" 
                          : "bg-black/60 text-gray-300 hover:text-white hover:bg-black/90"
                      }`}
                      title={wp.isFavorite ? "Unfavorite" : "Favorite"}
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>

                    {/* Download Image file directly */}
                    <button
                      onClick={(e) => handleDownload(wp, e)}
                      className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 font-bold flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                      title="Download wallpaper"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete handler (Disable for Presets for safe defaults) */}
                    {!isPreset && (
                      <button
                        onClick={(e) => onDelete(wp.id, e)}
                        className="p-2 rounded-xl bg-gray-900 border border-white/5 text-gray-400 hover:text-red-400 hover:bg-black/90 cursor-pointer transition-all"
                        title="Delete wallpaper"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Footer details details */}
                <div className="p-3.5 space-y-1">
                  <p className="text-[10px] text-gray-500 font-semibold truncate leading-none font-mono">
                    {isPreset ? "PRESET WALLPAPER" : `GENERATION: ${wp.id.slice(0, 6).toUpperCase()}`}
                  </p>
                  <p className="text-xs text-white leading-snug font-normal line-clamp-1 w-full" title={wp.prompt}>
                    {wp.prompt}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
