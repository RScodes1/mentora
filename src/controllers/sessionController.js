const Session = require("../models/Session");

exports.createSession = async (req, res) => {
  try {
    const { lessonId, date, topic, summary } = req.body;

    const session = await Session.create({
      lessonId,
      date,
      topic,
      summary
    });

    res.json(session);

  } catch (err) {
    res.status(500).json({ message: "Failed to create session" });
  }
};

exports.getLessonSessions = async (req, res) => {
  try {
    const { id } = req.params;

    const sessions = await Session.find({ lessonId: id });

    res.json(sessions);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};