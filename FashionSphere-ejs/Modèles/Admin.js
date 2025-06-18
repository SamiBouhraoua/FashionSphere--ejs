const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    Username: {
        type: String,
        required: [true, 'Please enter the username'],
    },
    Password: {
        type: String,
        required: [true, 'Please enter the password'],
    },

});


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;