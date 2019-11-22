const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    message: String,
    city: String,
    dob: String
});


const UserModel = mongoose.model('UserModel', userSchema);

module.exports.UserModel = UserModel;   