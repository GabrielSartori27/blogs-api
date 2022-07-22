const CategoriesServices = require('../services/categoriesService');

const addCategory = async (req, res) => {
    const { name } = req.body;
    const { code, message, newCategory } = await CategoriesServices.addCategory(name);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(newCategory);
};

module.exports = {
    addCategory,
};