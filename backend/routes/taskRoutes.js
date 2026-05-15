const express = require('express');

const router = express.Router();

const verifyUser = require('../middleware/authMiddleware');

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.use(verifyUser);

router.post('/', createTask);

router.get('/', getTasks);

router.get('/:id', getTaskById);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

module.exports = router;