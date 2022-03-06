const mongoose = require('mongoose');

const pharmcySchema = new mongoose.Schema({
  username: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Please enter a phone'],
      minlength: [11, 'Minimum phone length is 11 characters'],
    }
  });

const pharmcy = mongoose.model('pharmcy', pharmcySchema);

module.exports = pharmcy;