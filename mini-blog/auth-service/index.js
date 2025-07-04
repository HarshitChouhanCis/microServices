const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const app = express();

app.use(express.json());
app.use('/', authRoutes);

mongoose.connect('mongodb://localhost:27017/auth-service')
  .then(() => {
    app.listen(4000, () => console.log('Auth Service on port 4000'));
  });