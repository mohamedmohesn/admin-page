const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
    name: {
      type: String,
    },
    specialty: {
      type: String,
    },
    imagespecialty:{
      type: String,
    }
  });

const specialty = mongoose.model('specialty', specialtySchema);

module.exports = specialty;