const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');


app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

sequelize
  .sync({ alter: true })   
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});