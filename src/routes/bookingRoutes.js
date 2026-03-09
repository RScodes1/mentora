const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const bookingController = require("../controllers/bookingController");

router.post("/", auth, role("parent"), bookingController.createBooking);

module.exports = router;