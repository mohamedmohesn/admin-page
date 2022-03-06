const {config} =require('dotenv').config()
const User = require("../models/User");
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const API_KEY = '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';
sgMail.setApiKey('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')
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
module.exports.signup_get = (req, res) => {
  res.render('create_user');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password ,username ,phone } = req.body;


 try {
    const user = await User.create({ email, password ,username ,phone });
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
module.exports.forgetpass = async (req, res) => {
  const email = req.body;
  
  const user = await User.findOne(email);
  const token = jwt.sign({ user: user._id },'forgot secret' ,{expiresIn: '60m'}) 
   await User.findOneAndUpdate(email,{resetlink: token});
   const msg = {
      to: user.email, // Change to your recipient
      from: 'mohamedmohesn120@gmail.com', // Change to your verified sender
      subject: 'this mail for reset the password',
      text: 'click to reset ',
      html: `<button><a href="https://chat-kit--app.herokuapp.com/reset?te=${token}" >click to reset</a></button>`, }
  try {
      
      res.status(201).json({ user: user._id });
      // res.json(user);
      
    
    }
    catch(err) {
      const errors = "error in search";
      res.status(400).json({ errors });
    }
    
    
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
}


module.exports.resetpass = async (req, res) => {
  const  password  = req.body.password;
const resetlink = req.params.token;
const pass = await bcrypt.hash(password , await bcrypt.genSalt());
  try {
    jwt.verify(resetlink,'forgot secret', async (err, decodedToken) =>{
      const user = await User.findOneAndUpdate(decodedToken.id,{password: pass});
      res.status(200).json({ user: user._id });
    })
    
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(" errors ");
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  // res.redirect('/');
}



module.exports.forget_get = (req, res) => {
  res.render('forget');
}
module.exports.reset_get = (req, res) => {
  res.render('reset');
}