const CategoriesServices = require('../services/categoriesService');

const addCategory = async (req, res) => {
    const { name } = req.body;
    const { code, message, newCategory } = await CategoriesServices.addCategory(name);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(newCategory);
};

const getCategories = async(req, res) => {
    const {code, message, categories} = await CategoriesServices.getCategories();
    if(message) return res.status(code).json({message});
    return res.status(code).json(categories);
}

module.exports = {
    addCategory,
    getCategories
};