const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const sessionController = require("../controllers/sessionController");

router.post("/", auth, role("mentor"), sessionController.createSession);

router.get(
  "/lessons/:id/sessions",
  auth,
  sessionController.getLessonSessions
);

module.exports = router;