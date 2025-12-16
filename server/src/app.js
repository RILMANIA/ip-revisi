const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// import controllers
const userController = require("./controllers/userController");
const mainController = require("./controllers/mainController");

app.get("/", (req, res) => {
  res.send("Landing page");
});

// user endpoints
app.post("/register", userController.register);
app.post("/login", userController.login);

//main endpoints

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
