const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prodSchema = new Schema({
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
    prodDetails: {
        type: String,
        require: true
    },
    prodPrice: {
        type: Number,
        require: true
    },
    prodCart: {
        type: String,
        require: false
    },
    prodLike: {
        type: Number,
        require: false
    },
    prodName: {
        type: String,
        require: true
    }
}, { timestamps: true });

const prodModel = mongoose.model('E-commerce-cohort4', prodSchema);

module.exports = prodModel;