const mongoose = require('mongoose');

// Schema: describes the shape of a task document stored in MongoDB
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'Task text is required'],
      trim: true,
      maxlength: [200, 'Task cannot exceed 200 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Model: gives us .find(), .create(), .findByIdAndUpdate(), .findByIdAndDelete() ...
module.exports = mongoose.model('Todo', todoSchema);
