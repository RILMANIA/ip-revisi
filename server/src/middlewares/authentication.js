const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

module.exports = async function authentication(req, res, next) {
  try {
    // validate input
    if (!req.headers.authorization) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    // verify token
    const data = verifyToken(req.headers.authorization.slice("Bearer ".length));
    //.   ^ { id: user.id }
    //! check user ke db berdasarkan data dari token [] -> lambat -> redis
    const user = await User.findByPk(data.id);
    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    // attach user tsb ke req
    req.user = user;
    // next
    next();
  } catch (err) {
    console.log("🚀 ~ authentication ~ err:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
