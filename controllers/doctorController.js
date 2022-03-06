const User = require("../models/doctor");
const { find } = require("../models/doctor");
var nest = require("nested-property");
const jwt = require('jsonwebtoken');
const Specialty = require('../models/specialty')
var d= 0;
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
// module.exports.signup_get = (req, res) => {
//   res.render('signup');
// }

// module.exports.login_get = (req, res) => { 
//   res.render('login');
// }

module.exports.getALL = async (req, res) => {
        
        try {
            const user = await User.find().populate('specialty');
            // res.send(user);
            res.status(201).json({ user});
            // console.log(user[2].username);
          }
          catch(err) {
            res.status(400).json({ errors });
          }
}
module.exports.getALLName = async (req, res) => {
        
    try {
         await User.find({accept:false}).populate('specialty')
        // res.status(201).json(user);
        // // res.json(user);
         .then(result => {
            res.render('acceptdoc', { blogs: result });
          })
          res.status(201).send({blogs});
            
          
      }
      catch(err) {
        const errors = "error in search";
        res.status(400).json({ errors });
      }
}

module.exports.getALLAOE = async (req, res) => {
      
        const specialty = await Specialty.findOne({name} = req.body);
        console.log(specialty);
    try {
        const user = await User.find({specialty:specialty , accept:true}).populate('specialty');
        res.json(user);
        res.status(201).json({ user: user._id });
      }
      catch(err) {
        const errors = "error in search";
        res.status(400).json({ errors });
      }
}
module.exports.getAOE = async (req, res) => {
  const id = req.params.id;
  const specialty =  await Specialty.findById(id)
        console.log(specialty);
    try {
        const users = await User.find({specialty:specialty , accept:true}).populate('specialty');
        
        console.log(users);
        res.render('getdoctor', { users });
        res.status(201).json({ user: users});
      }
      catch(err) {
        const errors = "error in search";
        res.status(400).json({ errors });
      }
}

module.exports.signup_post =  async  (req, res)  => {

  const { email, password ,username ,phone, specialtise,fee,describtion  } = req.body;
  var imagedoctor =  nest.get(req.files,"imagedoctor.0.filename");
  var  imageSSN = nest.get(req.files,"imageSSN.0.filename");
 
  if (imagedoctor === undefined){
    if (d == 0) {
      imagedoctor = 'doctor.jpg';
      d++
    }else if (d == 1) {
      imagedoctor = 'doctor1.jpg';
      d++;
    }else{
      imagedoctor = 'doctor2.jpg';
      d = 0;}
  };
  if (imageSSN === undefined){
    if (d == 0) {
      imageSSN = 'certifications.jpg';
      d++
    }else if (d == 1) {
      imageSSN = 'certifications1.jpg';
      d++;
    } else {
      imageSSN = 'certifications2.jpg';
      d = 0;
    }
  };
  const accept = 0;
  console.log(imagedoctor);
  const specialty = await Specialty.findOne({name:specialtise});
 try {
    const user = await User.create({ email, password ,username ,phone, specialty,imagedoctor,imageSSN,fee,describtion,accept });
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
  
  // res.redirect('/');
}

