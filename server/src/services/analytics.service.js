const Task = require('../models/Task');

const getTaskSummary = async (userId) => {
  const totalTasks = await Task.countDocuments({ user: userId });
  const completedTasks = await Task.countDocuments({ user: userId, status: 'completed' });
  const pendingTasks = totalTasks - completedTasks;

  const priorityDistribution = await Task.aggregate([
    { $match: { user: userId } },
    { $group: { _id: "$priority", count: { $sum: 1 } } }
  ]);

  const completionOverTime = await Task.aggregate([
    { $match: { user: userId, status: 'completed' } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const upcomingDeadlines = await Task.find({
    user: userId,
    dueDate: { $gte: today, $lte: nextWeek },
    status: { $ne: 'completed' }
  }).sort({ dueDate: 1 }).select('title dueDate priority');

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    priorityDistribution,
    completionOverTime,
    upcomingDeadlines
  };
};

module.exports = { getTaskSummary };
