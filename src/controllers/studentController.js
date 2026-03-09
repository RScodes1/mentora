const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    const { name, age } = req.body;

    const student = await Student.create({
      name,
      age,
      parentId: req.user.id
    });

    res.json(student);

  } catch (err) {
    res.status(500).json({ message: "Failed to create student" });
  }
};

exports.getStudents = async (req, res) => {
  try {

    const students = await Student.find({ parentId: req.user.id });

    res.json(students);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};