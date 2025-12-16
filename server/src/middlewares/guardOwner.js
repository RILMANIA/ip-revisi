const { Favorite, Build } = require("../models");

async function guardFavorite(req, res, next) {
  const favoriteId = req.params.id;
  const favorite = await Favorite.findByPk(favoriteId);
  if (!favorite) {
    res.status(404).json({
      message: "Data not found",
    });
    return;
  }

  if (favorite.UserId !== req.user.id) {
    res.status(403).json({
      message: "You are not authorized",
    });
    return;
  }

  next();
}

async function guardBuild(req, res, next) {
  const buildId = req.params.id;
  const build = await Build.findByPk(buildId);
  if (!build) {
    res.status(404).json({
      message: "Data not found",
    });
    return;
  }
  if (build.UserId !== req.user.id) {
    res.status(403).json({
      message: "You are not authorized",
    });
    return;
  }
  next();
}

module.exports = { guardFavorite, guardBuild };
