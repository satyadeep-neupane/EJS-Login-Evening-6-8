const User = require('../models/model.user');

exports.create = async(req, res) => {
    res.render('user/create');
}

exports.store = async (req, res) => {
    try{
        const user = new User({...req.body, isAdmin: true});
        user.password = "Default";
        await user.save();
        res.redirect('/user');
    }catch(err)
    {
        res.send("Error");
    }
}

exports.list = async (req, res) => {
    try{
        const u = await User.find().select('-password');
        res.render('user/index', {users: u});
    }catch(err)
    {
        res.send("Error");
    }
}

exports.destory = async (req, res) => {
    try{
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.redirect('/user');
    }catch(err)
    {
        res.send("Error");
    }
}