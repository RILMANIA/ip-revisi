if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// import middlewares
const authentication = require("./middlewares/authentication");
const { guardFavorite, guardBuild } = require("./middlewares/guardOwner");

app.use(
  cors({
    origin: [
      "https://genshin-ai-companion-1e1d4.web.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// import controllers
const userController = require("./controllers/userController");
const mainController = require("./controllers/mainController");
const googleAuthController = require("./controllers/googleAuthController");
const aiController = require("./controllers/aiController");

app.get("/", (req, res) => {
  res.redirect("/login");
});

// user endpoints
app.post("/register", userController.register);
app.post("/login", userController.login);
app.post("/google-login", googleAuthController.googleLogin);

// public endpoints
app.get("/public/builds", mainController.getPublicBuilds);

// protected routes
app.use(authentication);

//main endpoints
app.get("/users/me", mainController.getUserProfile);

app.post("/favorites", mainController.addFavorite);
app.get("/favorites", mainController.getFavorites);
app.delete("/favorites/:id", guardFavorite, mainController.deleteFavorite);

app.post("/builds", mainController.addBuild);
app.get("/builds", mainController.getBuilds);
app.put("/builds/:id", guardBuild, mainController.updateBuild);
app.delete("/builds/:id", guardBuild, mainController.deleteBuild);

// AI endpoints
app.post("/ai/explain", aiController.explainCharacter);
app.post("/ai/recommend", aiController.recommendBuild);

// Only start server if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = app;
