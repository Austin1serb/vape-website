const { uploadToCloudinary } = require("../services/cloudinary");

const processImages = async (images, originalProduct = null) => {
    let imageData = [];
    if (images && Array.isArray(images) && images.length > 0) {
        for (let image of images) {
            if (image.url && image.url.includes('cloudinary.com')) {
                imageData.push(image);
            } else {
                const results = await uploadToCloudinary(image.url, "product_images");
                imageData.push(results);
            }
        }
    }
    return imageData;
};

const removeDeletedImages = async (newImages, originalProduct) => {
    const originalUrls = originalProduct.imgSource.map(img => img.url);
    const removedUrls = originalUrls.filter(url => !newImages.some(img => img.url === url));

    for (const url of removedUrls) {
        const publicId = originalProduct.imgSource.find(img => img.url === url).publicId;
        await deleteFromCloudinary(publicId);
    }
};

const handleErrors = (error, res) => {
    console.error(error);
    if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors).reduce((acc, field) => {
            acc[field] = error.errors[field].message;
            return acc;
        }, {});
        return res.status(400).json(errors);
    }
    res.status(500).json({ message: 'An unexpected error occurred: ', error });
};


module.exports = {
    processImages,
    removeDeletedImages,
    handleErrors,
};
