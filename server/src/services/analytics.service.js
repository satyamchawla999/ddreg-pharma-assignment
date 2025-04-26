const Task = require('../models/Task');

const getTaskSummary = async (userId) => {
  const totalTasks = await Task.countDocuments({ user: userId });
  const completedTasks = await Task.countDocuments({ user: userId, status: 'completed' });
  const pendingTasks = totalTasks - completedTasks;

  return {
    totalTasks,
    completedTasks,
    pendingTasks
  };
};

module.exports = { getTaskSummary };