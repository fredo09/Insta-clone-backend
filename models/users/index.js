/**
* Schema Usuarios 
**/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    sitioWeb: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim:true
    },
    createAt: {
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Users', UserSchema);
