const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  username: {
    type: String,
    required: [true, 'Please enter a username']
  },
  phone: {
    type: String,
    required: [true, 'Please enter a phone'],
    minlength: [11, 'Minimum phone length is 11 characters'],
  },
  AOE:{
    type: String,
    required: [true, 'Please enter a AOE'],
  },
  imagedoctor:{
    type: String,
    
  }
});


// fire a function before doc saved to db
doctorSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
doctorSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const doctor = mongoose.model('doctor', doctorSchema);

module.exports = doctor;