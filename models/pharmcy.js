const mongoose = require('mongoose');

const pharmcySchema = new mongoose.Schema({
  username: {
      type: String,
      required: [true, 'Please enter a username'],
    },
    location: {
      type: String,
      required: [true, 'Please enter a location'],
    },
    phone: {
      type: String,
      required: [true, 'Please enter a phone'],
     
    } ,
    describtion: {
      type: String,
      required: [true, 'Please enter a describtion'],
    },
    imagepharmcy:{
      type: String,
    }
  });

const pharmcy = mongoose.model('pharmcy', pharmcySchema);

module.exports = pharmcy;