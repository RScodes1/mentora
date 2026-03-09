const Lesson = require("../models/Lesson");

exports.createLesson = async (req, res) => {
  try {
    const { title, description } = req.body;

    const lesson = await Lesson.create({
      title,
      description,
      mentorId: req.user.id
    });

    res.json(lesson);

  } catch (err) {
    res.status(500).json({ message: "Failed to create lesson" });
  }
};