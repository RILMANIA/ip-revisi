const axios = require("axios");

class AIController {
  static async explainCharacter(req, res) {
    try {
      console.log("=== AI Explanation Request Started ===");
      console.log("Request body:", req.body);

      const { characterName } = req.body;

      if (!characterName) {
        console.log("Error: Character name is missing");
        return res.status(400).json({ message: "Character name is required" });
      }

      console.log("Character name:", characterName);

      const geminiApiKey = process.env.GEMINI_API_KEY;
      console.log("API key exists:", !!geminiApiKey);
      console.log("API key length:", geminiApiKey?.length);

      if (!geminiApiKey || geminiApiKey === "your-gemini-api-key") {
        console.log("Error: API key not configured");
        return res.status(503).json({
          message:
            "Gemini API key not configured. Please add a valid API key to use AI features.",
        });
      }

      console.log("Making request to Gemini API...");
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a Genshin Impact expert. Provide detailed character lore and story information. Explain the lore and story of ${characterName} from Genshin Impact.`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data structure:", {
        hasCandidates: !!response.data.candidates,
        candidatesLength: response.data.candidates?.length,
        hasContent: !!response.data.candidates?.[0]?.content,
        hasParts: !!response.data.candidates?.[0]?.content?.parts,
        partsLength: response.data.candidates?.[0]?.content?.parts?.length,
      });

      const explanation =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!explanation) {
        console.log("Error: No explanation text in response");
        console.log("Full response:", JSON.stringify(response.data, null, 2));
        return res.status(500).json({
          message: "Received unexpected response from AI service.",
        });
      }

      console.log("Explanation length:", explanation.length);
      console.log("=== AI Explanation Request Completed Successfully ===");

      res.status(200).json({
        characterName,
        explanation,
      });
    } catch (error) {
      console.log("=== AI Explanation Request Failed ===");
      console.log("Error type:", error.constructor.name);
      console.log("Error message:", error.message);
      console.log("Error response status:", error.response?.status);
      console.log("Error response data:", error.response?.data);
      console.log("Full error:", error);

      if (error.response?.status === 400 || error.response?.status === 404) {
        return res.status(503).json({
          message:
            "Invalid Gemini API key or model not available. Please check your configuration.",
        });
      }
      res.status(500).json({
        message: "Failed to get AI explanation. Please try again later.",
        error: error.message,
      });
    }
  }

  static async recommendBuild(req, res) {
    try {
      const { characterName } = req.body;

      if (!characterName) {
        return res.status(400).json({ message: "Character name is required" });
      }

      const geminiApiKey = process.env.GEMINI_API_KEY;

      if (!geminiApiKey || geminiApiKey === "your-gemini-api-key") {
        return res.status(503).json({
          message:
            "Gemini API key not configured. Please add a valid API key to use AI features.",
        });
      }

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a Genshin Impact build expert. Provide optimal weapon and artifact recommendations. Recommend the best build (weapon and artifacts) for ${characterName} in Genshin Impact. Include main stats and substats priority.`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const recommendation =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!recommendation) {
        console.log(
          "Unexpected response structure:",
          JSON.stringify(response.data)
        );
        return res.status(500).json({
          message: "Received unexpected response from AI service.",
        });
      }

      res.status(200).json({
        characterName,
        recommendation,
      });
    } catch (error) {
      console.log(error.response?.data || error, "<<<< error recommendBuild");
      if (error.response?.status === 400 || error.response?.status === 404) {
        return res.status(503).json({
          message:
            "Gemini API error. The model may not be available or API key is invalid.",
        });
      }
      res.status(500).json({
        message: "Failed to get AI recommendation. Please try again later.",
      });
    }
  }
}

module.exports = AIController;
