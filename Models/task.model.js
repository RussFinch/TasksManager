
const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  taskName: String,
  description: String,
  dueDate: {
    type: Date,
  },
  completed: Boolean,
  completionDate: {
    type: Date,
  },
  createdBy: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tasks', TaskSchema);
