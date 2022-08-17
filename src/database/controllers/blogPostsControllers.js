const BlogPostsService = require('../services/blogPostsService');

const getPosts = async (req, res) => {
    const { code, message, posts } = await BlogPostsService.getPosts();
    if (message) return res.status(code).json({ message });
    return res.status(code).json(posts);
};
const addPost = async (req, res) => {
    const { dataValues } = req.user;
    const { title, content, categoryIds } = req.body;
    const { code, message, post } = await BlogPostsService
        .addPost(dataValues.id, title, content, categoryIds);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(post);
};

module.exports = {
    getPosts,
    addPost,
};