const ctrl = {};
const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');
ctrl.index = async (req, res) =>{
    let viewModel = {};
    const images = await Image.find().sort({timestamp: -1});
    await sidebar(viewModel);
    viewModel.images = images;
    res.render('index', viewModel);
}

module.exports = ctrl;