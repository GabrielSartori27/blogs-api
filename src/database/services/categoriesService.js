const { Category } = require('../models/index');

const addCategory = async (name) => {
    if (!name) return { code: 400, message: '"name" is required' };
    await Category.create({ name });
    const newCategory = await Category.findOne({ where: { name } });
    return { code: 201, newCategory };
};

const getCategories = async () => {
    const categories = await Category.findAll();
    if (!categories) return { code: 404, message: 'Categories not found' };
    return { code: 200, categories };
};

module.exports = {
    addCategory,
    getCategories,
};