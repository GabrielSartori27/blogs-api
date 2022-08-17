const { BlogPost, User, Category, PostCategory } = require('../models/index');

const getPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    if (!posts) return { code: 404, messgage: 'Posts not found' };
    return { code: 200, posts };
};

const getPostById = async (id) => {
    const post = await BlogPost.findByPk(id, {
include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
    if (!post) return { code: 404, message: 'Post does not exist' };
    return { code: 200, post };
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
    const editedPost = await BlogPost.findByPk(id, {
        include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
            { model: Category, as: 'categories', through: { attributes: [] } }] });
    return { code: 200, editedPost };
};

module.exports = {
    getPosts,
    addPost,
    getPostById,
    updatePost,
};