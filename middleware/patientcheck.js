const jwt = require('jsonwebtoken');
const User = require('../models/User');
const doctor = require('../models/doctor');
const maindoctor = require('../models/maindoctor');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        console.log(res.locals.user);
        next();
      } else if( User.findById(decodedToken.id) != null) {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log(res.locals.user);
        next();
      } else if( doctor.findById(decodedToken.id) != null) {
        let user = await doctor.findById(decodedToken.id);
        res.locals.user = user;
        console.log(user);
        next();
      } else if( maindoctor.findById(decodedToken.id) != null) {
        let user = await maindoctor.findById(decodedToken.id);
        res.locals.user = user;
        next();
        console.log(user);
      }
    });
  } else {
    res.locals.user = null;
    console.log(res.locals.user);
    next();
  }
  // console.log(res.locals.user);
};


module.exports = { requireAuth, checkUser };