const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
  },
});

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    subjects: [subjectSchema],
    totalMarks: {
      type: Number,
    },
    percentage: {
      type: Number,
    },
    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate result for same semester
resultSchema.index({ student: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model("Result", resultSchema);