const Category = require('../models/category.model');
const { handleErrors } = require('../utilities/fetchFunctions');

const create = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        handleErrors(error, res)
    }
};

// Add other CRUD operations similarly
const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        handleErrors(error, res)
    }
}
//update categories
const update = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        handleErrors(error, res)
    }
}
//delete categories
const deleteOne = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        handleErrors(error, res)
    }
}



module.exports = {
    create,
    getAll,
    update,
    deleteOne,

};

