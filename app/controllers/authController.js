const User = require('../models/model.user');
const hasher = require('../helpers/hasher');

exports.registerPage = async (req, res) => {}

exports.register = async (req, res) => {
    try{
        const user = new User({...req.body, isAdmin: false});
        await user.save();
        res.status(201).send({ user });
    }catch(err)
    {
        res.send("Error");
    }
}

exports.loginPage = async (req, res) => {
    res.render("auth/login");
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password)
        return res.send("Email and Password Required");

    try{
        const user = await User.findOne({email});

        if(user == null)
            return res.send("Invalid Username or Password");

        if(! await hasher.compare(password, user.password))
            return res.send("Invalid Username or Password");

        req.session.user = user;

        res.redirect('/user');
    }catch(err){
        req.send("Error");
    }
}

exports.logout = async (req, res) => {
    console.log("herer");
    req.session.destroy();
    res.redirect('/login');
}
