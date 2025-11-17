const Student = require('../models/Student');

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, rollNo, email, course } = req.body; // <-- include course

    if (!name || !rollNo || !email || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = new Student({
      name,
      rollNo,
      email,
      course,        // <-- FIXED: added to DB
      status: "inactive"
    });

    await student.save();
    res.status(201).json(student);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent
};
