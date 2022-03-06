const User = require("../models/specialty");
const { find } = require("../models/specialty");
module.exports.allspecialtys = async (req, res) => {
        
    try {
      await User.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('specialtys', { blogs: result });
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
      res.render('specialtydetails', { blog: result });
    })
    .catch(err => {
      res.status(400).json('error');
    });
}

module.exports.specialtys_delete = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/specialty' });
    })

    .catch(err => {
      res.status(400).json('error');
    });
}