const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is required'],
        trim: true,
        maxlength: [32,'Name Cannot be longer than 32 characters'  ],
        uppercase:true,
        unique: true,
    },
    description: String,
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
