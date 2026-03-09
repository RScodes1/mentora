const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { studentId, lessonId } = req.body;

    const booking = await Booking.create({
      studentId,
      lessonId
    });

    res.json(booking);

  } catch (err) {
    res.status(500).json({ message: "Failed to create booking" });
  }
};