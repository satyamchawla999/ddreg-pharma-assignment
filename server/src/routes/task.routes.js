const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  taskAnalytics
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
  .post(protect, createTask)
  .get(protect, getTasks);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.get('/analytics/summary', protect, taskAnalytics);

module.exports = router;
