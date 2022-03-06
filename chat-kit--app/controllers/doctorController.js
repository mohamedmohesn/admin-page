const User = require("../models/doctor");
const { find } = require("../models/doctor");


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

// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, 'net ninja secret', {
//     expiresIn: maxAge
//   });
// };


// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.getALL = async (req, res) => {
        
        try {
            const user = await User.find();
            res.send(user);
            res.status(201).json({ user: user._id });
          }
          catch(err) {
            res.status(400).json({ errors });
          }
}
module.exports.getALLName = async (req, res) => {
        
    try {
        const user = await User.find({username}=req.body);
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
        const user = await User.find({AOE}=req.body);
        res.json(user);
        res.status(201).json({ user: user._id });
      }
      catch(err) {
        const errors = "error in search";
        res.status(400).json({ errors });
      }
}

module.exports.signup_post =  async  (req, res)  => {
  const { email, password ,username ,phone, AOE } = req.body;
  const imagedoctor = req.file.path;

 try {
    const user = await User.create({ email, password ,username ,phone, AOE,imagedoctor });
    
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
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  // res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

