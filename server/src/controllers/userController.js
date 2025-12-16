const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res) {
    try {
      const user = await User.create(req.body);

      res.status(201).json({
        name: user.name,
        email: user.email,
        message: "User registered successfully",
      });
    } catch (error) {
      console.log(error, "<<<<<<<<<<<<<< error register user");
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({
          message: error.errors[0].message,
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
      }
      if (!password) {
        res.status(400).json({ message: "Password is required" });
        return;
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({
          message: "Invalid email/password",
        });
        return;
      }
      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) {
        res.status(401).json({
          message: "Invalid email/password",
        });
        return;
      }

      res.json({
        access_token: signToken({ id: user.id }),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
module.exports = UserController;
