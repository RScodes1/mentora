const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const studentController = require("../controllers/studentController");

router.post("/", auth, role("parent"), studentController.createStudent);
router.get("/", auth, role("parent"), studentController.getStudents);

module.exports = router;