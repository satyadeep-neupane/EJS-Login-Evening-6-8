const Banner = require('../models/model.banner');
const uuid = require('uuid').v4;

exports.create = async(req, res) => {
    res.render('banner/create');
}

function getFileName(name)
{
    return `${uuid()}.${name.split('.').pop()}`
}

function getStoragePath(path)
{
    return `./public${path}`;
}

exports.store = async (req, res) => {
    try{
        if(!req.files)
            return res.status(400).send("No files were uploaded");

        let image = req.files.image;
        let imagePath = `/uploads/images/${getFileName(image.name)}`; 

        req.body.image = await new Promise((resolve, reject) => {
            image.mv(getStoragePath(imagePath), (err) => {
                if(err)
                    reject(err);
                resolve(imagePath);
            })  
        });

        const banner = new Banner(req.body);
        await banner.save();
        res.redirect('/banner');
    }catch(err)
    {
        res.send("Error"+err.message);
    }
}

exports.list = async (req, res) => {
    try{
        const banners = await Banner.find();
        res.render('banner/index', { banners });
    }catch(err)
    {
        res.send("Error");
    }
}

exports.destory = async (req, res) => {
    try{
        const id = req.params.id;
        await Banner.findByIdAndDelete(id);
        res.redirect('/banner');
    }catch(err)
    {
        res.send("Error");
    }
}