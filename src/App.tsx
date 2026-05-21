import React, { useState, useEffect } from "react";
import { 
  GeneratedWallpaper, 
  AspectRatio, 
  DeviceType 
} from "./types";
import { 
  PRESET_WALLPAPERS 
} from "./data";
import SidebarOptions from "./components/SidebarOptions";
import PreviewDevice from "./components/PreviewDevice";
import HistoryGallery from "./components/HistoryGallery";
import { 
  Sparkles, 
  Download, 
  Heart, 
  Layout, 
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  AlertCircle,
  HelpCircle,
  Clock,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Config States
  const [prompt, setPrompt] = useState("A mysterious cozy glass cabin glowing underneath a solar eclipse, aurora skies, photorealistic");
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [selectedPalette, setSelectedPalette] = useState("sunset");
  const [selectedAspect, setSelectedAspect] = useState<AspectRatio>("16:9");
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("desktop");

  // Collections States
  const [wallpapers, setWallpapers] = useState<GeneratedWallpaper[]>(() => {
    try {
      const stored = localStorage.getItem("vision_wallpapers_v2");
      return stored ? JSON.parse(stored) : PRESET_WALLPAPERS;
    } catch {
      return PRESET_WALLPAPERS;
    }
  });

  const [activeWallpaper, setActiveWallpaper] = useState<GeneratedWallpaper>(() => {
    try {
      const stored = localStorage.getItem("vision_wallpapers_v2");
      const list = stored ? JSON.parse(stored) : PRESET_WALLPAPERS;
      return list[0] || PRESET_WALLPAPERS[0];
    } catch {
      return PRESET_WALLPAPERS[0];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem("vision_wallpapers_v2", JSON.stringify(wallpapers));
  }, [wallpapers]);

  // Adjust optimal previewing device mockups when the output aspect ratio is switched
  useEffect(() => {
    switch (selectedAspect) {
      case "9:16":
        setSelectedDevice("phone");
        break;
      case "1:1":
        setSelectedDevice("watch");
        break;
      case "4:3":
        setSelectedDevice("tablet");
        break;
      case "16:9":
      default:
        setSelectedDevice("desktop");
        break;
    }
  }, [selectedAspect]);

  const handleGenerate = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-wallpaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
          colorPalette: selectedPalette,
          aspectRatio: selectedAspect
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation request failed. Please check server log or configure GEMINI_API_KEY.");
      }

      const newWp: GeneratedWallpaper = {
        id: `ai-${Date.now()}`,
        url: data.imageUrl,
        prompt: prompt.trim() || "vibrant scenery backdrop",
        style: selectedStyle,
        aspectRatio: selectedAspect,
        colorPalette: selectedPalette,
        timestamp: new Date().toISOString(),
        isFavorite: false
      };

      setWallpapers((prev) => [newWp, ...prev]);
      setActiveWallpaper(newWp);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during wallpaper preparation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWallpapers((prevList) => 
      prevList.map((wp) => 
        wp.id === id ? { ...wp, isFavorite: !wp.isFavorite } : wp
      )
    );
    // Sync current active wallpaper Favorite star if it's the one modified
    if (activeWallpaper.id === id) {
      setActiveWallpaper((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = wallpapers.filter((wp) => wp.id !== id);
    setWallpapers(updated);

    // If the active wallpaper was deleted, fall back to the first available in lists
    if (activeWallpaper.id === id) {
      if (updated.length > 0) {
        setActiveWallpaper(updated[0]);
      } else {
        setActiveWallpaper(PRESET_WALLPAPERS[0]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-gray-100 selection:bg-blue-600 selection:text-white">
      
      {/* Dynamic Animated subtle background overlays */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Top Navigation Hub Bar */}
      <header className="sticky top-0 z-40 bg-[#07070a]/80 backdrop-blur-xl border-b border-gray-900 px-4 md:px-8 py-4.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/15">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white leading-none font-sans tracking-wide">
              Visions AI
            </h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest leading-none mt-1">
              GEMINI WALLPAPER GENERATOR
            </p>
          </div>
        </div>

        {/* Informative Status info metrics Badge */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#14141d] rounded-xl border border-gray-800">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
              Gemini 2.5 Flash Image Mode
            </span>
          </div>
        </div>
      </header>

      {/* Main split dashboard frame */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">
        
        {/* Error Dialog presentation if server key is missing or prompt fails */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-red-950/30 border border-red-900/40 rounded-3xl flex items-start gap-3.5"
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-bold text-red-200">خیلی معذرت! Generation Interrupted</h4>
                <p className="text-xs text-red-300 leading-relaxed font-sans">{error}</p>
                <div className="pt-2 text-[10px] text-red-400 font-mono">
                  Tip: Ensure process.env.GEMINI_API_KEY is defined. Or select any preset below to use the fully operational device mockup viewer immediately.
                </div>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-xs text-red-400 hover:text-red-300 font-bold underline cursor-pointer self-center"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Parameters customization form controls (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <SidebarOptions
              prompt={prompt}
              setPrompt={setPrompt}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              selectedPalette={selectedPalette}
              setSelectedPalette={setSelectedPalette}
              selectedAspect={selectedAspect}
              setSelectedAspect={setSelectedAspect}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>

          {/* RIGHT: High fidelity Mockup workspace presentation (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            <div className="bg-[#14141d]/40 border border-gray-850 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center">
              
              {/* Dynamic device switches indicators */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800/60 pb-4 mb-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <h3 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                    <Layout className="w-4 h-4 text-blue-500" />
                    <span>لائیو پریویو / Device Mockup Workspace</span>
                  </h3>
                  <p className="text-[11px] text-gray-500 uppercase tracking-widest font-mono">
                    Aspect Ratio: {activeWallpaper.aspectRatio} | Style: {activeWallpaper.style}
                  </p>
                </div>

                {/* Device triggers buttons */}
                <div className="flex items-center gap-1.5 bg-gray-950 p-1.5 rounded-2xl border border-gray-850">
                  {([
                    { id: "phone", icon: <Smartphone className="w-4 h-4" />, label: "Mobile" },
                    { id: "desktop", icon: <Monitor className="w-4 h-4" />, label: "Desktop" },
                    { id: "tablet", icon: <Tablet className="w-4 h-4" />, label: "Tablet" },
                    { id: "watch", icon: <Activity className="w-4 h-4" />, label: "Watch" }
                  ] as { id: DeviceType; icon: any; label: string }[]).map((dev) => {
                    const active = selectedDevice === dev.id;
                    return (
                      <button
                        key={dev.id}
                        onClick={() => setSelectedDevice(dev.id)}
                        className={`text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                          active 
                            ? "bg-blue-600 border border-blue-400 text-white" 
                            : "text-gray-400 hover:text-white"
                        }`}
                        style={{ minHeight: "36px" }}
                      >
                        {dev.icon}
                        <span className="hidden md:inline">{dev.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Glowing decorative frame background ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-blue-500/5 blur-[90px] pointer-events-none" />

              {/* Interactive preview display with overlay metrics */}
              <PreviewDevice
                imageUrl={activeWallpaper.url}
                device={selectedDevice}
                aspectRatio={activeWallpaper.aspectRatio}
                promptText={activeWallpaper.prompt}
              />

              {/* Informative footer explaining wallpaper actions */}
              <div className="w-full flex items-center justify-between text-xs text-gray-400 mt-4 pt-4 border-t border-gray-850">
                <span className="italic block max-w-xs md:max-w-md truncate">
                  Prompt: "{activeWallpaper.prompt}"
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleToggleFavorite(activeWallpaper.id, e)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs cursor-pointer ${
                      activeWallpaper.isFavorite
                        ? "bg-red-500/15 border-red-500/30 text-red-400"
                        : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${activeWallpaper.isFavorite ? "fill-current" : ""}`} />
                    <span>Like</span>
                  </button>
                  <a
                    href={activeWallpaper.url}
                    download={`Visions-${activeWallpaper.id}.png`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 border border-blue-400 text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-blue-500 shadow-md shadow-blue-500/10"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM: Gallery and Saved presets lists */}
        <div className="pt-4">
          <HistoryGallery
            wallpapers={wallpapers}
            activeId={activeWallpaper.id}
            onSelect={(wp) => {
              setActiveWallpaper(wp);
              // Safely set the preview device mockup based on wallpaper ratio
              switch (wp.aspectRatio) {
                case "9:16":
                  setSelectedDevice("phone");
                  break;
                case "1:1":
                  setSelectedDevice("watch");
                  break;
                case "4:3":
                  setSelectedDevice("tablet");
                  break;
                case "16:9":
                default:
                  setSelectedDevice("desktop");
                  break;
              }
            }}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDelete}
          />
        </div>

      </main>

      {/* Aesthetic Footer Credit lines */}
      <footer className="w-full border-t border-gray-900 py-8 bg-[#07070a]/90 text-center text-xs text-gray-500 font-mono relative mt-16 z-10">
        <p>Visions AI Wallpaper Engine • Built with React, Experian Node &amp; Gemini 2.5</p>
        <p className="mt-1 text-gray-600">Secure Client-Server Base64 Integration Matrix v2.4</p>
      </footer>

    </div>
  );
}
