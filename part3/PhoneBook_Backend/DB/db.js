require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

if (!url) {
    console.error('Missing MONGODB_URI. Ensure that .env file is configured correctly.');
    process.exit(1);
}

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;
