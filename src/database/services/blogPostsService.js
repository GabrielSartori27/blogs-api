const { BlogPost, User, Category } = require('../models/index');

const getPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    if (!posts) return { code: 404, messgage: 'Posts not found' };
    return { code: 200, posts };
};

module.exports = {
    getPosts,
};