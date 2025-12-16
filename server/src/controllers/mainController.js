const { Favorite, Build } = require("../models");

class mainController {
  // get user profile
  static async getUserProfile(req, res) {
    try {
      const user = req.user; // assuming user info is attached to req in authentication middleware
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.log(error, "<<<< error getUserProfile mainController");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // add favorite character
  static async addFavorite(req, res) {
    try {
      const user = req.user; // assuming user info is attached to req in authentication middleware
      const { character_name } = req.body;
      // Here you would typically add the favorite character to the database
      const favoriteCharacter = await Favorite.create({
        UserId: user.id,
        character_name: character_name,
      });

      res.status(201).json(favoriteCharacter);
    } catch (error) {
      console.log(error, "<<<< error addFavorite mainController");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // get favorite characters
  static async getFavorites(req, res) {
    try {
      const user = req.user; // assuming user info is attached to req in authentication middleware
      const favorites = await Favorite.findAll({
        where: { UserId: user.id },
      });

      res.status(200).json(favorites);
    } catch (error) {
      console.log(error, "<<<< error getFavorites mainController");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // delete favorite character
  static async deleteFavorite(req, res) {
    try {
      const user = req.user; // assuming user info is attached to req in authentication middleware
      const favoriteId = req.params.id;
      const favorite = await Favorite.findOne({
        where: { id: favoriteId, UserId: user.id },
      });

      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }
      await favorite.destroy();
      res.status(200).json({ message: "Favorite deleted successfully" });
    } catch (error) {
      console.log(error, "<<<< error deleteFavorite mainController");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // post build
  static async addBuild(req, res) {
    try {
      const user = req.user; // assuming user info is attached to req in authentication middleware
      const { character_name, weapon, artifact, notes } = req.body;
      const newBuild = await Build.create({
        UserId: user.id,
        character_name,
        weapon,
        artifact,
        notes,
      });
      res.status(201).json(newBuild);
    } catch (error) {
      console.log(error, "<<<< error addBuild mainController");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // get builds
  static async getBuilds(req, res) {
    try {
      const user = req.user; // assuming user info is attached to req in authentication middleware
      const builds = await Build.findAll({
        where: { UserId: user.id },
      });
      res.status(200).json(builds);
    } catch (error) {
      console.log(error, "<<<< error getBuilds mainController");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // update build
  static async updateBuild(req, res) {
    try {
      const user = req.user;
      const buildId = req.params.id;
      const { character_name, weapon, artifact, notes } = req.body;

      await Build.update(
        {
          character_name,
          weapon,
          artifact,
          notes,
        },
        {
          where: { id: buildId, UserId: user.id },
        }
      );

      res.status(200).json({ message: "Build updated successfully" });
    } catch (error) {
      console.log(error, "<<<< error updateBuild mainController");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // delete build
  static async deleteBuild(req, res) {
    try {
      const user = req.user;
      const buildId = req.params.id;
      const build = await Build.findOne({
        where: { id: buildId, UserId: user.id },
      });
      if (!build) {
        return res.status(404).json({ message: "Build not found" });
      }
      await build.destroy();
      res.status(200).json({ message: "Build deleted successfully" });
    } catch (error) {
      console.log(error, "<<<< error deleteBuild mainController");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = mainController;
