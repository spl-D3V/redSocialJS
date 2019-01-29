const { Comment, Image} = require('../models');

async function totalImages(){
    return await Image.countDocuments();
};

async function totalComments(){
    return await Comment.countDocuments();
};

async function totalViews(){
    const result = await Image.aggregate([{$group:{
                        _id: '1',
                        viewsTotal: {$sum: '$views'}
                    }}]);
    return result[0].viewsTotal;
};

async function totalLikes(){
    const result = await Image.aggregate([{$group:{
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}]);
return result[0].likesTotal;
};

module.exports = async () => {
    const results = await Promise.all([
                        totalImages(),
                        totalComments(),
                        totalLikes(),
                        totalViews()
                    ]);
    return {
        totalimages: results[0],
        totalcomments: results[1],
        totallikes: results[2],
        totalviews: results[3],
    }
};