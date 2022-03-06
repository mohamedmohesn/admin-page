const User = require("../models/User");
const { find } = require("../models/User");
module.exports.alluser = async (req, res) => {
        
    try {
      await User.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('users', { blogs: result });
      })
      res.status(201).send({blogs});
        
      }
      catch(err) {
        res.status(400).json('error');
      }
}

module.exports.details = async (req, res) => {
  const id = req.params.id;
  await User.findById(id)
    .then(result => {
      res.render('userdetails', { blog: result });
    })
    .catch(err => {
      res.status(400).json('error');
    });
}

module.exports.user_delete = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/users' });
    })

    .catch(err => {
      res.status(400).json('error');
    });
}