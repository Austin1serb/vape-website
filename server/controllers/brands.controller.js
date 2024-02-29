const Brand = require('../models/brand.model'); // Adjust the path as necessary to match your project structure
const { deleteFromCloudinary } = require('../services/cloudinary');
const { processImages, removeDeletedImages, handleErrors } = require('../utilities/fetchFunctions');

// Controller function to add a new brand
const addBrand = async (req, res) => {
    // Extract brand data and image info from request
    let { name, description, rating, tags, isActive, imgSource } = req.body;

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
        return res.status(400).json({ name: 'Brand already exists' });
    }

    try {
        imgSource = await processImages(imgSource);
        const newBrand = new Brand({
            name, description, rating, tags, isActive, imgSource
        });

        await newBrand.save();
        res.status(201).json(newBrand);
    } catch (error) {
        handleErrors(error, res);
    }
};
// Assuming processImages and removeDeletedImages functions are adapted for both product and brand images

const updateBrand = async (req, res) => {
    const brandId = req.params.id; // Assuming you're passing the brand's ID as a URL parameter
    let { name, description, rating, tags, isActive, imgSource } = req.body;

    try {
        // Fetch the existing brand document
        const originalBrand = await Brand.findById(brandId);
        if (!originalBrand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        // Process any new images and update imgSource
        const updatedImgSource = await processImages(imgSource);

        // Remove deleted images from Cloudinary
        await removeDeletedImages(updatedImgSource, originalBrand);

        // Update the brand document with the new information
        originalBrand.name = name || originalBrand.name;
        originalBrand.description = description || originalBrand.description;
        originalBrand.rating = rating || originalBrand.rating;
        originalBrand.tags = tags || originalBrand.tags;
        originalBrand.isActive = isActive !== undefined ? isActive : originalBrand.isActive;
        originalBrand.imgSource = updatedImgSource || originalBrand.imgSource;

        // Save the updated brand document
        const updatedBrand = await originalBrand.save();

        // Respond with the updated brand document
        res.status(200).json(updatedBrand);
    } catch (error) {
        handleErrors(error, res);
    }
};

const deleteBrand = async (req, res) => {
    const brandId = req.params.id; // Assuming you're passing the brand's ID as a URL parameter

    try {
        // Fetch the brand document
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        // Delete images associated with the brand from Cloudinary
        if (brand.imgSource && brand.imgSource.length > 0) {
            for (const image of brand.imgSource) {
                await deleteFromCloudinary(image.publicId);
            }
        }
        // Respond to indicate successful deletion
        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        handleErrors(error, res);
    }
};



const getAll = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        handleErrors(error, res);
    }
}
const getOne = async (req, res) => {
    const brandId = req.params.id;

    try {
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json(brand);
    } catch (error) {
        handleErrors(error, res);
    }
}


module.exports = {
    addBrand,
    updateBrand,
    deleteBrand,
    getAll,
    getOne,

};
