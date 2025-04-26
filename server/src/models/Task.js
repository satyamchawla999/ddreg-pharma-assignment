const mongoose = require('mongoose');

const TASK_STATUSES = ['pending', 'completed'];
const TASK_PRIORITIES = ['high', 'medium', 'low'];

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: [true, 'Title is required'] },
  description: { type: String },
  status: { 
    type: String, 
    enum: TASK_STATUSES, 
    default: 'pending' 
  },
  priority: { 
    type: String, 
    enum: TASK_PRIORITIES, 
    default: 'medium' 
  },
  dueDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
