const mongoose = require('../DB/db');

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
