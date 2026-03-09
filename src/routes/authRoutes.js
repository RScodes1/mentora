const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", auth, authController.me);

module.exports = router;