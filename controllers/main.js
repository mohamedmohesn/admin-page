const User = require("../models/maindoctor");
const { find } = require("../models/maindoctor");
var nest = require("nested-property");
const Specialty = require('../models/specialty')

module.exports.alldoctor = async (req, res) => {
        
    try {
      await User.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('maindoctor', { blogs: result });
      })
      res.status(201).send({blogs});
        
      }
      catch(err) {
        res.status(400).json('error');
      }
}

module.exports.details = async (req, res) => {
  const id = req.params.id;
  await User.findById(id).populate('specialty')
    .then(result => {
      res.render('maindoctordetails', { blog: result });
      res.status(201).send({blogs});

    })
    .catch(err => {
      res.status(400).json('error');
    });
}

module.exports.doctor_delete = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/maindoctor' });
    })

    .catch(err => {
      res.status(400).json('error');
    });
}

module.exports.add =  async  (req, res)  => {
  const { email, password ,username ,phone, specialtise,fee ,describtion } = req.body;
  const imagedoctor =  nest.get(req.files,"imagedoctor.0.filename");
  const  imageSSN = nest.get(req.files,"imageSSN.0.filename");
  const specialty = await Specialty.findOne({name:specialtise});

 try {
    const user = await User.create({ email, password ,username ,phone, specialty,imagedoctor,imageSSN ,fee , describtion});
    
    res.redirect('/maindoctor');
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}
module.exports.create = (req, res) => {
  res.render('create_maindoctor');
}