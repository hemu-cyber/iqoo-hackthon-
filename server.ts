import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // Initialize Gemini if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (err) {
      console.warn("Failed to initialize GoogleGenAI with provided key:", err);
    }
  }

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      platform: "MedLens AI India",
      geminiConfigured: Boolean(ai),
      version: "2.5.0-in",
      timestamp: new Date().toISOString(),
    });
  });

  // Medical AI Analysis Endpoint
  app.post("/api/analyze-medical", async (req, res) => {
    try {
      const {
        taskType = "prescription", // 'prescription' | 'lab_report' | 'symptom_triage' | 'interaction'
        userInput = "",
        imageBase64 = null,
        mimeType = "image/jpeg",
        targetLanguage = "English",
      } = req.body;

      if (!ai) {
        return res.status(503).json({
          error: "GEMINI_NOT_CONFIGURED",
          message: "Gemini AI API key is not configured on server. Switching to local Indian Clinical Intelligence engine.",
        });
      }

      const indianMedicalSystemPrompt = `
You are MedLens AI, a specialized clinical AI assistant built exclusively for India's healthcare ecosystem.
You strictly adhere to Indian clinical guidelines (National Medical Commission / NMC, ICMR, CDSCO, and Ministry of Health & Family Welfare - MoHFW).

Crucial rules for India:
1. Always reference Indian medicine brands and their Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP / Jan Aushadhi) generic equivalents with typical Indian Rupee (₹) price comparisons.
2. In case of emergency or severe red flags (e.g. chest pain, severe dengue platelet drop < 50,000, high fever with altered sensorium, stroke symptoms), prominently output Indian Emergency Helplines:
   - 108 (National Emergency Ambulance)
   - 112 (All-in-one Emergency Helpline)
   - 102 (Janani Shishu Suraksha / Maternity)
   - 14416 (Tele-MANAS Mental Health helpline)
3. For lab reports, calibrate interpretation against leading Indian laboratories (e.g., Dr Lal PathLabs, Apollo Diagnostics, Metropolis, SRL/Agilus, Thyrocare).
4. Provide recommendations adhering to Indian dietary habits (e.g., khichdi, curd rice, coconut water, dal, avoidance of spicy fried street foods during gastroenteritis) and lifestyle in India.
5. Provide output in the requested language: ${targetLanguage}. If the language is an Indian language (e.g. Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada), ensure culturally accurate and respectful terms.
6. Always include a clear disclaimer: "MedLens AI provides clinical decision support and educational analysis in accordance with Indian telemedicine guidelines. Always consult a registered medical practitioner (MBBS/MD) for formal diagnosis and prescription."

Respond in valid JSON format:
{
  "summary": "Concise summary of findings in plain language",
  "confidenceScore": 95,
  "flagLevel": "normal" | "caution" | "critical",
  "identifiedItems": [
    {
      "name": "Medicine or Lab Test name",
      "category": "Antibiotic / Antipyretic / CBC / Lipid etc.",
      "dosageOrValue": "e.g. 650mg TDS or 45,000 /uL",
      "interpretation": "What this means in plain language",
      "janAushadhiGeneric": "Generic salt equivalent (e.g. Paracetamol 650mg)",
      "estimatedBrandedPriceINR": 35,
      "estimatedJanAushadhiPriceINR": 5.5,
      "savingsPercentage": 84,
      "cautionNotes": "Take after meals, avoid alcohol, etc."
    }
  ],
  "potentialConditions": ["Condition 1 (e.g. Dengue Viral Fever)", "Condition 2 (e.g. Acute Gastroenteritis)"],
  "dietaryAdvice": ["Nutritional recommendation 1 tailored for Indian food", "Recommendation 2"],
  "doctorConsultationQuestions": ["Specific question 1 to ask physician", "Question 2"],
  "emergencyHelplines": ["108 - Emergency Ambulance", "112 - National Emergency", "14416 - Tele-MANAS"],
  "disclaimer": "Disclaimer statement"
}
`;

      let contents: any;
      const promptText = `Task: ${taskType}\nUser/Document Context: ${userInput}\nProvide structured clinical assessment for Indian patient.`;

      if (imageBase64) {
        // Strip data URL prefix if present
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        contents = {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType || "image/jpeg",
              },
            },
            {
              text: `${promptText}\nExamine this Indian medical prescription / lab report image carefully and extract all medicine names, salts, dosages, lab values, and clinical notes.`,
            },
          ],
        };
      } else {
        contents = promptText;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: indianMedicalSystemPrompt,
          responseMimeType: "application/json",
          temperature: 0.2, // Low temperature for clinical accuracy
        },
      });

      const responseText = response.text || "{}";
      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch (e) {
        parsedData = {
          summary: responseText,
          confidenceScore: 88,
          flagLevel: "caution",
          identifiedItems: [],
          potentialConditions: ["Review needed by doctor"],
          dietaryAdvice: ["Stay hydrated with boiled water or ORS/coconut water."],
          doctorConsultationQuestions: ["Please verify dosage with doctor"],
          emergencyHelplines: ["108 - Emergency Ambulance", "112 - National Emergency"],
          disclaimer: "Please consult a registered Indian medical practitioner.",
        };
      }

      return res.json({
        success: true,
        data: parsedData,
        source: "gemini-3.8-flash",
      });
    } catch (err: any) {
      console.error("Error in /api/analyze-medical:", err);
      return res.status(500).json({
        error: "ANALYSIS_FAILED",
        message: err.message || "Medical analysis encountered an issue",
      });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MedLens AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
