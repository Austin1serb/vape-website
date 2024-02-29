const mongoose = require('mongoose');
function arrayLimit(val) {
    return val.length > 0;
}
const BrandsSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'Brand must be at least 2 characters long.'],
        maxlength: [20, 'Brand cannot be longer than 20 characters'],
        required: [true, 'Please add a Brand name'],
        unique: [true, 'Brand name already in use'],
        trim: true,
        uppercase: true,
    },
    imgSource: {
        type: [{
            publicId: {
                type: String,
                required: [true, 'Please provide brand image id.']
            },
            url: {
                type: String,
                required: [true, 'Please provide brand image url.']
            },
        }],
        validate: [arrayLimit, 'Brand must have at least one image.']
    },

    description: {
        type: String,
        minlength: [2, 'Description must be at least 2 characters long.'],
        maxlength: [560, 'Description cannot be longer than 560 characters.'],
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot exceed 5'],
        default: 0,
        required: false,
    },
    tags: {
        type: [String]
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },





}, { timestamps: true });

const Brand = mongoose.model('Brand', BrandsSchema);

module.exports = Brand;
