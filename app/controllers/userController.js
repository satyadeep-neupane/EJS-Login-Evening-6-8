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
    const {page, perPage = 10} = req.query;
    let total = await User.count();
    let totalPage = 1;
    try{
        let u =  User.find().select('-password');

        if(page)
        {
            u.byPage(page, perPage);
            totalPage = Math.ceil(total / perPage);
        }

        u = await u;

        res.render('user/index', {users: u, totalPage, page, perPage});
    }catch(err)
    {
        res.send("Error"+err.message);
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