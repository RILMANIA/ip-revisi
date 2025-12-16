const axios = require("axios");

class AIController {
  static async explainCharacter(req, res) {
    try {
      const { characterName } = req.body;

      if (!characterName) {
        return res.status(400).json({ message: "Character name is required" });
      }

      const openaiApiKey = process.env.OPENAI_API_KEY;

      if (!openaiApiKey) {
        return res
          .status(500)
          .json({ message: "OpenAI API key not configured" });
      }

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a Genshin Impact expert. Provide detailed character lore and story information.",
            },
            {
              role: "user",
              content: `Explain the lore and story of ${characterName} from Genshin Impact.`,
            },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
        }
      );

      const explanation = response.data.choices[0].message.content;

      res.status(200).json({
        characterName,
        explanation,
      });
    } catch (error) {
      console.log(error, "<<<< error explainCharacter");
      if (error.response?.status === 401) {
        return res
          .status(503)
          .json({
            message: "Invalid OpenAI API key. Please check your configuration.",
          });
      }
      res
        .status(500)
        .json({
          message: "Failed to get AI explanation. Please try again later.",
        });
    }
  }

  static async recommendBuild(req, res) {
    try {
      const { characterName } = req.body;

      if (!characterName) {
        return res.status(400).json({ message: "Character name is required" });
      }

      const openaiApiKey = process.env.OPENAI_API_KEY;

      if (!openaiApiKey) {
        return res
          .status(500)
          .json({ message: "OpenAI API key not configured" });
      }

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a Genshin Impact build expert. Provide optimal weapon and artifact recommendations.",
            },
            {
              role: "user",
              content: `Recommend the best build (weapon and artifacts) for ${characterName} in Genshin Impact. Include main stats and substats priority.`,
            },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
        }
      );

      const recommendation = response.data.choices[0].message.content;

      res.status(200).json({
        characterName,
        recommendation,
      });
    } catch (error) {
      console.log(error, "<<<< error recommendBuild");
      if (error.response?.status === 401) {
        return res
          .status(503)
          .json({
            message: "Invalid OpenAI API key. Please check your configuration.",
          });
      }
      res
        .status(500)
        .json({
          message: "Failed to get AI recommendation. Please try again later.",
        });
    }
  }
}

module.exports = AIController;
