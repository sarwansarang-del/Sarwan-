import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Dynamic Prompt Enhancer mapping to generate spectacular high-quality outputs
const getStyledPrompt = (userPrompt: string, style: string, colors: string) => {
  const cleanPrompt = userPrompt.trim() || "beautiful abstract scenery";
  let promptText = `${cleanPrompt}`;

  if (colors && colors !== "none") {
    promptText += `, optimized with a palette of ${colors} colors`;
  }

  // Inject beautiful artistic composition instructions based on style
  switch (style) {
    case "minimalist":
      promptText += ". Style: elegant modern minimalist, ultra-clean vector, spacious composition, peaceful flat colors, crisp lines, modern aesthetic, beautiful empty spaces";
      break;
    case "photorealistic":
      promptText += ". Style: professional photorealistic landscape photography, National Geographic level, details, 35mm lens, atmospheric volumetric lighting, hyper-realistic textures, extremely natural";
      break;
    case "cyberpunk":
      promptText += ". Style: breathtaking cyberpunk sci-fi synthwave, hyper-detailed neon night lights, glowing streets, futuristic city landscape, cinematic, dramatic shadows, Unreal Engine 5 render, futuristic high-tech vibe";
      break;
    case "watercolor":
      promptText += ". Style: dreamy watercolor masterpiece, soft pastel color washes, hand-painted textures, artistic ink splatters, whimsical, bleeding edges, elegant, tranquil look";
      break;
    case "anime":
      promptText += ". Style: stunning modern Makoto Shinkai style anime landscape, beautiful clouds, detailed high-contrast daylight, warm nostalgic lighting, vibrant visual storytelling, fantasy anime art";
      break;
    case "3d-render":
      promptText += ". Style: gorgeous 3D isometric plastic/clay render, stylized cute look, Blender render, octane render, soft global illumination, toy aesthetics, incredibly cute and detailed models";
      break;
    case "abstract-fluid":
      promptText += ". Style: mesmerizing abstract fluid acrylic pouring art, swirling organic patterns, glossy marble textures, dynamic liquid gradients, elegant, modern gold veins highlights";
      break;
    case "cosmic-space":
      promptText += ". Style: deep cosmic space exploration scene, glowing nebulas, sparkling stellar clusters, planetary orbits, majestic starry night sky, spectacular fantasy astronomy art";
      break;
    case "line-art":
      promptText += ". Style: artistic geometric design line art, sleek black-and-white minimalist contour lines, luxury line art, perfect circles, golden ratio, beautiful contemporary sketch look";
      break;
    case "nature":
    default:
      promptText += ". Style: breathtaking organic nature, lush green hills, soft sun rays filtering through forest leaves, peaceful mountain stream, high contrast natural beauty";
      break;
  }

  // Wallpaper optimization postfix controls to ensure it works well on screens as a backdrop (no noisy clutter)
  promptText += ". Ideal for screen wallpaper: beautiful clean background, perfect framing, balanced focus, high resolving detail, no text, no watermark, no noise, artistic wallpaper style.";
  return promptText;
};

// Lazy initialize Gemini client to prevent crashes if key is initially absent
let aiClient: GoogleGenAI | null = null;
const getGeminiClient = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY environment variable is not defined. Please add your key in Settings > Secrets.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
};

// API Check & Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Wallpaper Generator Server is running." });
});

// POST endpoint for generating wallpaper
app.post("/api/generate-wallpaper", async (req, res) => {
  try {
    const { prompt, style, colorPalette, aspectRatio } = req.body;

    // Validate request parameters
    const finalPrompt = getStyledPrompt(prompt, style, colorPalette);
    const validAspectRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    const finalAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : "16:9";

    const ai = getGeminiClient();

    // Call Gemini 2.5 Flash Image Model to generate output
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: finalAspectRatio as any,
        },
      },
    });

    let base64Image = "";
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      // Sometimes image models might respond with text if safety/processing occurs
      const textResponse = response.text || "No image generated.";
      return res.status(400).json({
        error: "Image generation did not return a valid binary output.",
        details: textResponse,
      });
    }

    const imageUrl = `data:image/png;base64,${base64Image}`;
    res.json({
      imageUrl,
      prompt: finalPrompt,
      style,
      aspectRatio: finalAspectRatio,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("Image generation failed:", error);
    res.status(500).json({
      error: error.message || "An error occurred while generating high-fidelity image.",
      code: "GENERATION_FAILURE",
    });
  }
});

// Setup Vite Development middlewares or Serve production static assets compiled locally
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    // Vite middleware mode for seamless client serving
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server integration active.");
  } else {
    // Production serving from static '/dist' build container
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production environment: Static asset rendering active.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Wallpaper Generator running securely on http://0.0.0.0:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to bootstrap application:", err);
});
