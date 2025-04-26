const express = require('express');
const {
  createTask,
  getTask,
  listTasks,
  updateTask,
  deleteTask,
  taskAnalytics
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
  .post(protect, createTask)
  .get(protect, listTasks);

router.route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.get('/analytics/summary', protect, taskAnalytics);

module.exports = router;
