const User = require("../models/pharmcy");
const { find } = require("../models/pharmcy");

module.exports.findALL = async (req, res) => {
        
    try {
        const user = await User.find();
        res.send(user);
        res.status(201).json({ user: user._id });
      }
      catch(err) {
        res.status(400).json({ errors });
      }
}

module.exports.Add_pharmcy =  async  (req, res)  => {
    const { username ,phone, location } = req.body;
    
  
   try {
      const user = await User.create({username ,phone, location});
      
      res.status(201).json({ user: user._id });
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
   
  }