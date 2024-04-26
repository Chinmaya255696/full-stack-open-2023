const mongoose = require('mongoose');

const url = process.env.MONGODB_URI; // Set your MongoDB URI

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;
