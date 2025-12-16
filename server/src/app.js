const express = require("express");
const app = express();
const port = 3000;

// import middlewares
const authentication = require("./middlewares/authentication");
const { guardFavorite, guardBuild } = require("./middlewares/guardOwner");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// import controllers
const userController = require("./controllers/userController");
const mainController = require("./controllers/mainController");

app.get("/", (req, res) => {
  res.redirect("/login");
});

// user endpoints
app.post("/register", userController.register);
app.post("/login", userController.login);

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

// Only start server if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = app;
