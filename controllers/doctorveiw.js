const User = require("../models/doctor");
const Doctor = require("../models/maindoctor");
const { find } = require("../models/doctor");
var nest = require("nested-property");
const Specialty = require('../models/specialty')


module.exports.alldoctor = async (req, res) => {
        
    try {
      await User.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('doctors', { blogs: result });
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
      res.render('doctordetails', { blog: result });
      res.status(201).send({blogs});

    })
    .catch(err => {
      res.status(400).json('error');
    });
}
module.exports.main_create = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id,{accept:1})
 
    .then(result => {
      console.log(user);
      res.json({ redirect: '/doctor' });

    })
    .catch(err => {
      res.json({ redirect: '/doctor' });
      res.status(400).json('error');

    });
}

module.exports.doctor_delete = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/doctor' });
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
  const accept = 1;

 try {
    const user = await User.create({ email, password ,username ,phone, specialty,imagedoctor,imageSSN ,fee,describtion ,accept });
    
    res.redirect('/doctor');
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}
module.exports.create =async (req, res) => {
  const type = await Specialty.find()
  res.render('create_doctor',{type});

}