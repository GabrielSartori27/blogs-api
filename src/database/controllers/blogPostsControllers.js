const BlogPostsService = require('../services/blogPostsService');

const getPosts = async (_req, res) => {
    const { code, message, posts } = await BlogPostsService.getPosts();
    if (message) return res.status(code).json({ message });
    return res.status(code).json(posts);
};

module.exports = {
    getPosts,
};