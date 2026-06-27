import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Wait, we need an API key to access @google/genai
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt, maxTokens = 2000, model = 'gemini-1.5-flash-8b-exp' } = req.body;
      
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          maxOutputTokens: maxTokens,
        }
      });
      
      res.json({ content: response.text });
    } catch (error: any) {
      console.error("Error generating text:", error);
      res.status(500).json({ error: error.message || "Error al generar texto" });
    }
  });

  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, aspectRatio = "1:1", imageSize = "1K" } = req.body;
      
      // We will use 'gemini-3.1-flash-image-preview' for high-quality images and extra sizes
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [
            { text: prompt },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
            imageSize: imageSize
          }
        },
      });
      
      let imageUrl = null;
      let textResponse = null;

      if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${base64EncodeString}`;
          } else if (part.text) {
            textResponse = part.text;
          }
        }
      }

      if (imageUrl) {
        res.json({ imageUrl, text: textResponse });
      } else {
        res.status(500).json({ error: "No se generó ninguna imagen." });
      }

    } catch (error: any) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: error.message || "Error al generar la imagen" });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
