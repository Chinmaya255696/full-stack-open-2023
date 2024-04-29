

const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3 
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /\b\d{2,3}-\d{3,}\b/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Must be in the format XX-XXXX... or XXX-XXXX...`
    }
  }
});

module.exports = mongoose.model('Person', personSchema);
