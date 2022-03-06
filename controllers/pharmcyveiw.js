const User = require("../models/pharmcy");
const { find } = require("../models/pharmcy");
module.exports.allpharmcy = async (req, res) => {
        
    try {
      await User.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('pharmcys', { blogs: result });
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
      res.render('pharmcysdetails', { blog: result });
    })
    .catch(err => {
      res.status(400).json('error');
    });
}

module.exports.pharmcy_delete = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/pharmcys' });
    })

    .catch(err => {
      res.status(400).json('error');
    });
}

module.exports.Addpharmcy =  async  (req, res)  => {
  const { username ,phone, location,describtion } = req.body;
  const imagepharmcy = req.file.filename;


 try {
    const user = await User.create({username ,phone, location,imagepharmcy,describtion});
    
    
    res.redirect('/pharmcys');

  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}
module.exports.create = (req, res) => {
  res.render('create_pharmcys');
}