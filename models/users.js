const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    id: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);