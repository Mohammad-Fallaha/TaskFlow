const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      latitude,
      longitude,
    } = req.body;

    const userId = req.user.uid;

    if (!title) {
      return res.status(400).json({
        message: 'Title is required',
      });
    }

    const task = await Task.create({
      title,
      description: description || null,
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate: dueDate || null,
      userId,

      latitude: latitude || null,
      longitude: longitude || null,
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
    const userId = req.user.uid;

    const tasks = await Task.findAll({
      where: {
        userId,
      },
    });

    return res.status(200).json(tasks);

  } catch (error) {
    console.error('GET TASKS ERROR:', error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user.uid;

    const task = await Task.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    return res.status(200).json(task);

  } catch (error) {
    console.error('GET TASK BY ID ERROR:', error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user.uid;

    const task = await Task.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    await Task.update(req.body, {
      where: {
        id,
        userId,
      },
    });

    const updatedTask = await Task.findOne({
      where: {
        id,
        userId,
      },
    });

    return res.status(200).json(updatedTask);

  } catch (error) {
    console.error('UPDATE TASK ERROR:', error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user.uid;

    const task = await Task.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    await Task.destroy({
      where: {
        id,
        userId,
      },
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