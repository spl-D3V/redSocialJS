const path = require('path');
const helpers = require('../helpers/helpers');

const ctrlImg = {};
ctrlImg.index = (req, res) => {
    res.send('image');
}
ctrlImg.create = (req, res) => {
    console.log(req.file);
    const ext = path.extname(req.file.originalname).toLowerCase();
    const imgTempPath = req.file.path;
    const targetPath = path.resolve(`scr/public/upload/`)
}
ctrlImg.like = (req, res) => {
    
}
ctrlImg.comment = (req, res) => {
    
}
ctrlImg.delete = (req, res) => {

}
module.exports = ctrlImg;