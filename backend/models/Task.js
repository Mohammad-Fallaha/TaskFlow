const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
  },

  priority: {
    type: DataTypes.ENUM('high', 'medium', 'low'),
    defaultValue: 'medium',
  },

  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },

  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Task;