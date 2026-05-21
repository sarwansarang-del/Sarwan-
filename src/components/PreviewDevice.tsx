import React, { useEffect, useState } from "react";
import { 
  DeviceType, 
  AspectRatio 
} from "../types";
import { 
  Wifi, 
  Battery, 
  Signal, 
  Search, 
  MessageSquare, 
  Compass, 
  Phone, 
  Play, 
  Laptop, 
  Maximize, 
  HelpCircle,
  Heart,
  Activity,
  User,
  Settings
} from "lucide-react";
import { motion } from "motion/react";

interface PreviewDeviceProps {
  imageUrl: string;
  device: DeviceType;
  aspectRatio: AspectRatio;
  promptText: string;
}

export default function PreviewDevice({ imageUrl, device, aspectRatio, promptText }: PreviewDeviceProps) {
  const [time, setTime] = useState(new Date());

  // Keep ticking live watch/phone clock synced to simulated seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formattedSeconds = time.toLocaleTimeString([], { second: "2-digit" });
  const formattedDate = time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  // Map exact device to dimensions
  const getDeviceFrameStyles = () => {
    switch (device) {
      case "phone":
        return "aspect-[9/19] w-full max-w-[300px] rounded-[50px] ring-12 ring-black bg-gray-950";
      case "tablet":
        // 4:3
        return "aspect-[3/4] w-full max-w-[420px] rounded-[36px] ring-12 ring-black bg-gray-950";
      case "watch":
        // 1:1
        return "aspect-square w-full max-w-[260px] rounded-[48px] ring-10 ring-black bg-gray-950";
      case "desktop":
      default:
        // 16:9
        return "aspect-[16/10] w-full max-w-[620px] rounded-2xl ring-8 ring-gray-800 bg-gray-900";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      
      {/* Container holding the Device Mockup Frame */}
      <div className="relative w-full flex flex-col items-center justify-center">
        <motion.div
          key={`${device}-${imageUrl}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`${getDeviceFrameStyles()} relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-gray-800/80`}
        >
          {/* Wallpaper background image layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src={imageUrl} 
              alt="Generated Wallpaper Preview" 
              className="w-full h-full object-cover transition-opacity duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Dark vignette to ensure overlay text contrasts gracefully */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </div>

          {/* ==================== DEVICE VIEWPORTS OVERLAYS ==================== */}

          {/* 1. SMART PHONE OVERLAY */}
          {device === "phone" && (
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 text-white font-sans pointer-events-none select-none">
              
              {/* Phone Status bar and Notch cutout */}
              <div className="flex items-center justify-between text-[11px] font-semibold tracking-tight px-3.5 pt-1.5 h-6">
                <span>{formattedTime}</span>
                {/* Dynamic iOS-Style Pill Cutout */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full border border-gray-900 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-gray-950 border border-gray-900/60 rounded-full absolute right-4" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Lock Screen Header Clock widget */}
              <div className="flex flex-col items-center mt-8 space-y-0.5">
                <span className="text-[11px] font-medium tracking-widest text-[#d1e8ff] opacity-90 uppercase">
                  {formattedDate}
                </span>
                <span className="text-5xl font-extralight tracking-tight font-sans text-white">
                  {formattedTime}
                </span>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/30 backdrop-blur-md rounded-full border border-white/10 text-[9px] mt-2 font-mono max-w-[150px] truncate block text-center">
                  🌅 {promptText || "Ambient Space"}
                </div>
              </div>

              {/* Lock Screen iOS app shortcut triggers or sliding Dock */}
              <div className="space-y-6 mb-2">
                {/* Visual swipe up to open line */}
                <div className="flex flex-col items-center gap-4">
                  {/* Fake circular quick shortcut triggers */}
                  <div className="flex items-center justify-between w-full max-w-[200px]">
                    <div className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center hover:bg-black/60 pointer-events-auto cursor-pointer">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center hover:bg-black/60 pointer-events-auto cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="w-24 h-1 bg-white/70 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          )}

          {/* 2. LAPTOP / DESKTOP MONITOR OVERLAY */}
          {device === "desktop" && (
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 text-white font-sans pointer-events-none select-none">
              
              {/* iMac Menu Top bar */}
              <div className="flex items-center justify-between px-3 py-1 bg-black/20 backdrop-blur-md border-b border-white/5 rounded-t-lg text-[10px] font-medium">
                <div className="flex items-center gap-3.5">
                  <span className="font-bold text-sky-400"> Workspace</span>
                  <span className="opacity-75 hidden sm:block">File</span>
                  <span className="opacity-75 hidden sm:block">Edit</span>
                  <span className="opacity-75 hidden md:block">Layout</span>
                  <span className="opacity-75 hidden lg:block">Help</span>
                </div>
                <div className="flex items-center gap-2.5 font-mono">
                  <span className="opacity-75">{formattedDate}</span>
                  <span className="opacity-95 font-semibold">{formattedTime}</span>
                </div>
              </div>

              {/* Simulated Desktop Widgets */}
              <div className="flex-1 p-4 grid grid-cols-12 gap-4">
                {/* Desktop widget file folder row */}
                <div className="col-span-3 flex flex-col items-center justify-start space-y-4 pt-4">
                  <div className="flex flex-col items-center bg-black/35 backdrop-blur-lg border border-white/10 rounded-xl p-2.5 w-18 text-center gap-1.5 shadow-lg">
                    <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold border border-amber-500/30 text-xs">
                      TXT
                    </div>
                    <span className="text-[8px] text-white tracking-wide truncate w-full">Prompts.md</span>
                  </div>

                  <div className="flex flex-col items-center bg-black/35 backdrop-blur-lg border border-white/10 rounded-xl p-2.5 w-18 text-center gap-1.5 shadow-lg">
                    <div className="w-6 h-6 rounded-md bg-sky-500/20 flex items-center justify-center text-sky-500 font-bold border border-sky-500/30 text-xs">
                      IMG
                    </div>
                    <span className="text-[8px] text-white tracking-wide truncate w-full">Exquisite.png</span>
                  </div>
                </div>

                {/* Simulated Floating Art Window */}
                <div className="col-span-9 hidden sm:flex items-start justify-end">
                  <div className="bg-gray-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 shadow-2xl max-w-[240px] mt-2 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[8px] font-mono text-gray-400">Model Console</span>
                    </div>
                    <p className="text-[9px] leading-relaxed text-gray-300 font-mono">
                      $ gemini --render_aspect --fine_style
                      <br />
                      <span className="text-emerald-400">&gt; Successful 4K Rendered background wallpaper configured.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* iMac Bottom Floating Glassmorphism Dock */}
              <div className="w-full flex justify-center pb-2">
                <div className="px-4 py-2 bg-black/35 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-3.5 shadow-xl">
                  {/* Safari Icon Mockup */}
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                    <Compass className="w-4 h-4" />
                  </div>
                  {/* Music Play Icon Mockup */}
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <Play className="w-4 h-4" />
                  </div>
                  {/* Notes Icon Mockup */}
                  <div className="w-7 h-7 rounded-lg bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  {/* Setting Gear */}
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                    <Settings className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. TABLET OVERLAY */}
          {device === "tablet" && (
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 text-white font-sans pointer-events-none select-none">
              
              {/* Tablet Header status */}
              <div className="flex items-center justify-between text-[11px] font-semibold tracking-tight px-2 h-6">
                <span>iPad Air</span>
                <span>{formattedTime} - {formattedDate}</span>
                <div className="flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Centered Large Tablet Screen Widgets */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="bg-black/25 backdrop-blur-md rounded-3xl p-6 border border-white/5 text-center space-y-1">
                  <span className="text-sm font-light tracking-wide text-gray-300">SYSTEM HEALTH</span>
                  <p className="text-4xl font-bold text-white font-sans">{formattedTime}</p>
                  <p className="text-[10px] text-gray-400 font-mono tracking-wider">{formattedDate}</p>
                </div>
              </div>

              {/* Bottom Taskbar */}
              <div className="w-full flex justify-center pb-2">
                <div className="w-18 h-1 bg-white/70 rounded-full" />
              </div>
            </div>
          )}

          {/* 4. CIRCULAR SMART WATCH OVERLAY */}
          {device === "watch" && (
            <div className="absolute inset-0 z-10 flex flex-col justify-between items-center p-6 text-white font-sans pointer-events-none select-none">
              
              {/* Top health line icons */}
              <div className="pt-3">
                <Activity className="w-4 h-4 text-[#ff224e]" />
              </div>

              {/* Large Sporty Watch Dial screen */}
              <div className="text-center space-y-0.5">
                <span className="text-[11px] font-bold text-emerald-400 font-mono tracking-widest uppercase">
                  ACTIVE
                </span>
                <p className="text-4xl font-black tracking-tight leading-none text-white font-sans">
                  {formattedTime}
                </p>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider">
                  {formattedSeconds}s • {formattedDate.split(',')[0]}
                </div>
              </div>

              {/* Bottom metrics icon and rings */}
              <div className="pb-3 flex items-center gap-2 text-xs">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span className="font-mono text-[10px] text-gray-200">76 BPM</span>
              </div>
            </div>
          )}

        </motion.div>
      </div>

      {/* Screen Frame Mockup Desktop Stand Element */}
      {device === "desktop" && (
        <div className="flex flex-col items-center pointer-events-none select-none -mt-2">
          {/* Standing post connector */}
          <div className="w-16 h-7 bg-gray-600 border-x border-gray-700 shadow-md" />
          {/* Base plate */}
          <div className="w-40 h-2 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 rounded-t-lg shadow-lg border-b-2 border-gray-700" />
        </div>
      )}
    </div>
  );
}
