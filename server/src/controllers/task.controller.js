const Task = require('../models/Task');
const { getTaskSummary } = require('../services/analytics.service');

const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      priority
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const listTasks = async (req, res, next) => {
  try {
    const { sortBy, order } = req.query;

    let sortOption = { createdAt: -1 };

    if (sortBy === 'dueDate') {
      sortOption = { dueDate: order === 'asc' ? 1 : -1 };
    } else if (sortBy === 'priority') {
      sortOption = { 
        priority: order === 'asc' ? 1 : -1 
      };
    }

    const tasks = await Task.find({ user: req.user._id }).sort(sortOption);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, status, dueDate, priority } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const taskAnalytics = async (req, res, next) => {
  try {
    const summary = await getTaskSummary(req.user._id);
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTask, listTasks, updateTask, deleteTask, taskAnalytics };
