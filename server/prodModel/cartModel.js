const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    prodImg_url: {
        type: String,
        require: true
    },

    prodImg_id: {
        type: String,
        require: true
    },
    prodIntro: {
        type: String,
        require: true
    },
    prodPrice: {
        type: Number,
        require: true
    },
    prodCart: {
        type: String,
        require: true
    },
    prodName: {
        type: String,
        require: true
    },
    parent_id: {
        type: String,
        require: true
    }
}, { timestamps: true });

const cartModel = mongoose.model('E-commerce-cohort4-cart', cartSchema);

module.exports = cartModel;