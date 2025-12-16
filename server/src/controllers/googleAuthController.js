const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class GoogleAuthController {
  static async googleLogin(req, res) {
    try {
      const { googleToken } = req.body;

      if (!googleToken) {
        return res.status(400).json({ message: "Google token is required" });
      }

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { email, name } = payload;

      // Find or create user
      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create({
          name,
          email,
          password: `google_${Date.now()}_${Math.random().toString(36)}`,
        });
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({
        access_token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error, "<<<< error google login");
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = GoogleAuthController;
