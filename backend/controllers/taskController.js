const Task = require('../models/Task');


exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      userId,
    } = req.body;

    if (!title || !userId) {
      return res.status(400).json({
        message: 'title and userId are required',
      });
    }

    const task = await Task.create({
      title,
      description: description || null,
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate: dueDate || null,
      userId,
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error('CREATE TASK ERROR:', error);

    return res.status(500).json({
      message: error.message,
    });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('GET TASKS ERROR:', error);

    return res.status(500).json({
      message: error.message,
    });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    await Task.update(req.body, {
      where: { id },
    });

    const updatedTask = await Task.findByPk(id);

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error('UPDATE TASK ERROR:', error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    await Task.destroy({
      where: { id },
    });

    return res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('DELETE TASK ERROR:', error);

    return res.status(500).json({
      message: error.message,
    });
  }
};