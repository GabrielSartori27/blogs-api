const BlogPostsService = require('../services/blogPostsService');

const getPosts = async (_req, res) => {
    const { code, message, posts } = await BlogPostsService.getPosts();
    if (message) return res.status(code).json({ message });
    return res.status(code).json(posts);
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const { code, message, post } = await BlogPostsService.getPostById(id);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(post);
};

const addPost = async (req, res) => {
    const { dataValues } = req.user;
    const { title, content, categoryIds } = req.body;
    const { code, message, post } = await BlogPostsService
        .addPost(dataValues.id, title, content, categoryIds);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(post);
};

const updatePost = async (req, res) => {
    const { dataValues } = req.user;
    const { id } = req.params;
    const { title, content } = req.body;
    const { code, message, editedPost } = await BlogPostsService
        .updatePost(id, dataValues.id, title, content);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(editedPost);
};

const deletePost = async (req, res) => {
    const { dataValues } = req.user;
    const { id } = req.params;
    const { code, message } = await BlogPostsService.deletePost(id, dataValues.id);
    if (message) return res.status(code).json({ message });
    return res.status(code).end();
};

module.exports = {
    getPosts,
    addPost,
    getPostById,
    updatePost,
    deletePost,
};