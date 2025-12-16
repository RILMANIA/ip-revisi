class mainController {
  static async getLandingPage(req, res) {
    try {
      res.status(200).json({ message: "Welcome to the Landing Page" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = mainController;
