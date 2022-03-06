const User = require("../models/admin");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' , name: ''};

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // if (err.message === 'incorrect name') {
  //   errors.name = 'That name is to short pls more than 4';
  // }

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
  if (err.message.includes('admin validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}
// create json web token
const maxAge = 6 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'my secret', {
    expiresIn: maxAge
  });
};
module.exports.signup_post = async (req, res) => {
    const { email, password , name } = req.body;
    
    try {
      const user = await User.create({ email, password , name }); 
       console.log(user);
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
        res.redirect('/');
      }