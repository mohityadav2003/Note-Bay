const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        require: true
    },
    firstName: {
        type: String,
        require:true
    },
    lastName:{
        type: String,
    },
    password:{
        type: String,
        require: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;