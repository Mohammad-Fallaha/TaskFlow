const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');


// ROUTES
app.use('/api/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send('API is running');
});


// DATABASE
sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.log(err);
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
