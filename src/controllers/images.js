const path = require('path');
const helpers = require('../helpers/helpers');
const fs = require('fs-extra');
const {Image} = require('../models');
const ctrlImg = {};

ctrlImg.index = (req, res) => {
    res.send('image');
}
ctrlImg.create = async (req, res) => {
    const imgUrl = helpers.randomNumber();
    const ext = path.extname(req.file.originalname).toLowerCase();
    const imgTempPath = req.file.path;
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
        await fs.move(imgTempPath, targetPath);
        const newImg = new Image({
            title: req.body.title,
            description: req.body.description,
            filename: imgUrl + ext
        });
        const imgSaved = await newImg.save();
    }
    res.send('funciona');
}
ctrlImg.like = (req, res) => {
    
}
ctrlImg.comment = (req, res) => {
    
}
ctrlImg.delete = (req, res) => {

}
module.exports = ctrlImg;