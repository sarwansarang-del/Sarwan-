export type AspectRatio = "9:16" | "16:9" | "4:3" | "1:1";

export interface WallpaperStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[]; // hex codes for preview
  description: string;
}

export interface GeneratedWallpaper {
  id: string;
  url: string;
  prompt: string;
  style: string;
  aspectRatio: AspectRatio;
  colorPalette: string;
  timestamp: string;
  isFavorite?: boolean;
}

export type DeviceType = "phone" | "desktop" | "tablet" | "watch";
