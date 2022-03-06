const User = require("../models/specialty");
const { find } = require("../models/specialty");

module.exports.findALLspecialty = async(req, res) => {

    try {
        const user = await User.find();
        res.send(user);
        res.status(201).json({ user: user._id });
    } catch (err) {
        res.status(400).json({ errors });
    }
}
module.exports.create = (req, res) => {
    res.render('create_specialty');
}


module.exports.Add_specialty = async(req, res) => {
    const { name, specialty } = req.body;
    const imagespecialty = req.file.filename;


    try {
        const user = await User.create({ name, specialty, imagespecialty });
                res.redirect('/specialty');

        res.status(201).json({ user: user._id });
      

    }
     catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });}}