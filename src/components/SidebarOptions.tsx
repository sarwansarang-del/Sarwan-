import React from "react";
import { 
  WallpaperStyle, 
  ColorPalette, 
  AspectRatio 
} from "../types";
import { 
  WALLPAPER_STYLES, 
  COLOR_PALETTES 
} from "../data";
import { 
  Feather, 
  Camera, 
  Zap, 
  Brush, 
  Sparkles, 
  Layers, 
  Droplet, 
  Globe, 
  FileText,
  Compass,
  LayoutGrid,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Check,
  Dices,
  Info
} from "lucide-react";
import { motion } from "motion/react";

interface SidebarOptionsProps {
  prompt: string;
  setPrompt: (p: string) => void;
  selectedStyle: string;
  setSelectedStyle: (s: string) => void;
  selectedPalette: string;
  setSelectedPalette: (p: string) => void;
  selectedAspect: AspectRatio;
  setSelectedAspect: (a: AspectRatio) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

// Icon mapper for selection grid
const getStyleIcon = (iconName: string, active: boolean) => {
  const cn = `w-4 h-4 ${active ? "text-blue-400" : "text-gray-400"}`;
  switch (iconName) {
    case "Feather": return <Feather className={cn} />;
    case "Camera": return <Camera className={cn} />;
    case "Zap": return <Zap className={cn} />;
    case "Brush": return <Brush className={cn} />;
    case "Sparkles": return <Sparkles className={cn} />;
    case "Layers": return <Layers className={cn} />;
    case "Droplet": return <Droplet className={cn} />;
    case "Globe": return <Globe className={cn} />;
    case "FileText": return <FileText className={cn} />;
    default: return <Compass className={cn} />;
  }
};

const RANDOM_PROMPTS = [
  "A magnificent mechanical owl with clockwork brass gears resting on a crystalline lavender branch, cyber-retro atmosphere",
  "A majestic snow fox perched on neon-glowing crystal stones in an enchanted Nordic forest, twilight sparkles",
  "Swirling interstellar storm clouds in vibrant aquamarine, warm coral, and luxury gold leaf fluid dynamics",
  "Unreal cozy treehouse village tucked between giant glowing orange mushrooms under an aurora borealis sky",
  "Hyper detailed floating island in sky holding a pristine white observatory temple, clouds floating by",
  "Charming pixel art tea house overlooking a vast valley of cherry blossoms during a gentle springtime breeze",
  "Cinematic futuristic cyber highway leading to a neon-purple mega-city skyline, glowing cars, volumetric mist",
  "Ethereal glass whale swimming beautifully through clouds under golden sunbeams, whimsical watercolor canvas"
];

export default function SidebarOptions({
  prompt,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  selectedPalette,
  setSelectedPalette,
  selectedAspect,
  setSelectedAspect,
  onGenerate,
  isLoading
}: SidebarOptionsProps) {

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_PROMPTS.length);
    setPrompt(RANDOM_PROMPTS[randomIndex]);
  };

  return (
    <div className="bg-[#14141d]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6">
      
      {/* 2. Interactive prompt area */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-blue-400" />
            <span>AI Prompt Description / آئیڈیا</span>
          </label>
          <button
            type="button"
            onClick={handleRandomize}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>ترغیبی پرامپٹ (Surprise Me)</span>
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مستقبل کا شہر، خلاء میں اڑتی ہوئی کشتیاں یا کوئی بھی خوبصورت تصور لکھیں۔ (Enter keywords or explain your dream scenery...)"
          className="w-full text-sm p-4 h-24 bg-gray-950 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
        />
      </div>

      {/* 3. Style Chooser with Layout Grid */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <LayoutGrid className="w-4 h-4 text-blue-400" />
          <span>Select Wallpaper Style / آرٹ تھیم</span>
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 select-none scrollbar-thin">
          {WALLPAPER_STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 text-left rounded-2xl border transition-all flex flex-col gap-1 cursor-pointer ${
                  isSelected 
                    ? "bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/5" 
                    : "bg-gray-950/40 border-gray-850 hover:border-gray-800 text-gray-400 hover:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {getStyleIcon(style.icon, isSelected)}
                  <span className="text-xs font-semibold truncate leading-none">
                    {style.name}
                  </span>
                </div>
                <span className="text-[10px] opacity-60 leading-tight block truncate w-full">
                  {style.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Color theme palette */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-blue-400" />
          <span>Color Palette Accent / رنگوں کی تھیم</span>
        </label>
        <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin">
          {COLOR_PALETTES.map((palette) => {
            const isSelected = selectedPalette === palette.id;
            return (
              <button
                key={palette.id}
                onClick={() => setSelectedPalette(palette.id)}
                className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected 
                    ? "bg-blue-600/15 border-blue-500 text-white" 
                    : "bg-gray-950/40 border-gray-850 hover:border-gray-800 text-gray-400"
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold leading-none">{palette.name}</span>
                  <span className="text-[10px] text-gray-500 truncate mt-1 w-32 sm:w-44 block">
                    {palette.description}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {palette.colors.map((color, i) => (
                    <span 
                      key={i} 
                      className="w-3.5 h-3.5 rounded-full border border-gray-950 shadow-inner block"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-400 ml-1.5 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Dimensions/Aspect Ratio Controls */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Monitor className="w-4 h-4 text-blue-400" />
          <span>Aspect Ratio / سکرین ریزولوشن</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(["9:16", "16:9", "4:3", "1:1"] as AspectRatio[]).map((aspect) => {
            const isSelected = selectedAspect === aspect;
            
            // Get aspect representation descriptors
            const getIcon = () => {
              switch (aspect) {
                case "9:16": return <Smartphone className="w-4 h-4 shrink-0" />;
                case "4:3": return <Tablet className="w-4 h-4 shrink-0" />;
                case "1:1": return <Layers className="w-4 h-4 shrink-0" />;
                case "16:9":
                default: 
                  return <Monitor className="w-4 h-4 shrink-0" />;
              }
            };

            const getUrduLabel = () => {
              switch (aspect) {
                case "9:16": return "موبائل";
                case "16:9": return "کمیوٹر";
                case "4:3": return "ٹیبلٹ";
                case "1:1": return "اسکوائر";
              }
            };

            return (
              <button
                key={aspect}
                onClick={() => setSelectedAspect(aspect)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected 
                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/10" 
                    : "bg-gray-950/40 border-gray-850 hover:border-gray-850 text-gray-400 hover:text-white"
                }`}
                style={{ minHeight: "64px" }}
              >
                {getIcon()}
                <span className="text-[10px] font-bold mt-1.5 font-mono">{aspect}</span>
                <span className="text-[8px] opacity-75 mt-0.5">{getUrduLabel()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Action Button with interactive pulse state */}
      <div className="pt-2">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`w-full h-14 rounded-2xl font-bold text-lg flex items-center justify-center gap-2.5 transition-all shadow-xl font-sans text-white cursor-pointer select-none ${
            isLoading 
              ? "bg-gray-800 border-gray-700 opacity-80 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-500 border border-blue-400 shadow-blue-500/20 active:scale-[0.98]"
          }`}
          style={{ minHeight: "56px" }}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-1 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-base text-gray-200">اے آئی وال پیپر بنا رہا ہے...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5.5 h-5.5 text-amber-300 animate-pulse fill-amber-300" />
              <span>وال پیپر تخلیق کریں</span>
            </>
          )}
        </button>

        {/* Informative billing/free info line */}
        <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-500 mt-3 font-mono">
          <Info className="w-3.5 h-3.5 text-blue-500/80" />
          <span>Generates stunning wallpapers instantly powered by Gemini</span>
        </div>
      </div>

    </div>
  );
}
