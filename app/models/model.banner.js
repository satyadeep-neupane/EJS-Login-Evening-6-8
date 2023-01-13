const mongoose = require('mongoose');
const moment = require('moment');

const bannerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    expire_date: {
        type: Date,
        required: true,
        get: d => moment(d).format("YYYY-MM-DD"),
        set: v => moment(v).format("YYYY-MM-DD")
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

bannerSchema.virtual('isExpired').get(function() {
    return this.expire_date < Date.now();
});

module.exports = mongoose.model('Banner', bannerSchema);