const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const lessonController = require("../controllers/lessonController");

router.post("/", auth, role("mentor"), lessonController.createLesson);

module.exports = router;