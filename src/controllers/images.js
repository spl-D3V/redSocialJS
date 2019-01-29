const path = require('path');
const helpers = require('../helpers/helpers');
const fs = require('fs-extra');
const md5 = require('md5');
const {Image, Comment} = require('../models');
const sidebar = require('../helpers/sidebar');
const ctrlImg = {};

ctrlImg.index = async (req, res) => {
    let viewModel = {};
    const image = await Image.findOne({filename : {$regex: req.params.image_id}});
    image.views += 1;
    await Promise.all([image.save(), Comment.find({image_id: image._id}), sidebar(viewModel)])
    .then( values => {
        viewModel.comments = values[1];
    }, error => {
        console.log(error);
    });
    viewModel.image = image;
    res.render('image', viewModel);
}
ctrlImg.create = (req, res) => {
    const saveImage = async () => {
        const imgUrl = helpers.randomNumber();
        const imageExist = await Image.find({filename: imgUrl});
        if (imageExist.length > 0){
            saveImage();
        } else {
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
                res.redirect('/images/'+imgUrl);
            } else {
                await fs.unlink(imgTempPath);
                res.status(500).json({error: "solo imágenes"});
            }
        }
    };
    
    saveImage();
}
ctrlImg.like = async (req, res) => {
    const image = await Image.findOne({filename : {$regex: req.params.image_id}});
    if (image){
        image.likes += 1;
        await image.save()
        res.json({likes: image.likes});
    } else {
        res.status(500).json({error: 'Internal error'});
    }
}
ctrlImg.comment = async (req, res) => {
    console.log(req.body);
    const imageFromDB = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (imageFromDB){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = imageFromDB._id;
        await newComment.save();
        res.redirect('/images/'+imageFromDB.uniqueId);
    }
    res.redirect('/images');
}
ctrlImg.delete = async (req, res) => {
    const image = await Image.findOne({filename : {$regex: req.params.image_id}});
    if(image){
        await Promise.all([
            fs.unlink(path.resolve('./src/public/upload/'+image.filename)),
            Comment.deleteMany({image_id: image._id}),
            image.remove()
        ])
        res.json(true);
    } else {
        res.json(false);
    }
}
module.exports = ctrlImg;