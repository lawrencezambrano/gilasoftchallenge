const {Schema, model} = require('mongoose');
//const {v4: uuidv4 } = require('uuid');

const MessageSchema = Schema({
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    subscribed: {
        type: Array,
        required: true
    },
    channels: {
        type: Array,
        required: true
    },
    deliveryStatus: {
        type: Array,
        required: true
    }
}, { timestamps: true });

module.exports = model('Messages', MessageSchema);