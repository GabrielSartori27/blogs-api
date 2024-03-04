const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models/index');

const { include } = {
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
};

const getPosts = async () => {
    const posts = await BlogPost.findAll({ include });
    if (!posts) return { code: 404, messgage: 'Posts not found' };
    return { code: 200, posts };
};

const getPostById = async (id) => {
    const post = await BlogPost.findByPk(id, { include });
    if (!post) return { code: 404, message: 'Post does not exist' };
    return { code: 200, post };
};

const checkQuery = async (query) => {
    if (!query) {
        const allPosts = await BlogPost.findAll({ include });
        return { code: 200, posts: allPosts };
    }
};

const getPostByQuery = async (query) => {
    checkQuery(query);
    const postsByTitle = await BlogPost
        .findAll({ where: { title: { [Op.like]: `%${query}%` } }, include });
    if (postsByTitle.length) return { code: 200, posts: postsByTitle };
    const postsByContent = await BlogPost
        .findAll({ where: { content: { [Op.like]: `%${query}%` } }, include });
    if (postsByContent.length) return { code: 200, posts: postsByContent };
    if (!postsByTitle.length && !postsByContent.length) return { code: 200, posts: [] };
};

const checkIds = async (categoryIds) => {
    const categories = await Category.findAll();
    let isValid = true;
    categoryIds.forEach((id) => {
        if (id > categories[categories.length - 1].id || id < 0) {
            isValid = false;  
        }
    });
    return isValid; 
};

const addPost = async (userId, title, content, categoryIds) => {
    if (!title || !content) return { code: 400, message: 'Some required fields are missing' };
    if (!await checkIds(categoryIds)) return { code: 400, message: '"categoryIds" not found' };
    const date = new Date();
    await BlogPost.create({ title, content, userId, updated: date, published: date });
    const post = await BlogPost.findOne({ where: { title, content, userId } });
    categoryIds.forEach(async (id) => {
        await PostCategory.create({ postId: post.id, categoryId: id });
    });
    return { code: 201, post };
};

const updatePost = async (id, userId, title, content) => {
    const post = await BlogPost.findByPk(id);
    if (post.userId !== userId) return { code: 401, message: 'Unauthorized user' };
    if (!title || !content) return { code: 400, message: 'Some required fields are missing' };
    const [updatedPost] = await BlogPost.update({ title, content }, { where: { id } });
    if (!updatedPost) return { code: 404, message: 'Post does not exist' };
    const editedPost = await BlogPost.findByPk(id, { include });
    return { code: 200, editedPost };
};

const deletePost = async (id, userId) => {
    const post = await BlogPost.findByPk(id);
    if (!post) return { code: 404, message: 'Post does not exist' };
    if (post.userId !== userId) return { code: 401, message: 'Unauthorized user' };
    await BlogPost.destroy({ where: { id } });
    return { code: 204 };
};

module.exports = {
    getPosts,
    addPost,
    getPostById,
    getPostByQuery,
    updatePost,
    deletePost,
};