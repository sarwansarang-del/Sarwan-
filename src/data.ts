import { WallpaperStyle, ColorPalette, GeneratedWallpaper } from "./types";

export const WALLPAPER_STYLES: WallpaperStyle[] = [
  { 
    id: "minimalist", 
    name: "Minimalist Vector", 
    description: "Elegant, flat geometry & spacious layouts", 
    icon: "Feather" 
  },
  { 
    id: "photorealistic", 
    name: "Photorealistic", 
    description: "Vibrant landscape scenery with real-world lighting", 
    icon: "Camera" 
  },
  { 
    id: "cyberpunk", 
    name: "Cyberpunk Glow", 
    description: "Vivid sci-fi neon reflections & detailed futuristic styling", 
    icon: "Zap" 
  },
  { 
    id: "watercolor", 
    name: "Watercolor Masterpiece", 
    description: "Whimsical ink splatters & hand-painted paint bleedings", 
    icon: "Brush" 
  },
  { 
    id: "anime", 
    name: "Anime Dreamscape", 
    description: "Makoto Shinkai style gorgeous sky, sunset, and clouds", 
    icon: "Sparkles" 
  },
  { 
    id: "3d-render", 
    name: "3D Isometric", 
    description: "Stylized high-quality plastic/clay modeling look", 
    icon: "Layers" 
  },
  { 
    id: "abstract-fluid", 
    name: "Abstract Fluid", 
    description: "Acrylic pourings, liquid marble & luxury gold borders", 
    icon: "Droplet" 
  },
  { 
    id: "cosmic-space", 
    name: "Cosmic Nebula", 
    description: "Deep stellar clusters, colourful dust, and planet silhouettes", 
    icon: "Globe" 
  },
  { 
    id: "line-art", 
    name: "Contemporary Line Art", 
    description: "Luxury geometric lines & sleek mathematical sketching", 
    icon: "FileText" 
  }
];

export const COLOR_PALETTES: ColorPalette[] = [
  { 
    id: "cyber-neon", 
    name: "Cyber Neon", 
    colors: ["#ff007f", "#00f0ff", "#7000ff", "#120024"], 
    description: "Hot pink, fluorescent cyan, neon indigo, and dark violet" 
  },
  { 
    id: "soft-pastel", 
    name: "Soft Pastel", 
    colors: ["#ffccd5", "#ffebd3", "#d6e2e9", "#e2ece9"], 
    description: "Soft strawberry pink, vanilla bean cream, and ice blue washes" 
  },
  { 
    id: "ocean-breeze", 
    name: "Ocean Breeze", 
    colors: ["#0077b6", "#00b4d8", "#90e0ef", "#03045e"], 
    description: "Abyss sapphire ocean blue, cold sea foam, and deep navy base" 
  },
  { 
    id: "warm-earthy", 
    name: "Warm Earthy", 
    colors: ["#e07a5f", "#f4f1de", "#3d405b", "#81b29a"], 
    description: "Terracotta sands, cream clay, warm iron gray, and olive sage" 
  },
  { 
    id: "dark-mono", 
    name: "Noir Monochrome", 
    colors: ["#1e1e24", "#3a3a43", "#a9a9b3", "#08080a"], 
    description: "Deep jet coal, premium metallic graphite, and starry sky silver" 
  },
  { 
    id: "pastoral", 
    name: "Pastoral Forest", 
    colors: ["#2d6a4f", "#74c69d", "#d8f3dc", "#1b4332"], 
    description: "Lush moss, pine trunks, spring mint blades, and ancient roots" 
  },
  { 
    id: "sunset", 
    name: "Sunset Gradient", 
    colors: ["#ff4e50", "#f9d423", "#e01a4f", "#3a000c"], 
    description: "Fiery orange clouds, warm golden daylight rays, and crimson wines" 
  }
];

export const PRESET_WALLPAPERS: GeneratedWallpaper[] = [
  {
    id: "preset-yosemite",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    prompt: "Atmospheric yosemite mountain valley with mirrored lake, photorealistic golden hour glow, volumetric lights",
    style: "photorealistic",
    aspectRatio: "16:9",
    colorPalette: "sunset",
    timestamp: "PRESET_ASSET_1",
    isFavorite: false
  },
  {
    id: "preset-cyberpunk",
    url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    prompt: "Hyper detailed neon lights reflecting on wet streets of cyberpunk futuristic city, cinematic, unreal engine render",
    style: "cyberpunk",
    aspectRatio: "9:16",
    colorPalette: "cyber-neon",
    timestamp: "PRESET_ASSET_2",
    isFavorite: false
  },
  {
    id: "preset-nebula",
    url: "https://images.unsplash.com/photo-1464802686167-b939fa691065?auto=format&fit=crop&w=1200&q=80",
    prompt: "Spectacular galaxy star field with cosmic nebulas, blue gas dust particles, planet silhouettes, starry exploration",
    style: "cosmic-space",
    aspectRatio: "16:9",
    colorPalette: "dark-mono",
    timestamp: "PRESET_ASSET_3",
    isFavorite: true
  },
  {
    id: "preset-watercolor",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    prompt: "Beautiful whimsical flower fields, dreamy watercolor paint blend wash textures, artistic ink splatters background",
    style: "watercolor",
    aspectRatio: "4:3",
    colorPalette: "soft-pastel",
    timestamp: "PRESET_ASSET_4",
    isFavorite: false
  },
  {
    id: "preset-minimalist",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    prompt: "Abstract fluid paint design curves, modern minimalist gradient background, smooth elegant shapes vector",
    style: "abstract-fluid",
    aspectRatio: "1:1",
    colorPalette: "ocean-breeze",
    timestamp: "PRESET_ASSET_5",
    isFavorite: false
  }
];
