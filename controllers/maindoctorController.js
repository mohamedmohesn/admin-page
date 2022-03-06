const User = require("../models/maindoctor");
const { find } = require("../models/maindoctor");
var nest = require("nested-property");
const jwt = require('jsonwebtoken');
const Specialty = require('../models/specialty')

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: maxAge
  });
};


// controller actions


module.exports.getALL = async (req, res) => {
        
        try {
            const user = await User.find().populate('specialty');
            res.send(user);
            res.status(201).json({ user: user._id });
          }
          catch(err) {
            res.status(400).json({ errors });
          }
}
module.exports.getALLName = async (req, res) => {
        
    try {
        const user = await User.find({username}=req.body).populate('specialty');
        res.status(201).json({ user: user._id });
        res.json(user);
      }
      catch(err) {
        const errors = "error in search";
        res.status(400).json({ errors });
      }
}

module.exports.getALLAOE = async (req, res) => {
        
    try {
        const user = await User.find({specialty}=req.body).populate('specialty');
        res.json(user);
        res.status(201).json({ user: user._id });
      }
      catch(err) {
        const errors = "error in search";
        res.status(400).json({ errors });
      }
}

module.exports.signup_post =  async  (req, res)  => {

  const { email, password ,username ,phone, specialtise,fee,describtion } = req.body;
  const imagedoctor =  nest.get(req.files,"imagedoctor.0.filename");
  const  imageSSN = nest.get(req.files,"imageSSN.0.filename");
  const specialty = await Specialty.findOne({name:specialtise});

 try {
    const user = await User.create({ email, password ,username ,phone, specialty,imagedoctor,imageSSN,fee,describtion });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
//   res.redirect('/');
}