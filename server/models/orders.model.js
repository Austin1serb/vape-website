const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    orderNumber: {
        type: String,
        required: true,
        unique: true, // Ensure the order number is unique
    },
    orderNotes: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: false,
    },

    products: [
        {
            name: {
                type: String,
                required: false,
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },

            price: {  // Price at the time of order
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            img: {
                type: String,
                required: false,
            }
        },
    ],
    shippingMethod: {
        type: Object,
        required: false,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    totalAmount: {
        type: Object,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'],
        required: false,
        default: 'Pending'
    },

    // Payment Information
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        required: false,
        default: 'Pending'
    },

    transactionId: {
        type: String,
        required: false
    },

    // Audit Fields
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'createdByType'
    },

    createdByType: {
        type: String,
        required: true,
        enum: ['User', 'Guest']
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: false
    }
}, { timestamps: true });  // This option adds `createdAt` and `updatedAt` fields


// Indexing
OrderSchema.index({ orderNumber: 1 });  // Assuming orderNumber should be unique and often queried
OrderSchema.index({ user: 1 });     // Indexing on user ID for quicker look-up
OrderSchema.index({ orderDate: -1 });   // Indexing on orderDate if sorting by date is common

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
