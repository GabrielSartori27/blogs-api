const { Category } = require('../models/index');

const addCategory = async (name) => {
    if (!name) return { code: 400, message: '"name" is required' };
    await Category.create({ name });
    const newCategory = await Category.findOne({ where: { name } });
    return { code: 201, newCategory };
};

module.exports = {
    addCategory,
};